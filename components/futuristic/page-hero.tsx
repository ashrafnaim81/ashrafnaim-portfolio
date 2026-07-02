import { AuroraBackground } from './aurora-background';
import { GridPattern } from './grid-pattern';
import { Particles } from './particles';

/**
 * Hero kecil seragam untuk halaman dalaman (About/Portfolio/Blog/Talks/Contact).
 * Margin atas negatif meletakkan aurora di belakang nav kaca terapung.
 */
export function PageHero({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <section className="relative -mt-[4.25rem] overflow-hidden pb-12 pt-32 md:pt-36">
      <AuroraBackground className="opacity-70" />
      <GridPattern />
      <Particles density={26} />
      <div className="container mx-auto px-4 text-center sm:px-6 lg:px-8">
        <p className="mb-3 font-mono text-xs font-medium uppercase tracking-[0.25em] text-primary">
          {'// '}
          {eyebrow}
        </p>
        <h1 className="mb-4 text-4xl font-bold md:text-5xl">{title}</h1>
        <div className="mx-auto mb-4 h-px w-16 bg-gradient-to-r from-primary via-glow to-secondary" />
        {description && (
          <p className="mx-auto max-w-2xl text-xl text-muted-foreground">
            {description}
          </p>
        )}
      </div>
    </section>
  );
}
