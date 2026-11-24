
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-ink-950/60 pb-20 md:pb-0">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-4 py-6 text-xs text-slate-500 sm:px-6 md:flex-row md:items-center md:justify-between md:py-8">
        <p className="text-center text-slate-400 md:text-left">
          <span className="font-semibold text-pry-300">PryKrypt</span>
          {" "}— Your Secrets, Hidden in Pixels.
        </p>

        <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center sm:gap-4">
          <Link
            href="/privacy"
            className="transition-colors hover:text-pry-300"
          >
            Privacy &amp; Acceptable Use
          </Link>

          <span className="text-center">
            Copyright © 2026 Praveenkanth G. All Rights Reserved.
          </span>
        </div>
      </div>
    </footer>
  );
}
