import type { Metadata } from "next";

import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Privacy & Acceptable Use",
  description:
    "PryKrypt runs entirely in your browser. Learn how your data is handled and read the acceptable-use and liability terms for this tool.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl space-y-8">
      <Reveal>
        <header>
          <h1 className="text-3xl font-black tracking-tight text-white">
            Privacy &amp; Acceptable Use
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-slate-400">
            PryKrypt is designed around a single principle: your secrets never leave your device.
            This page explains what that means in practice, and sets out the terms under which the
            tool may be used.
          </p>
        </header>
      </Reveal>

      <Reveal>
        <section className="card p-6">
          <h2 className="text-lg font-bold text-white">1. Data handling</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed text-slate-400">
            <li>
              <strong className="text-slate-200">No uploads.</strong> Images, secret messages, secret
              files, passwords and generated PNGs are processed entirely in your browser using the
              Canvas API and the Web Crypto API.
            </li>
            <li>
              <strong className="text-slate-200">No persistence.</strong> PryKrypt never writes
              secrets or passwords to <code className="mono">localStorage</code>,{" "}
              <code className="mono">sessionStorage</code>, cookies or IndexedDB. State is discarded
              when you close or reload the page.
            </li>
            <li>
              <strong className="text-slate-200">No analytics.</strong> No tracking scripts, no
              third-party beacons, no fingerprinting.
            </li>
            <li>
              <strong className="text-slate-200">No server.</strong> The application is a static
              Next.js build. There is no backend, no database and no API for your data to travel
              through.
            </li>
          </ul>
        </section>
      </Reveal>

      <Reveal>
        <section className="card p-6">
          <h2 className="text-lg font-bold text-white">2. Legal disclaimer</h2>
          <p className="mt-3 text-sm leading-relaxed text-slate-400">
            PryKrypt is provided <strong className="text-slate-200">as-is</strong>, without any
            warranty of any kind, express or implied. The author (Praveenkanth G) makes no guarantees
            regarding the confidentiality, integrity or availability of data encoded with this tool.
            Cryptographic and steganographic protections depend on the browser, the platform, the
            password chosen by the user, and the handling of the resulting PNG.
          </p>
        </section>
      </Reveal>

      <Reveal>
        <section className="card p-6">
          <h2 className="text-lg font-bold text-white">3. Acceptable use</h2>
          <p className="mt-3 text-sm leading-relaxed text-slate-400">
            PryKrypt is a privacy and cryptography utility. It may be used for any lawful purpose,
            including personal privacy, secure exchange of sensitive material between consenting
            parties, and academic or security research. The author does{" "}
            <strong className="text-slate-200">not</strong> endorse, encourage or take responsibility
            for any use of PryKrypt that is unlawful, harmful, deceptive, or that violates the rights
            of others.
          </p>
          <p className="mt-3 text-sm leading-relaxed text-slate-400">
            By using this tool, you acknowledge that you are solely responsible for the content you
            encode or decode and for compliance with all applicable laws in your jurisdiction. The
            author accepts no liability for any misuse, direct or indirect damages, or legal
            consequences arising from your use of PryKrypt.
          </p>
        </section>
      </Reveal>

      <Reveal>
        <section className="card p-6">
          <h2 className="text-lg font-bold text-white">4. Security limitations</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed text-slate-400">
            <li>Encryption is only as strong as the password you choose. There is no password recovery.</li>
            <li>
              Without a password the hidden payload is not encrypted — it is obfuscated by
              steganography only, and can be recovered by anyone who suspects the technique.
            </li>
            <li>
              Recompressing, resizing or converting the generated PNG to JPEG destroys the payload.
              PryKrypt cannot recover data from images that have been edited.
            </li>
            <li>
              Browser bugs, extensions with page access, or compromised devices can undermine any
              client-side tool. Use a trusted browser on a trusted machine.
            </li>
          </ul>
        </section>
      </Reveal>

      <Reveal>
  <section className="card p-6">
    <h2 className="text-lg font-bold text-white">5. Sharing PryKrypt images</h2>
    <p className="mt-3 text-sm leading-relaxed text-slate-400">
      PryKrypt relies on lossless PNG data. Many chat and social apps automatically recompress
      photos to JPEG when you send them as images, which permanently destroys the hidden payload.
      To transfer a PryKrypt image safely:
    </p>
    <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed text-slate-400">
      <li>
        <strong className="text-slate-200">Attach it as a document</strong>, not as a photo. Use
        your app&apos;s paperclip / file-attach option rather than the image picker.
      </li>
      <li>
        <strong className="text-slate-200">Use a channel that does not recompress:</strong> email
        attachment, Google Drive, AirDrop, or a file-sharing service.
      </li>
      <li>
        <strong className="text-slate-200">Zip the PNG</strong> before sending if the app insists
        on treating images as photos. A ZIP file is delivered unchanged.
      </li>
      <li>
        <strong className="text-slate-200">The recipient must download the file</strong> before
        opening it in PryKrypt. Chat apps preview images using a recompressed thumbnail, which no
        longer contains the payload.
      </li>
    </ul>
    <p className="mt-3 text-sm leading-relaxed text-slate-400">
      If a PryKrypt image is ever converted to JPEG, resized, cropped, or edited in any way, the
      payload is gone and cannot be recovered. There is no way for PryKrypt to reverse that
      damage — this is a property of lossy image compression, not a limitation of the tool.
    </p>
  </section>
</Reveal>

      <Reveal>
        <section className="card p-6">
          <h2 className="text-lg font-bold text-white">6. Contact</h2>
          <p className="mt-3 text-sm leading-relaxed text-slate-400">
            PryKrypt is an independent project by{" "}
            <a
              href="https://praveenkanth-g.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-pry-300 underline-offset-4 hover:underline"
            >
              Praveenkanth G
            </a>
            .
          </p>
        </section>
      </Reveal>

      <Reveal>
        <footer className="pb-6 text-center text-xs text-slate-500">
          <p>Copyright (c) 2026 Praveenkanth G. All Rights Reserved.</p>
        </footer>
      </Reveal>
    </div>
  );
}