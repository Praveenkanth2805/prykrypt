interface StepHeaderProps {
  index: number;
  title: string;
  subtitle?: string;
}

export default function StepHeader({ index, title, subtitle }: StepHeaderProps) {
  return (
    <div className="flex items-start gap-2.5 sm:gap-3">
      <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-pry-500/15 text-[11px] font-bold text-pry-300 sm:h-7 sm:w-7 sm:text-xs">
        {index}
      </span>
      <div className="min-w-0">
        <h2 className="text-xs font-bold uppercase tracking-wider text-slate-100 sm:text-sm">
          {title}
        </h2>
        {subtitle ? (
          <p className="mt-1 text-[11px] leading-relaxed text-slate-400 sm:text-xs">{subtitle}</p>
        ) : null}
      </div>
    </div>
  );
}