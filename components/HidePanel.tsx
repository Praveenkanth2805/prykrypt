"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

import Alert from "@/components/Alert";
import ImageDropzone from "@/components/ImageDropzone";
import StepHeader from "@/components/StepHeader";
import {
  HEADER_LENGTH,
  buildContainer,
  serializePayload,
} from "@/lib/container";
import { ENCRYPTION_OVERHEAD, encryptBytes, isCryptoAvailable } from "@/lib/crypto";
import { PryKryptError, toMessage } from "@/lib/errors";
import { formatBytes, formatPercent } from "@/lib/format";
import {
  MAX_PIXELS,
  cloneImageData,
  imageDataToPngBlob,
  readImageData,
  readImageForEncoding,
} from "@/lib/image";
import { embedBytes, extractContainer, getCapacityBytes } from "@/lib/stego";

const MAX_SECRET_FILE_BYTES = 32 * 1024 * 1024;

type Mode = "text" | "file";

interface EncodeResult {
  url: string;
  size: number;
  width: number;
  height: number;
  verified: boolean;
  encrypted: boolean;
}

export default function HidePanel() {
  const [imageData, setImageData] = useState<ImageData | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageName, setImageName] = useState("");
  const [hadTransparency, setHadTransparency] = useState(false);
  const [mode, setMode] = useState<Mode>("text");
  const [message, setMessage] = useState("");
  const [secretFile, setSecretFile] = useState<File | null>(null);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<EncodeResult | null>(null);

  useEffect(() => {
    return () => {
      if (imagePreview) URL.revokeObjectURL(imagePreview);
    };
  }, [imagePreview]);

  useEffect(() => {
    return () => {
      if (result) URL.revokeObjectURL(result.url);
    };
  }, [result]);

  const handleImage = useCallback(async (file: File) => {
    setError(null);
    setResult(null);
    setHadTransparency(false);

    if (!file.type.startsWith("image/")) {
      setError("Please choose an image file. PNG is strongly recommended.");
      return;
    }

    try {
      const previewUrl = URL.createObjectURL(file);
      const loaded = await readImageForEncoding(file);

      if (loaded.data.width * loaded.data.height > MAX_PIXELS) {
        URL.revokeObjectURL(previewUrl);
        throw new PryKryptError(
          "IMAGE_TOO_LARGE",
          `Cover images above ${Math.round(MAX_PIXELS / 1_000_000)} megapixels are not supported.`,
        );
      }

      setImageData(loaded.data);
      setImagePreview(previewUrl);
      setImageName(file.name);
      setHadTransparency(loaded.hadTransparency);
    } catch (cause) {
      setError(toMessage(cause, "Could not read this image."));
    }
  }, []);

  const capacityBytes = useMemo(
    () => (imageData ? getCapacityBytes(imageData.width, imageData.height) : 0),
    [imageData],
  );

  const requiredBytes = useMemo(() => {
    if (!imageData) return 0;

    let plainSize = 0;
    if (mode === "text") {
      plainSize = 1 + new TextEncoder().encode(message).length;
    } else if (secretFile) {
      plainSize =
        1 +
        2 +
        new TextEncoder().encode(secretFile.name).length +
        2 +
        new TextEncoder().encode(secretFile.type || "application/octet-stream").length +
        secretFile.size;
    }

    const overhead = password.length > 0 ? ENCRYPTION_OVERHEAD : 0;
    return HEADER_LENGTH + overhead + plainSize;
  }, [imageData, mode, message, secretFile, password]);

  const usage = capacityBytes > 0 ? (requiredBytes / capacityBytes) * 100 : 0;
  const overCapacity = capacityBytes > 0 && requiredBytes > capacityBytes;

  const canEncode =
    !!imageData &&
    !busy &&
    !overCapacity &&
    (mode === "text" ? message.trim().length > 0 : secretFile !== null);

  const handleReset = () => {
    setImageData(null);
    setImagePreview(null);
    setImageName("");
    setMessage("");
    setSecretFile(null);
    setPassword("");
    setResult(null);
    setError(null);
    setHadTransparency(false);
  };

  const handleEncode = async () => {
    if (!imageData) {
      setError("Upload a cover image first.");
      return;
    }

    setBusy(true);
    setError(null);
    setResult(null);

    try {
      let plain: Uint8Array;

      if (mode === "text") {
        if (!message.trim()) {
          throw new PryKryptError("EMPTY_SECRET", "Enter a secret message to hide.");
        }
        plain = serializePayload({ type: "text", text: message });
      } else {
        if (!secretFile) {
          throw new PryKryptError("EMPTY_SECRET", "Choose a file to hide.");
        }
        if (secretFile.size > MAX_SECRET_FILE_BYTES) {
          throw new PryKryptError(
            "SECRET_TOO_LARGE",
            `Secret files above ${formatBytes(MAX_SECRET_FILE_BYTES)} are not supported.`,
          );
        }
        const bytes = new Uint8Array(await secretFile.arrayBuffer());
        plain = serializePayload({
          type: "file",
          fileName: secretFile.name,
          mimeType: secretFile.type || "application/octet-stream",
          fileBytes: bytes,
        });
      }

      const encrypted = password.length > 0;
      if (encrypted && !isCryptoAvailable()) {
        throw new PryKryptError(
          "CRYPTO_UNAVAILABLE",
          "Encryption is unavailable here. Serve the app over HTTPS or localhost.",
        );
      }

      const body = encrypted ? await encryptBytes(plain, password) : plain;
      const container = buildContainer(body, encrypted);

      const capacity = getCapacityBytes(imageData.width, imageData.height);
      if (container.length > capacity) {
        throw new PryKryptError(
          "CAPACITY_EXCEEDED",
          `This image can hide ${formatBytes(capacity)}, but ${formatBytes(container.length)} is required. Use a larger cover image.`,
        );
      }

      const working = cloneImageData(imageData);
      embedBytes(working, container);

      const blob = await imageDataToPngBlob(working);

      // End-to-end round-trip verification through a real PNG encode/decode.
      let verified = false;
      try {
        const check = await readImageData(blob);
        const roundTrip = extractContainer(check);
        verified =
          roundTrip.body.length === body.length &&
          roundTrip.body.every((value, index) => value === body[index]);
      } catch {
        verified = false;
      }

      setResult({
        url: URL.createObjectURL(blob),
        size: blob.size,
        width: working.width,
        height: working.height,
        verified,
        encrypted,
      });
    } catch (cause) {
      setError(toMessage(cause, "Encoding failed."));
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="space-y-6">
      <header className="animate-fade-up">
        <h1 className="text-2xl font-black tracking-tight text-white sm:text-3xl">Hide a Secret</h1>
        <p className="mt-2 max-w-2xl text-sm text-slate-400">
          Embed a message or file into the least-significant bits of an image. All processing runs
          locally in your browser.
        </p>
      </header>

      <section className="card animate-fade-up p-5 sm:p-6">
        <StepHeader
          index={1}
          title="Cover image"
          subtitle="PNG is recommended. The output is always a lossless PNG."
        />

        <div className="mt-4">
          {imageData && imagePreview ? (
            <div className="grid gap-4 sm:grid-cols-[minmax(0,200px)_1fr] sm:items-center">
              <div className="overflow-hidden rounded-xl border border-white/10 bg-ink-900">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={imagePreview} alt="Cover preview" className="h-40 w-full object-contain" />
              </div>
              <div className="text-sm">
                <p className="truncate font-semibold text-slate-100">{imageName}</p>
                <p className="mt-1 text-slate-400">
                  {imageData.width} × {imageData.height} px
                </p>
                <p className="mt-1 text-slate-400">
                  Capacity:{" "}
                  <span className="font-semibold text-pry-300">{formatBytes(capacityBytes)}</span>
                </p>
                {hadTransparency ? (
                  <p className="mt-2 text-xs text-amber-300/90">
                    This image contained transparent pixels. They were composited onto black so the
                    hidden payload round-trips losslessly.
                  </p>
                ) : null}
                <button type="button" className="btn-ghost mt-3" onClick={handleReset} disabled={busy}>
                  Replace image
                </button>
              </div>
            </div>
          ) : (
            <ImageDropzone
              onFile={handleImage}
              title="Drop a cover image here"
              hint="or click to browse · PNG, WebP, GIF and BMP are accepted · stays on your device"
              disabled={busy}
            />
          )}
        </div>
      </section>

      <section className="card animate-fade-up p-5 sm:p-6">
        <StepHeader index={2} title="Secret payload" subtitle="Hide a text message or any file." />

        <div className="mt-4 inline-flex rounded-xl border border-white/10 bg-ink-900/70 p-1">
          {(["text", "file"] as const).map((value) => (
            <button
              key={value}
              type="button"
              onClick={() => setMode(value)}
              disabled={busy}
              className={[
                "rounded-lg px-4 py-1.5 text-xs font-semibold uppercase tracking-wider transition",
                mode === value ? "bg-pry-600/30 text-pry-200" : "text-slate-400 hover:text-slate-200",
              ].join(" ")}
            >
              {value === "text" ? "Text message" : "File"}
            </button>
          ))}
        </div>

        <div className="mt-4 space-y-4">
          {mode === "text" ? (
            <div>
              <label className="label" htmlFor="secret-message">
                Secret message
              </label>
              <textarea
                id="secret-message"
                className="field min-h-[140px] resize-y"
                placeholder="Type the message you want to hide…"
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                disabled={busy}
                maxLength={200_000}
              />
              <p className="mt-1.5 text-xs text-slate-500">
                {new TextEncoder().encode(message).length} bytes
              </p>
            </div>
          ) : (
            <div>
              <span className="label">Secret file</span>
              <label className="flex cursor-pointer items-center justify-between gap-3 rounded-xl border border-dashed border-white/15 bg-white/[0.02] px-4 py-3 text-sm transition hover:border-pry-500/50 hover:bg-pry-500/5">
                <span className="truncate text-slate-300">
                  {secretFile ? secretFile.name : "Choose any file to hide…"}
                </span>
                <span className="shrink-0 rounded-lg bg-pry-500/15 px-3 py-1 text-xs font-semibold text-pry-200">
                  Browse
                </span>
                <input
                  type="file"
                  className="hidden"
                  disabled={busy}
                  onChange={(event) => {
                    const file = event.target.files?.[0] ?? null;
                    setSecretFile(file);
                    event.target.value = "";
                  }}
                />
              </label>
              {secretFile ? (
                <p className="mt-1.5 text-xs text-slate-500">{formatBytes(secretFile.size)}</p>
              ) : null}
            </div>
          )}

          <div>
            <label className="label" htmlFor="password">
              Password <span className="normal-case text-slate-500">(optional)</span>
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                className="field pr-20"
                placeholder="Leave blank to embed without encryption"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                disabled={busy}
                autoComplete="new-password"
              />
              <button
                type="button"
                onClick={() => setShowPassword((value) => !value)}
                className="absolute right-2 top-1/2 -translate-y-1/2 rounded-lg px-2.5 py-1 text-xs font-semibold text-slate-400 hover:text-slate-200"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
            <p className="mt-1.5 text-xs text-slate-500">
              With a password the payload is encrypted with AES-256-GCM (PBKDF2-SHA256, 210 000
              iterations). Without one, the data is hidden but <strong>not encrypted</strong>.
            </p>
          </div>
        </div>
      </section>

      <section className="card animate-fade-up p-5 sm:p-6">
        <StepHeader index={3} title="Embed & download" subtitle="Capacity is validated before writing." />

        {imageData ? (
          <div className="mt-4 space-y-2">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span>
                Payload {formatBytes(requiredBytes)} / Capacity {formatBytes(capacityBytes)}
              </span>
              <span className={overCapacity ? "font-semibold text-red-300" : "text-slate-400"}>
                {formatPercent(usage)}
              </span>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-white/10">
              <div
                className={[
                  "h-full rounded-full transition-all",
                  overCapacity
                    ? "bg-gradient-to-r from-red-500 to-rose-500"
                    : "bg-gradient-to-r from-pry-500 to-fuchsia-500",
                ].join(" ")}
                style={{ width: `${Math.min(100, Math.max(1, usage))}%` }}
              />
            </div>
            {overCapacity ? (
              <p className="text-xs text-red-300">
                The payload is too large for this image. Choose a bigger image or a smaller secret.
              </p>
            ) : null}
          </div>
        ) : null}

        <div className="mt-5 flex flex-wrap items-center gap-3">
          <button type="button" className="btn-primary" onClick={handleEncode} disabled={!canEncode}>
            {busy ? (
              <>
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                Encoding…
              </>
            ) : (
              <>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="11" width="18" height="11" rx="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
                Hide secret in image
              </>
            )}
          </button>

          {result ? (
            <a className="btn-ghost" href={result.url} download="prykrypt-image.png">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              Download PNG
            </a>
          ) : null}
        </div>

        {error ? (
          <div className="mt-4">
            <Alert tone="error" title="Could not encode">
              {error}
            </Alert>
          </div>
        ) : null}

        {result ? (
          <div className="mt-5 animate-fade-up space-y-4">
            <Alert
              tone={result.verified ? "success" : "warning"}
              title={result.verified ? "Secret embedded successfully" : "Verification failed"}
            >
              {result.verified
                ? `Round-trip verification passed — the payload was read back byte-for-byte from the generated PNG${
                    result.encrypted ? " (AES-256-GCM encrypted)" : " (not encrypted)"
                  }.`
                : "The payload was written, but the round-trip check could not confirm it. The file is still available below. If extraction fails later, re-encode with a standard opaque PNG cover image."}
            </Alert>

            <div className="grid gap-4 sm:grid-cols-[minmax(0,220px)_1fr] sm:items-center">
              <div className="overflow-hidden rounded-xl border border-white/10 bg-ink-900">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={result.url} alt="Generated PryKrypt image" className="h-44 w-full object-contain" />
              </div>
              <div className="text-sm text-slate-300">
                <p className="font-semibold text-slate-100">prykrypt-image.png</p>
                <p className="mt-1 text-slate-400">
                  {result.width} × {result.height} px · {formatBytes(result.size)}
                </p>
                <ul className="mt-3 space-y-1 text-xs text-slate-500">
                  <li>• Keep the file as PNG — re-saving as JPEG destroys the payload.</li>
                  <li>• Do not resize, crop or compress the image.</li>
                  <li>• {result.encrypted ? "A password is required to extract." : "No password was set — anyone can extract this."}</li>
                </ul>
              </div>
            </div>
          </div>
        ) : null}
      </section>
    </div>
  );
}