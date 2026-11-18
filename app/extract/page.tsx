import type { Metadata } from "next";

import ExtractPanel from "@/components/ExtractPanel";

export const metadata: Metadata = {
  title: "Extract a Secret",
  description:
    "Recover hidden text or files from a PryKrypt PNG. Decryption happens locally with AES-GCM.",
};

export default function ExtractPage() {
  return <ExtractPanel />;
}