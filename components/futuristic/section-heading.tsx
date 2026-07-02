import { cn } from '@/lib/utils';

/**
 * Heading seksyen seragam: eyebrow monospace + tajuk display + garis aksen.
 * `eyebrow` ditulis tanpa "//" — komponen ini yang menambahnya.
 */
export function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'center',
  className,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  align?: 'center' | 'left';
  className?: string;
}) {
  const centered = align === 'center';
  return (
    <div
      className={cn(
        'mb-12',
        centered ? 'text-center' : 'text-left',
        className
      )}
    >
      <p
        className={cn(
          'mb-3 font-mono text-xs font-medium uppercase tracking-[0.25em] text-primary',
          centered ? 'mx-auto' : ''
        )}
      >
        {'// '}
        {eyebrow}
      </p>
      <h2 className="mb-4 text-3xl font-bold md:text-4xl">{title}</h2>
      <div
        className={cn(
          'mb-4 h-px w-16 bg-gradient-to-r from-primary via-glow to-secondary',
          centered ? 'mx-auto' : ''
        )}
      />
      {description && (
        <p
          className={cn(
            'max-w-2xl text-muted-foreground',
            centered ? 'mx-auto' : ''
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}
