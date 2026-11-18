import type { Metadata } from "next";

import HidePanel from "@/components/HidePanel";

export const metadata: Metadata = {
  title: "Hide a Secret",
  description:
    "Embed an encrypted message or file inside a PNG image using LSB steganography. Runs entirely in your browser.",
};

export default function HidePage() {
  return <HidePanel />;
}