import * as React from 'react';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

/**
 * Kad kaca — varian Card dengan blur latar, border separa telus
 * dan glow lembut ketika hover (melalui .hover-lift).
 */
const GlassCard = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <Card
    ref={ref}
    className={cn(
      'border-border/70 bg-card/70 shadow-sm backdrop-blur-md hover-lift',
      'dark:border-border/60 dark:bg-card/60',
      className
    )}
    {...props}
  />
));
GlassCard.displayName = 'GlassCard';

export { GlassCard };
