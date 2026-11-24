import type { Metadata } from "next";
import {
  CheckCircle2,
  ChevronDown,
  Download,
  Info,
  Key,
  Lock,
  ScanSearch,
  ShieldCheck,
  Sparkles,
  Upload,
} from "lucide-react";

import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: { absolute: "About PryKrypt" },
  description:
    "PryKrypt is a privacy-first tool that hides a message or file inside a PNG image. Learn what it does, how it keeps your data private, and what to keep in mind.",
  alternates: { canonical: "/about" },
};

const VALUES = [
  {
    icon: ShieldCheck,
    title: "Stays on your device",
    body: "Images, messages, files and passwords are processed entirely in your browser. Nothing is uploaded to a server.",
  },
  {
    icon: Lock,
    title: "Optional encryption",
    body: "Add a password and your secret is sealed with AES-256-GCM before it is written into the pixels.",
  },
  {
    icon: Sparkles,
    title: "Invisible by design",
    body: "The payload lives in the least-significant bits of the image — hidden to the eye, and perfectly preserved in PNG.",
  },
  {
    icon: CheckCircle2,
    title: "Verified every time",
    body: "Every generated PNG is decoded again in memory to confirm the secret survived — before you download anything.",
  },
];

const STEPS = [
  {
    icon: Upload,
    title: "Choose a cover image",
    body: "Upload a PNG. It becomes the visual shell that carries your secret.",
  },
  {
    icon: Key,
    title: "Add your secret",
    body: "Type a message, attach a file, and optionally set a password to encrypt it.",
  },
  {
    icon: Download,
    title: "Download the PNG",
    body: "You get a lossless PNG that looks the same but carries the hidden payload inside.",
  },
  {
    icon: ScanSearch,
    title: "Extract anytime",
    body: "Bring it back to PryKrypt, unlock it with your password, and recover the secret.",
  },
];

const LIMITS = [
  "PryKrypt PNGs must be opened with PryKrypt — they are not compatible with Steghide or other tools.",
  "Keep the file as PNG. Saving it as JPEG, resizing, cropping or editing it will destroy the hidden data.",
  "Without a password, the secret is hidden but not encrypted.",
  "There is no password recovery. Lose the password and the payload is unrecoverable.",
];

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-4xl space-y-12">
      {/* Hero */}
      <Reveal>
        <header className="text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-pry-500/30 bg-pry-500/10 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-pry-200">
            <Info size={13} strokeWidth={2.2} />
            About
          </span>
          <h1 className="mx-auto mt-5 max-w-2xl text-3xl font-black leading-tight tracking-tight text-white sm:text-4xl">
            A quieter way to keep your secrets
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-slate-400">
            PryKrypt hides a message or file inside an ordinary PNG image. To anyone else, the image
            looks the same. To you, it carries something only you can read.
          </p>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-slate-500">
            The name brings together <strong className="text-slate-300">PK</strong> (Praveenkanth),{" "}
            <strong className="text-slate-300">Privacy</strong> and{" "}
            <strong className="text-slate-300">Cryptography</strong> — the three ideas behind the tool.
          </p>
        </header>
      </Reveal>

      {/* Why PryKrypt */}
      <Reveal>
        <section>
          <h2 className="text-center text-xs font-bold uppercase tracking-[0.25em] text-pry-300">
            Why PryKrypt
          </h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {VALUES.map(({ icon: Icon, title, body }) => (
              <div key={title} className="card h-full p-5">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-pry-500/15 text-pry-300">
                  <Icon size={20} strokeWidth={1.8} />
                </span>
                <h3 className="mt-3 text-base font-bold text-white">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-400">{body}</p>
              </div>
            ))}
          </div>
        </section>
      </Reveal>

      {/* How it works */}
      <Reveal>
        <section>
          <h2 className="text-center text-xs font-bold uppercase tracking-[0.25em] text-pry-300">
            How it works
          </h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {STEPS.map(({ icon: Icon, title, body }, index) => (
              <div key={title} className="card h-full p-5">
                <div className="flex items-center justify-between">
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-pry-500/15 text-pry-300">
                    <Icon size={17} strokeWidth={1.9} />
                  </span>
                  <span className="mono text-xs font-bold text-pry-400/70">
                    0{index + 1}
                  </span>
                </div>
                <h3 className="mt-3 text-sm font-bold text-white">{title}</h3>
                <p className="mt-1.5 text-xs leading-relaxed text-slate-400">{body}</p>
              </div>
            ))}
          </div>
        </section>
      </Reveal>

      {/* Good to know */}
      <Reveal>
        <section className="card border-amber-500/25 bg-amber-500/[0.04] p-6 sm:p-7">
          <div className="flex items-start gap-3">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-amber-500/15 text-amber-300">
              <Info size={17} strokeWidth={2} />
            </span>
            <div>
              <h2 className="text-lg font-bold text-amber-200">Good to know</h2>
              <ul className="mt-3 space-y-2 text-sm leading-relaxed text-amber-100/85">
                {LIMITS.map((line) => (
                  <li key={line} className="flex gap-2">
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-amber-300/80" />
                    <span>{line}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      </Reveal>

      {/* Privacy promise */}
      <Reveal>
        <section className="card p-6 sm:p-7">
          <div className="flex items-start gap-3">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-emerald-500/15 text-emerald-300">
              <ShieldCheck size={17} strokeWidth={2} />
            </span>
            <div>
              <h2 className="text-lg font-bold text-white">Your privacy</h2>
              <p className="mt-2 text-sm leading-relaxed text-slate-400">
                There is no backend, no database and no analytics. Your image, your secret and your
                password never leave the browser — not to this site, not to a third party, not
                anywhere.
              </p>
            </div>
          </div>
        </section>
      </Reveal>

      {/* Technical details (collapsible) */}
      <Reveal>
        <details className="card group p-6 sm:p-7">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-3 text-lg font-bold text-white">
            <span>For the curious: technical details</span>
            <ChevronDown
              size={18}
              className="shrink-0 text-slate-400 transition-transform duration-200 group-open:rotate-180"
            />
          </summary>

          <div className="mt-5 space-y-5 text-sm leading-relaxed text-slate-400">
            <div>
              <h3 className="text-sm font-bold text-slate-200">Encoding</h3>
              <p className="mt-1.5">
                The image is drawn to an offscreen canvas and read back as raw RGBA pixel data. Each
                bit of the payload replaces the least-significant bit of the R, G and B channels of
                consecutive pixels; the alpha channel is never modified. The result is exported as a
                lossless PNG.
              </p>
            </div>

            <div>
              <h3 className="text-sm font-bold text-slate-200">Container format</h3>
              <p className="mt-1.5">
                A 14-byte header precedes the payload: the 8-byte magic{" "}
                <code className="mono text-pry-300">PRYKRYPT</code>, a format version byte, a flags
                byte (encrypted / not encrypted), and a 32-bit big-endian body length. This lets
                PryKrypt detect a payload and know exactly how many bytes to read back.
              </p>
            </div>

            <div>
              <h3 className="text-sm font-bold text-slate-200">Encryption</h3>
              <p className="mt-1.5">
                With a password, the payload is encrypted using AES-256-GCM. The key is derived from
                the password with PBKDF2-SHA256 (210 000 iterations) using a fresh 16-byte salt, and
                a new 12-byte IV is used per image. AES-GCM authenticates the ciphertext, so a wrong
                password fails cleanly instead of producing garbage.
              </p>
            </div>

            <div>
              <h3 className="text-sm font-bold text-slate-200">Capacity</h3>
              <p className="mt-1.5">
                Each pixel contributes 3 bits. An image of{" "}
                <span className="mono text-slate-200">W × H</span> pixels holds{" "}
                <span className="mono text-slate-200">(W × H × 3) / 8</span> bytes — roughly 760 KB
                for a 1920×1080 PNG. PryKrypt validates capacity before encoding and rejects cover
                images above 20 megapixels to keep browser memory safe.
              </p>
            </div>

            <div>
              <h3 className="text-sm font-bold text-slate-200">Transparency handling</h3>
              <p className="mt-1.5">
                Semi-transparent pixels are composited onto black on load, so the exported RGBA data
                is fully opaque and round-trips losslessly through the canvas pipeline.
              </p>
            </div>
          </div>
        </details>
      </Reveal>

      <Reveal>
        <footer className="pb-6 text-center text-xs text-slate-500">
          <p>Copyright (c) 2026 Praveenkanth G. All Rights Reserved.</p>
        </footer>
      </Reveal>
    </div>
  );
}