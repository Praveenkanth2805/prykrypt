"use client";

import { useRef, useState } from "react";

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
        "flex cursor-pointer flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed px-6 py-12 text-center transition",
        disabled
          ? "cursor-not-allowed border-white/10 opacity-60"
          : dragging
            ? "border-pry-400 bg-pry-500/10"
            : "border-white/15 bg-white/[0.02] hover:border-pry-500/50 hover:bg-pry-500/5",
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

      <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-pry-500/15 text-pry-300">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
          <polyline points="17 8 12 3 7 8" />
          <line x1="12" y1="3" x2="12" y2="15" />
        </svg>
      </span>

      <span className="text-sm font-semibold text-slate-100">{title}</span>
      {hint ? <span className="max-w-sm text-xs text-slate-400">{hint}</span> : null}
    </div>
  );
}