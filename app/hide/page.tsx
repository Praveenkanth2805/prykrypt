import type { Metadata } from "next";

import HidePanel from "@/components/HidePanel";

export const metadata: Metadata = {
  title: "Hide a Secret",
  description:
    "Embed an encrypted message or file inside a PNG image using LSB steganography. Optional AES-256-GCM password protection, runs entirely in your browser.",
  alternates: { canonical: "/hide" },
};

export default function HidePage() {
  return <HidePanel />;
}