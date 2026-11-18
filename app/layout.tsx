import type { Metadata } from "next";

import Footer from "@/components/Footer";
import NavBar from "@/components/NavBar";

import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "PryKrypt — Your Secrets, Hidden in Pixels",
    template: "%s · PryKrypt",
  },
  description:
    "PryKrypt is a privacy-first image steganography tool. Hide encrypted text or files inside PNG pixels — entirely in your browser, with no uploads and no servers.",
  applicationName: "PryKrypt",
  authors: [{ name: "Praveenkanth G" }],
  keywords: ["steganography", "privacy", "AES-GCM", "PNG", "client-side encryption"],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="flex min-h-dvh flex-col font-sans">
        <NavBar />
        <main className="mx-auto w-full max-w-6xl flex-1 px-4 pb-20 pt-8 sm:px-6">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}