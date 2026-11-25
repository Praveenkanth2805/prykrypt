import type { Metadata, Viewport } from "next";

import Footer from "@/components/Footer";
import NavBar from "@/components/NavBar";

import "./globals.css";

const SITE_URL = "https://prykrypt.vercel.app";
const CREATOR_URL = "https://praveenkanth-g.vercel.app/";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  verification: {
    google: "RdYckMqKa8nAtaBuypwgtsEaYCK1PRXIiQVYlDh1mFs",
  },
  title: {
    default: "PryKrypt — Your Secrets, Hidden in Pixels.",
    template: "%s · PryKrypt",
  },
  description:
    "PryKrypt is a privacy-first image steganography tool. Hide encrypted text or files inside PNG pixels with optional AES-256-GCM protection — entirely in your browser, with no uploads and no server.",
  applicationName: "PryKrypt",
  authors: [{ name: "Praveenkanth G", url: CREATOR_URL }],
  creator: "Praveenkanth G",
  publisher: "Praveenkanth G",
  keywords: [
    "image steganography",
    "hide text in image",
    "encrypted steganography",
    "AES-256-GCM",
    "LSB steganography",
    "privacy tool",
    "client-side encryption",
    "PNG steganography",
    "PryKrypt",
  ],
  category: "technology",
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "PryKrypt",
    title: "PryKrypt — Your Secrets, Hidden in Pixels.",
    description:
      "Hide encrypted text or files inside PNG pixels with optional AES-256-GCM protection. Runs entirely in your browser — no uploads, no accounts, no servers.",
    locale: "en_US",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "PryKrypt — Your Secrets, Hidden in Pixels.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "PryKrypt — Your Secrets, Hidden in Pixels.",
    description:
      "Hide encrypted text or files inside PNG pixels with optional AES-256-GCM protection. Runs entirely in your browser.",
    images: ["/opengraph-image"],
  },
  icons: {
    icon: [{ url: "/icon.png", type: "image/svg+xml" }],
  },
};

export const viewport: Viewport = {
  themeColor: "#06030d",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "PryKrypt",
  applicationCategory: "SecurityApplication",
  applicationSubCategory: "Image Steganography",
  operatingSystem: "Any modern web browser",
  url: SITE_URL,
  description:
    "PryKrypt hides encrypted text or files inside the pixels of PNG images using LSB steganography with optional AES-256-GCM encryption. Runs entirely client-side.",
  inLanguage: "en",
  isAccessibleForFree: true,
  creator: {
    "@type": "Person",
    name: "Praveenkanth G",
    url: CREATOR_URL,
  },
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
  featureList: [
    "Hide secret text or files inside PNG images",
    "AES-256-GCM encryption with PBKDF2-SHA256 key derivation",
    "LSB steganography across RGB channels",
    "Fully client-side processing — no uploads",
    "Round-trip verification of generated PNGs",
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="flex min-h-dvh flex-col font-sans">
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <NavBar />
        <main className="mx-auto w-full max-w-6xl flex-1 px-4 pb-20 pt-8 sm:px-6">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
