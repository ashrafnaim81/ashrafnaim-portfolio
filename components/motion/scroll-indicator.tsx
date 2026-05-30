'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

export function ScrollIndicator({ className }: { className?: string }) {
  const reduce = useReducedMotion();
  return (
    <div className={className} aria-hidden="true">
      <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
        Scroll
      </span>
      <motion.span
        animate={reduce ? undefined : { y: [0, 8, 0] }}
        transition={
          reduce ? undefined : { duration: 1.6, repeat: Infinity, ease: 'easeInOut' }
        }
      >
        <ChevronDown className="h-5 w-5 text-muted-foreground" />
      </motion.span>
    </div>
  );
}
