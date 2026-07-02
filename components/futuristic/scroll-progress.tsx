'use client';

import { motion, useScroll, useSpring, useReducedMotion } from 'framer-motion';

/** Bar kemajuan scroll gradient di puncak laman. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 30,
    restDelta: 0.001,
  });
  const reduced = useReducedMotion();
  if (reduced) return null;

  return (
    <motion.div
      aria-hidden
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[60] h-[3px] origin-left bg-gradient-to-r from-primary via-glow to-secondary"
    />
  );
}
