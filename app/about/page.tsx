import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description: "How PryKrypt works, its technical design, and its limitations.",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl space-y-10">
      <header className="animate-fade-up">
        <h1 className="text-3xl font-black tracking-tight text-white">About PryKrypt</h1>
        <p className="mt-3 text-sm leading-relaxed text-slate-400">
          PryKrypt blends <strong className="text-slate-200">PK</strong> (Praveenkanth) with{" "}
          <strong className="text-slate-200">Privacy</strong> and{" "}
          <strong className="text-slate-200">Cryptography</strong>. It is a fully client-side
          steganography tool: a secret is written into the pixels of a PNG image, and optionally
          encrypted with a password before it ever touches the pixels.
        </p>
      </header>

      <section className="card p-6">
        <h2 className="text-lg font-bold text-white">How the encoding works</h2>
        <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm leading-relaxed text-slate-400">
          <li>
            The image is drawn to an offscreen canvas and read back as raw RGBA pixel data.
          </li>
          <li>
            The secret is serialized into a self-describing payload (text or file, with filename
            and MIME type).
          </li>
          <li>
            If a password is supplied, the payload is encrypted with AES-256-GCM. A 16-byte random
            salt and a 12-byte random IV are generated per image, and the key is derived with
            PBKDF2-SHA256 (210 000 iterations).
          </li>
          <li>
            A 14-byte container header is prepended: the magic string{" "}
            <code className="mono text-pry-300">PRYKRYPT</code>, a format version byte, a flags byte
            (encrypted / not encrypted) and a 32-bit big-endian body length.
          </li>
          <li>
            Every bit of the container is written into the least-significant bit of the R, G and B
            channels of consecutive pixels. The alpha channel is never modified.
          </li>
          <li>
            The canvas is exported as a lossless PNG, then decoded again in memory to verify that
            the payload survives the round trip.
          </li>
        </ol>
      </section>

      <section className="card p-6">
        <h2 className="text-lg font-bold text-white">Capacity</h2>
        <p className="mt-3 text-sm leading-relaxed text-slate-400">
          Each pixel contributes 3 bits (one per RGB channel). An image of{" "}
          <span className="mono text-slate-200">W × H</span> pixels can hold{" "}
          <span className="mono text-slate-200">(W × H × 3) / 8</span> bytes. A 1920 × 1080 image
          therefore holds roughly 760 KB of payload — enough for a long message or a small file.
          PryKrypt validates capacity before encoding and blocks images above 20 megapixels to
          protect browser memory.
        </p>
      </section>

      <section className="card p-6">
        <h2 className="text-lg font-bold text-white">Security model</h2>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed text-slate-400">
          <li>All processing — decoding, encoding, encryption, decryption — happens in your browser.</li>
          <li>No image, secret, file or password is ever sent over the network.</li>
          <li>Passwords and secrets are never written to localStorage, sessionStorage or cookies.</li>
          <li>
            Encryption uses AES-256-GCM, which provides both confidentiality and integrity. A wrong
            password fails authentication rather than producing garbage.
          </li>
          <li>
            Without a password, the payload is only <em>hidden</em>, not encrypted. Anyone who
            suspects steganography and inspects the LSBs can read it.
          </li>
        </ul>
      </section>

      <section className="card border-amber-500/25 bg-amber-500/[0.04] p-6">
        <h2 className="text-lg font-bold text-amber-200">Limitations</h2>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed text-amber-100/80">
          <li>
            PryKrypt images must be decoded with PryKrypt-compatible logic. This format is{" "}
            <strong>not</strong> compatible with Steghide or any other steganography tool.
          </li>
          <li>
            The output must remain a PNG. JPEG compression, resizing, cropping, format conversion
            or editing the image in any way will destroy the hidden data.
          </li>
          <li>
            Screenshots, messaging apps and social platforms recompress images — always transfer
            the original PNG file.
          </li>
          <li>
            Fully opaque images are recommended. Semi-transparent pixels may not survive the canvas
            round trip in every browser; PryKrypt will warn you if verification fails.
          </li>
          <li>There is no password recovery. Lose the password and the payload is unrecoverable.</li>
        </ul>
      </section>

      <footer className="pb-6 text-center text-xs text-slate-500">
        <p>Copyright (c) 2026 Praveenkanth G. All Rights Reserved.</p>
      </footer>
    </div>
  );
}