"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const LINKS = [
  { href: "/", label: "Home" },
  { href: "/hide", label: "Hide" },
  { href: "/extract", label: "Extract" },
  { href: "/about", label: "About" },
];

export default function NavBar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-ink-950/70 backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <Link href="/" className="group flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-pry-500 to-fuchsia-600 text-sm font-black text-white shadow-lg shadow-pry-700/40">
            PK
          </span>
          <span className="leading-tight">
            <span className="block text-sm font-bold tracking-wide text-white">PryKrypt</span>
            <span className="hidden text-[10px] uppercase tracking-[0.18em] text-slate-400 sm:block">
              Hidden in Pixels
            </span>
          </span>
        </Link>

        <nav className="flex items-center gap-1 rounded-xl border border-white/10 bg-white/[0.03] p-1">
          {LINKS.map((link) => {
            const active =
              link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={[
                  "rounded-lg px-3 py-1.5 text-xs font-semibold transition sm:text-sm",
                  active
                    ? "bg-pry-600/25 text-pry-200 shadow-inner shadow-pry-500/20"
                    : "text-slate-400 hover:bg-white/5 hover:text-slate-100",
                ].join(" ")}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}