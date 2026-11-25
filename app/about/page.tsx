
import type { Metadata } from "next";
import Image from "next/image";
import {
  CheckCircle2,
  ChevronDown,
  Download,
  FileWarning,
  KeyRound,
  Lock,
  ScanSearch,
  Share2,
  ShieldCheck,
  Sparkles,
  Upload,
  Fingerprint,
} from "lucide-react";

import Reveal from "@/components/Reveal";
import iconWebp from "@/app/icon.png";

export const metadata: Metadata = {
  title: "About",
  description:
    "Discover how PryKrypt hides messages and files inside PNG images using privacy-first steganography and optional encryption.",
  alternates: { canonical: "/about" },
};

const VALUES = [
  {
    icon: ShieldCheck,
    title: "100% Local Processing",
    body: "Images, messages, files and passwords are processed directly in your browser. Nothing is uploaded to a server.",
  },
  {
    icon: Lock,
    title: "Strong Encryption",
    body: "Optional password protection uses AES-256-GCM to encrypt your secret before embedding it.",
  },
  {
    icon: Sparkles,
    title: "Invisible to the Eye",
    body: "Your secret is embedded in the least-significant bits of image pixels without visibly changing the image.",
  },
  {
    icon: CheckCircle2,
    title: "Automatic Verification",
    body: "Every generated PNG is decoded again in memory to verify that the embedded data survives.",
  },
];

const STEPS = [
  {
    icon: Upload,
    title: "Choose an image",
    body: "Select a PNG image to use as the cover for your hidden message or file.",
  },
  {
    icon: KeyRound,
    title: "Add your secret",
    body: "Enter a message or attach a file. Add a password if you want encryption.",
  },
  {
    icon: Download,
    title: "Export securely",
    body: "Download your PNG with the hidden payload embedded inside.",
  },
  {
    icon: ScanSearch,
    title: "Extract your secret",
    body: "Upload the generated PNG, enter your password if required, and recover your data.",
  },
];

const LIMITS = [
  {
    icon: FileWarning,
    title: "PNG format only",
    body: "Resizing, cropping, converting to JPEG or editing the image can destroy hidden data.",
  },
  {
    icon: Share2,
    title: "Share as a file",
    body: "Messaging apps may recompress photos. Send the PNG as a document or ZIP archive.",
  },
  {
    icon: Download,
    title: "Download before extracting",
    body: "Recipients must download the original PNG instead of using compressed chat previews.",
  },
  {
    icon: Lock,
    title: "No password recovery",
    body: "Lost passwords cannot be recovered. Keep your password somewhere safe.",
  },
];

export default function AboutPage() {
  return (
    <main className="mx-auto max-w-5xl space-y-20 pb-10">

      {/* Hero */}
      <Reveal>
        <section className="relative overflow-hidden rounded-3xl border border-pry-500/20 bg-gradient-to-b from-pry-500/[0.12] via-slate-900/40 to-transparent px-6 py-14 text-center sm:px-12 sm:py-20">
          <div className="pointer-events-none absolute left-1/2 top-0 h-64 w-64 -translate-x-1/2 rounded-full bg-pry-500/10 blur-[100px]" />

          <div className="relative">
            <div className="mx-auto flex h-20 w-20 items-center justify-center overflow-hidden rounded-3xl border border-white/10 bg-slate-900 shadow-2xl shadow-pry-500/20">
              <Image
                src={iconWebp}
                alt="PryKrypt icon"
                width={80}
                height={80}
                className="h-full w-full object-cover"
                priority
              />
            </div>

            <span className="mt-7 inline-flex items-center gap-2 rounded-full border border-pry-400/20 bg-pry-400/10 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.18em] text-pry-300">
              <Fingerprint size={13} />
              Privacy by design
            </span>

            <h1 className="mx-auto mt-6 max-w-3xl text-4xl font-black tracking-tight text-white sm:text-5xl lg:text-6xl">
              Your secrets.
              <span className="block bg-gradient-to-r from-pry-300 to-violet-400 bg-clip-text text-transparent">
                Hidden in plain sight.
              </span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-slate-400 sm:text-base">
              PryKrypt lets you hide messages and files inside ordinary PNG images.
              The image looks unchanged, while your private data stays hidden within it.
            </p>

            <p className="mx-auto mt-5 max-w-xl text-xs leading-6 text-slate-500">
              The name combines{" "}
              <strong className="text-slate-300">PK</strong> (Praveenkanth),{" "}
              <strong className="text-slate-300">Privacy</strong> and{" "}
              <strong className="text-slate-300">Cryptography</strong>.
              Three ideas behind one tool.
            </p>
          </div>
        </section>
      </Reveal>

      {/* Values */}
      <Reveal>
        <section>
          <div className="mb-8 text-center">
            <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-pry-400">
              What makes us different
            </span>
            <h2 className="mt-3 text-2xl font-black text-white sm:text-3xl">
              Privacy comes first.
            </h2>
            <p className="mx-auto mt-3 max-w-lg text-sm text-slate-400">
              Built around simple principles that keep your data under your control.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {VALUES.map(({ icon: Icon, title, body }, index) => (
              <div
                key={title}
                className="group rounded-2xl border border-white/[0.07] bg-white/[0.025] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-pry-400/30 hover:bg-pry-500/[0.05]"
              >
                <div className="flex items-center justify-between">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-pry-400/15 bg-pry-500/10 text-pry-300 transition-colors group-hover:bg-pry-500/20">
                    <Icon size={21} strokeWidth={1.8} />
                  </span>
                  <span className="font-mono text-xs text-slate-600">
                    0{index + 1}
                  </span>
                </div>

                <h3 className="mt-5 text-base font-bold text-white">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-400">{body}</p>
              </div>
            ))}
          </div>
        </section>
      </Reveal>

      {/* How it works */}
      <Reveal>
        <section>
          <div className="mb-8 text-center">
            <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-pry-400">
              Simple process
            </span>
            <h2 className="mt-3 text-2xl font-black text-white sm:text-3xl">
              How PryKrypt works
            </h2>
            <p className="mt-3 text-sm text-slate-400">
              Four steps. One hidden secret.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {STEPS.map(({ icon: Icon, title, body }, index) => (
              <div
                key={title}
                className="relative rounded-2xl border border-white/[0.07] bg-slate-900/50 p-5 transition-all duration-300 hover:border-pry-400/30"
              >
                <div className="flex items-center justify-between">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-pry-500/10 text-pry-300">
                    <Icon size={20} />
                  </span>
                  <span className="font-mono text-2xl font-black text-pry-400/30">
                    0{index + 1}
                  </span>
                </div>
                <h3 className="mt-5 text-sm font-bold text-white">{title}</h3>
                <p className="mt-2 text-xs leading-6 text-slate-400">{body}</p>
              </div>
            ))}
          </div>
        </section>
      </Reveal>

      {/* Limitations */}
      <Reveal>
        <section>
          <div className="mb-8 text-center">
            <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-amber-400">
              Important information
            </span>
            <h2 className="mt-3 text-2xl font-black text-white sm:text-3xl">
              Things to keep in mind.
            </h2>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {LIMITS.map(({ icon: Icon, title, body }) => (
              <div
                key={title}
                className="flex gap-4 rounded-2xl border border-amber-400/10 bg-amber-400/[0.025] p-5 transition-colors hover:border-amber-400/25"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-400/10 text-amber-300">
                  <Icon size={19} />
                </span>
                <div>
                  <h3 className="text-sm font-bold text-slate-200">{title}</h3>
                  <p className="mt-1.5 text-xs leading-6 text-slate-400">{body}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </Reveal>

      {/* Privacy */}
      <Reveal>
        <section className="relative overflow-hidden rounded-3xl border border-emerald-400/15 bg-gradient-to-br from-emerald-500/[0.08] to-transparent p-7 sm:p-10">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
            <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-emerald-400/20 bg-emerald-400/10 text-emerald-300">
              <ShieldCheck size={28} />
            </span>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-emerald-400">
                Our privacy commitment
              </span>
              <h2 className="mt-2 text-xl font-black text-white sm:text-2xl">
                Your data stays yours.
              </h2>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-400">
                PryKrypt has no backend, database or analytics. Image processing,
                encryption and extraction happen locally in your browser.
                Your image, secret and password are not sent to our servers.
              </p>
            </div>
          </div>
        </section>
      </Reveal>

      {/* Technical details */}
      <Reveal>
        <details className="group overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.02] open:border-pry-400/20">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-6">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-pry-400">
                Under the hood
              </span>
              <h2 className="mt-2 text-base font-bold text-white sm:text-lg">
                Technical details
              </h2>
              <p className="mt-1 text-xs text-slate-500">
                Explore the technology powering PryKrypt.
              </p>
            </div>
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/5 text-slate-400 transition-all group-open:rotate-180 group-open:bg-pry-500/10 group-open:text-pry-300">
              <ChevronDown size={19} />
            </span>
          </summary>

          <div className="space-y-6 border-t border-white/[0.06] p-6 text-sm leading-7 text-slate-400">
            <div>
              <h3 className="font-bold text-slate-200">Encoding · LSB Steganography</h3>
              <p className="mt-2">
                The image is drawn to an offscreen canvas and read as raw RGBA
                pixel data. Each payload bit replaces the least-significant bit
                of the R, G and B channels. The alpha channel remains unchanged.
                The result is exported as a lossless PNG.
              </p>
            </div>

            <div>
              <h3 className="font-bold text-slate-200">Container format</h3>
              <p className="mt-2">
                A 14-byte header precedes the payload: the 8-byte magic{" "}
                <code className="rounded bg-pry-500/10 px-1.5 py-0.5 text-pry-300">
                  PRYKRYPT
                </code>
                , a format version byte, a flags byte and a 32-bit big-endian
                body length.
              </p>
            </div>

            <div>
              <h3 className="font-bold text-slate-200">Encryption · AES-256-GCM</h3>
              <p className="mt-2">
                Password-protected payloads use AES-256-GCM. The encryption key
                is derived with PBKDF2-SHA256 using 210,000 iterations and a
                fresh 16-byte salt. Each image uses a new 12-byte IV.
              </p>
            </div>

            <div>
              <h3 className="font-bold text-slate-200">Capacity and limits</h3>
              <p className="mt-2">
                Each pixel contributes 3 bits. An image of{" "}
                <code className="text-slate-200">W × H</code> pixels provides
                approximately{" "}
                <code className="text-slate-200">(W × H × 3) / 8</code> bytes
                before header and encryption overhead. A 1920 × 1080 image
                provides approximately 760 KB. Cover images above 20 megapixels
                are rejected to limit browser memory usage.
              </p>
            </div>
          </div>
        </details>
      </Reveal>

      {/* Footer */}
      <Reveal>
        <footer className="border-t border-white/[0.06] pt-7 text-center">
          <div className="flex items-center justify-center gap-2 text-xs text-slate-500">
            <ShieldCheck size={14} className="text-pry-400" />
            <span>Built with privacy in mind.</span>
          </div>
          <p className="mt-3 text-[11px] text-slate-600">
            Copyright (c) 2026 Praveenkanth G. All Rights Reserved.
          </p>
        </footer>
      </Reveal>
    </main>
  );
}
