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
 * Pembungkus 3D tilt: kad condong mengikut kursor dengan kilauan (glare)
 * yang bergerak. Tiada kesan pada sentuhan/reduced-motion.
 */
export function TiltCard({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const gx = useMotionValue(50);
  const gy = useMotionValue(50);
  const srx = useSpring(rx, { stiffness: 180, damping: 20 });
  const sry = useSpring(ry, { stiffness: 180, damping: 20 });
  const reduced = useReducedMotion();

  const glare = useMotionTemplate`radial-gradient(circle at ${gx}% ${gy}%, hsl(0 0% 100% / 0.22), transparent 55%)`;

  if (reduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{
        rotateX: srx,
        rotateY: sry,
        transformStyle: 'preserve-3d',
        perspective: 900,
      }}
      onPointerMove={(e) => {
        const rect = ref.current?.getBoundingClientRect();
        if (!rect) return;
        const px = (e.clientX - rect.left) / rect.width;
        const py = (e.clientY - rect.top) / rect.height;
        ry.set((px - 0.5) * 14);
        rx.set((0.5 - py) * 14);
        gx.set(px * 100);
        gy.set(py * 100);
      }}
      onPointerLeave={() => {
        rx.set(0);
        ry.set(0);
      }}
    >
      {children}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-2xl"
        style={{ background: glare }}
      />
    </motion.div>
  );
}
