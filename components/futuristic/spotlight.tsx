'use client';

import { useRef } from 'react';
import {
  motion,
  useMotionValue,
  useSpring,
  useMotionTemplate,
  useReducedMotion,
} from 'framer-motion';

/**
 * Cahaya lembut yang mengikut kursor dalam seksyen hero.
 * Letak dalam parent `relative`; elemen ini menampal keseluruhan parent.
 */
export function Spotlight() {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(-600);
  const y = useMotionValue(-600);
  const sx = useSpring(x, { stiffness: 120, damping: 25 });
  const sy = useSpring(y, { stiffness: 120, damping: 25 });
  const reduced = useReducedMotion();

  const background = useMotionTemplate`radial-gradient(480px circle at ${sx}px ${sy}px, hsl(var(--primary) / 0.14), transparent 70%)`;

  if (reduced) return null;

  return (
    <motion.div
      ref={ref}
      aria-hidden
      className="absolute inset-0 -z-[5]"
      style={{ background }}
      onPointerMove={(e) => {
        const rect = ref.current?.getBoundingClientRect();
        if (!rect) return;
        x.set(e.clientX - rect.left);
        y.set(e.clientY - rect.top);
      }}
    />
  );
}
