interface AlertProps {
  tone: "error" | "success" | "warning" | "info";
  title?: string;
  children: React.ReactNode;
}

const TONES: Record<AlertProps["tone"], string> = {
  error: "border-red-500/30 bg-red-500/10 text-red-200",
  success: "border-emerald-500/30 bg-emerald-500/10 text-emerald-200",
  warning: "border-amber-500/30 bg-amber-500/10 text-amber-200",
  info: "border-pry-500/30 bg-pry-500/10 text-pry-200",
};

export default function Alert({ tone, title, children }: AlertProps) {
  return (
    <div className={`rounded-xl border px-4 py-3 text-sm ${TONES[tone]}`} role="status">
      {title ? <p className="mb-0.5 font-semibold">{title}</p> : null}
      <div className="leading-relaxed">{children}</div>
    </div>
  );
}