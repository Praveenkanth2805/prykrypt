import Link from "next/link";
import {
  CheckCircle2,
  Image as ImageIcon,
  Lock,
  ShieldCheck,
  Upload,
  Layers,
  Download,
  ScanSearch,
} from "lucide-react";

const FEATURES = [
  {
    icon: Lock,
    title: "AES-256-GCM encryption",
    body: "Optional password protection uses the Web Crypto API with PBKDF2-SHA256 key derivation (210 000 iterations) and a fresh random salt and IV per image.",
  },
  {
    icon: Layers,
    title: "LSB steganography",
    body: "Payload bits replace the least-significant bits of the RGB channels. Invisible to the human eye, perfectly lossless when written to PNG.",
  },
  {
    icon: ShieldCheck,
    title: "Zero uploads",
    body: "Image decoding, encoding and encryption all happen on your device. No server, no database, no telemetry, no accounts.",
  },
  {
    icon: CheckCircle2,
    title: "Verified output",
    body: "Every generated PNG is decoded again in memory to confirm the payload survives the round trip before the download is offered.",
  },
];

const STEPS = [
  {
    icon: Upload,
    title: "Select a cover image",
    body: "Upload any PNG. Larger images hold more secret data — a 1920×1080 PNG carries roughly 760 KB.",
  },
  {
    icon: Lock,
    title: "Add your payload",
    body: "Enter a message or attach a file, then set a password to encrypt the payload with AES-256-GCM.",
  },
  {
    icon: Download,
    title: "Download the stego-PNG",
    body: "The output is a lossless PNG that looks identical to the original but carries the encrypted payload inside its pixels.",
  },
  {
    icon: ScanSearch,
    title: "Extract on demand",
    body: "Open the PNG in PryKrypt, unlock it with your password, and recover the text or file — all locally.",
  },
];

export default function HomePage() {
  return (
    <div className="space-y-16">
      <section className="animate-fade-up pt-6 text-center sm:pt-12">
        <span className="inline-flex items-center gap-2 rounded-full border border-pry-500/30 bg-pry-500/10 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-pry-200">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
          Client-side · no uploads · no accounts
        </span>

        <h1 className="mx-auto mt-6 max-w-3xl text-4xl font-black leading-tight tracking-tight text-white sm:text-6xl">
          Your Secrets,{" "}
          <span className="bg-gradient-to-r from-pry-400 via-fuchsia-400 to-pry-300 bg-clip-text text-transparent">
            Hidden in Pixels.
          </span>
        </h1>

        <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-slate-400 sm:text-lg">
          PryKrypt is a privacy-first image steganography tool. It embeds text or files inside
          ordinary PNG images — encrypted with AES-256-GCM when you supply a password — without
          ever sending data to a server.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link href="/hide" className="btn-primary px-6 py-3 text-base">
            Hide a Secret
          </Link>
          <Link href="/extract" className="btn-ghost px-6 py-3 text-base">
            Extract a Secret
          </Link>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-2">
        {FEATURES.map(({ icon: Icon, title, body }) => (
          <div key={title} className="card p-5">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-pry-500/15 text-pry-300">
              <Icon size={20} strokeWidth={1.8} />
            </span>
            <h2 className="mt-3 text-base font-bold text-white">{title}</h2>
            <p className="mt-2 text-sm leading-relaxed text-slate-400">{body}</p>
          </div>
        ))}
      </section>

      <section>
        <h2 className="text-center text-xs font-bold uppercase tracking-[0.25em] text-pry-300">
          How it works
        </h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map(({ icon: Icon, title, body }) => (
            <div key={title} className="card p-5">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-pry-500/15 text-pry-300">
                <Icon size={17} strokeWidth={1.9} />
              </span>
              <h3 className="mt-3 text-sm font-bold text-white">{title}</h3>
              <p className="mt-1.5 text-xs leading-relaxed text-slate-400">{body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="card animate-fade-up p-6 text-center sm:p-10">
        <h2 className="text-xl font-bold text-white sm:text-2xl">
          Private steganography, straight from your browser
        </h2>
        <p className="mx-auto mt-2 max-w-xl text-sm text-slate-400">
          No account required. No data leaves your device. Open the encoder, choose an image and a
          secret, and download a PNG that carries it.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Link href="/hide" className="btn-primary">
            Open the encoder
          </Link>
          <Link href="/about" className="btn-ghost">
            Technical overview
          </Link>
        </div>
      </section>
    </div>
  );
}