import { cn } from '@/lib/utils';

/**
 * Grid teknikal halus yang pudar ke tepi (mask radial).
 * Statik, CSS sahaja; letak dalam parent `relative`.
 */
export function GridPattern({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn(
        'absolute inset-0 -z-10',
        'bg-[linear-gradient(to_right,hsl(var(--foreground)/0.05)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--foreground)/0.05)_1px,transparent_1px)]',
        'bg-[size:44px_44px]',
        '[mask-image:radial-gradient(ellipse_70%_60%_at_50%_40%,black_35%,transparent_100%)]',
        className
      )}
    />
  );
}
