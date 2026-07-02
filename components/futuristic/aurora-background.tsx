import { cn } from '@/lib/utils';

/**
 * Latar aurora — blob gradient hanyut perlahan di belakang kandungan.
 * CSS sahaja (animasi dalam globals.css); letak dalam parent `relative`.
 */
export function AuroraBackground({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn(
        'absolute inset-0 -z-10 overflow-hidden',
        className
      )}
    >
      <div className="aurora-blob left-[-10%] top-[-20%] h-[32rem] w-[32rem] bg-primary/25 dark:bg-primary/20" />
      <div className="aurora-blob right-[-12%] top-[-10%] h-[28rem] w-[28rem] bg-secondary/20 dark:bg-secondary/15" />
      <div className="aurora-blob bottom-[-30%] left-[30%] h-[30rem] w-[30rem] bg-glow/15 dark:bg-glow/10" />
    </div>
  );
}
