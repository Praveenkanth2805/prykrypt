interface StepHeaderProps {
  index: number;
  title: string;
  subtitle?: string;
}

export default function StepHeader({ index, title, subtitle }: StepHeaderProps) {
  return (
    <div className="flex items-start gap-3">
      <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-pry-500/15 text-xs font-bold text-pry-300">
        {index}
      </span>
      <div>
        <h2 className="text-sm font-bold uppercase tracking-wider text-slate-100">{title}</h2>
        {subtitle ? <p className="mt-1 text-xs text-slate-400">{subtitle}</p> : null}
      </div>
    </div>
  );
}