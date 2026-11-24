
"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

import iconPng from "@/app/icon.png";

const LINKS = [
  { href: "/", label: "Home" },
  { href: "/hide", label: "Hide" },
  { href: "/extract", label: "Extract" },
  { href: "/about", label: "About" },
  { href: "/privacy", label: "Privacy" },
];

export default function NavBar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-ink-950/70 backdrop-blur-xl">
      <div className="relative mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <Link
          href="/"
          className="group flex items-center gap-2.5"
          onClick={() => setMenuOpen(false)}
        >
          <span className="relative flex h-9 w-9 items-center justify-center overflow-hidden rounded-xl shadow-lg shadow-pry-700/40 ring-1 ring-white/10">
            <Image
              src={iconPng}
              alt="PryKrypt logo"
              width={36}
              height={36}
              className="h-full w-full object-cover"
              priority
            />
          </span>
          <span className="leading-tight">
            <span className="block text-sm font-bold tracking-wide text-white">
              PryKrypt
            </span>
            <span className="hidden text-[10px] uppercase tracking-[0.18em] text-slate-400 sm:block">
              Hidden in Pixels
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 rounded-xl border border-white/10 bg-white/[0.03] p-1 md:flex">
          {LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={[
                "rounded-lg px-3 py-1.5 text-sm font-semibold transition",
                isActive(link.href)
                  ? "bg-pry-600/25 text-pry-200 shadow-inner shadow-pry-500/20"
                  : "text-slate-400 hover:bg-white/5 hover:text-slate-100",
              ].join(" ")}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <button
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-slate-200 transition hover:bg-white/10 md:hidden"
          aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>

        {menuOpen && (
          <nav
            id="mobile-navigation"
            className="absolute left-4 right-4 top-full mt-2 flex flex-col gap-1 rounded-2xl border border-white/10 bg-ink-950 p-2 shadow-2xl shadow-black/40 md:hidden"
          >
            {LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                aria-current={isActive(link.href) ? "page" : undefined}
                className={[
                  "rounded-xl px-4 py-3 text-sm font-semibold transition",
                  isActive(link.href)
                    ? "bg-pry-600/25 text-pry-200"
                    : "text-slate-400 hover:bg-white/5 hover:text-slate-100",
                ].join(" ")}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
}
