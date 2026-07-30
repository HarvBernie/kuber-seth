export function SectionLabel({ index, title, meta }: { index: string; title: string; meta?: string }) {
  return (
    <div className="flex items-center justify-between gap-4 border-t border-foreground/20 pt-4">
      <div className="flex items-baseline gap-3">
        <span className="font-mono text-xs text-accent">({index})</span>
        <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-foreground/70">{title}</span>
      </div>
      {meta && <span className="hidden sm:block font-mono text-[11px] uppercase tracking-[0.25em] text-foreground/40">{meta}</span>}
    </div>
  );
}
