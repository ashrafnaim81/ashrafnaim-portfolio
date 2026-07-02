/**
 * Ticker kemahiran infinit (CSS sahaja). Kandungan diduakan supaya
 * gelung -50% kelihatan lancar; berhenti ketika hover.
 */
export function Marquee({ items }: { items: string[] }) {
  const doubled = [...items, ...items];
  return (
    <div className="marquee relative overflow-hidden border-y border-border/60 bg-card/40 py-4 backdrop-blur-sm">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-background to-transparent"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-background to-transparent"
      />
      <div className="marquee-track flex w-max items-center gap-10">
        {doubled.map((item, i) => (
          <span
            key={i}
            aria-hidden={i >= items.length}
            className="flex items-center gap-10 font-mono text-sm uppercase tracking-[0.2em] text-muted-foreground"
          >
            {item}
            <span className="text-primary">◆</span>
          </span>
        ))}
      </div>
    </div>
  );
}
