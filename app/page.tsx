import Link from "next/link";

const FEATURES = [
  {
    title: "AES-256-GCM encryption",
    body: "Optional password protection uses the Web Crypto API with PBKDF2-SHA256 key derivation (210 000 iterations) and a fresh random salt + IV per image.",
    icon: "🔐",
  },
  {
    title: "LSB steganography",
    body: "Payload bits replace the least-significant bits of the RGB channels, making the change invisible to the human eye while staying lossless in PNG.",
    icon: "🖼️",
  },
  {
    title: "Zero uploads",
    body: "All image decoding, encoding and encryption happens on your device. No servers, no databases, no analytics on your files.",
    icon: "🛡️",
  },
  {
    title: "Verified output",
    body: "Every generated PNG is decoded again in-memory to confirm the payload survives the round trip before you download it.",
    icon: "✅",
  },
];

const STEPS = [
  { n: "01", title: "Pick a cover image", body: "Upload any PNG. Larger images hold more secret data." },
  { n: "02", title: "Add your secret", body: "Type a message or attach a file, and optionally set a password." },
  { n: "03", title: "Download & share", body: "Get a lossless PNG that looks identical but carries your payload." },
  { n: "04", title: "Extract later", body: "Open the PNG in PryKrypt, unlock it, and recover the secret." },
];

export default function HomePage() {
  return (
    <div className="space-y-16">
      <section className="animate-fade-up pt-6 text-center sm:pt-12">
        <span className="inline-flex items-center gap-2 rounded-full border border-pry-500/30 bg-pry-500/10 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-pry-200">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
          100% client-side · no uploads
        </span>

        <h1 className="mx-auto mt-6 max-w-3xl text-4xl font-black leading-tight tracking-tight text-white sm:text-6xl">
          Your Secrets,{" "}
          <span className="bg-gradient-to-r from-pry-400 via-fuchsia-400 to-pry-300 bg-clip-text text-transparent">
            Hidden in Pixels.
          </span>
        </h1>

        <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-slate-400 sm:text-lg">
          PryKrypt hides encrypted text or files inside ordinary PNG images using LSB
          steganography. Nothing ever leaves your browser — no backend, no database, no accounts.
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
        {FEATURES.map((feature) => (
          <div key={feature.title} className="card p-5">
            <div className="text-2xl">{feature.icon}</div>
            <h2 className="mt-3 text-base font-bold text-white">{feature.title}</h2>
            <p className="mt-2 text-sm leading-relaxed text-slate-400">{feature.body}</p>
          </div>
        ))}
      </section>

      <section>
        <h2 className="text-center text-xs font-bold uppercase tracking-[0.25em] text-pry-300">
          How it works
        </h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((step) => (
            <div key={step.n} className="card p-5">
              <span className="mono text-xs font-bold text-pry-400">{step.n}</span>
              <h3 className="mt-2 text-sm font-bold text-white">{step.title}</h3>
              <p className="mt-1.5 text-xs leading-relaxed text-slate-400">{step.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="card animate-fade-up p-6 text-center sm:p-10">
        <h2 className="text-xl font-bold text-white sm:text-2xl">Ready to disappear into the pixels?</h2>
        <p className="mx-auto mt-2 max-w-xl text-sm text-slate-400">
          No sign-up, no server, no trace. Just your image, your secret and your browser.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Link href="/hide" className="btn-primary">
            Start hiding
          </Link>
          <Link href="/about" className="btn-ghost">
            Read the technical details
          </Link>
        </div>
      </section>
    </div>
  );
}