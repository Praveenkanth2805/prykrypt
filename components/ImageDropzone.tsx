"use client";

import { useRef, useState } from "react";
import { UploadCloud } from "lucide-react";

interface ImageDropzoneProps {
  onFile: (file: File) => void;
  title: string;
  hint?: string;
  accept?: string;
  disabled?: boolean;
}

export default function ImageDropzone({
  onFile,
  title,
  hint,
  accept = "image/*",
  disabled = false,
}: ImageDropzoneProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);

  const handleFiles = (files: FileList | null) => {
    const file = files?.[0];
    if (file) onFile(file);
  };

  const openPicker = () => {
    if (!disabled) inputRef.current?.click();
  };

  return (
    <div
      role="button"
      tabIndex={0}
      aria-disabled={disabled}
      onClick={openPicker}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          openPicker();
        }
      }}
      onDragOver={(event) => {
        event.preventDefault();
        if (!disabled) setDragging(true);
      }}
      onDragLeave={() => setDragging(false)}
      onDrop={(event) => {
        event.preventDefault();
        setDragging(false);
        if (!disabled) handleFiles(event.dataTransfer.files);
      }}
      className={[
        "flex min-h-[180px] cursor-pointer flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed px-4 py-8 text-center transition sm:min-h-[220px] sm:px-6 sm:py-12",
        disabled
          ? "cursor-not-allowed border-white/10 opacity-60"
          : dragging
            ? "border-pry-400 bg-pry-500/10"
            : "border-white/15 bg-white/[0.02] hover:border-pry-500/50 hover:bg-pry-500/5 active:border-pry-400 active:bg-pry-500/10",
      ].join(" ")}
    >
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        className="hidden"
        disabled={disabled}
        onChange={(event) => {
          handleFiles(event.target.files);
          event.target.value = "";
        }}
      />

      <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-pry-500/15 text-pry-300 sm:h-14 sm:w-14">
        <UploadCloud size={22} strokeWidth={1.8} />
      </span>

      <span className="text-sm font-semibold text-slate-100 sm:text-base">{title}</span>
      {hint ? (
        <span className="max-w-sm text-xs leading-relaxed text-slate-400 sm:text-sm">{hint}</span>
      ) : null}
    </div>
  );
}