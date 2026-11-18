export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-ink-950/60">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-3 px-4 py-8 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <p className="text-slate-400">
          <span className="font-semibold text-pry-300">PryKrypt</span> — Your Secrets, Hidden in Pixels.
        </p>
        <p>Copyright (c) 2026 Praveenkanth G. All Rights Reserved.</p>
      </div>
    </footer>
  );
}