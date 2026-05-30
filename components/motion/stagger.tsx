'use client';

import type { ReactNode } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import {
  staggerContainer,
  staggerItem,
  staggerItemHero,
  staggerItemReduced,
  VIEWPORT,
} from './tokens';

export function Stagger({
  children,
  className,
  trigger = 'load',
}: {
  children: ReactNode;
  className?: string;
  trigger?: 'load' | 'scroll';
}) {
  const animateProps =
    trigger === 'scroll'
      ? { whileInView: 'show' as const, viewport: VIEWPORT }
      : { animate: 'show' as const };

  return (
    <motion.div
      className={className}
      variants={staggerContainer}
      initial="hidden"
      {...animateProps}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className,
  expressive = false,
}: {
  children: ReactNode;
  className?: string;
  expressive?: boolean;
}) {
  const reduce = useReducedMotion();
  const variants = reduce
    ? staggerItemReduced
    : expressive
      ? staggerItemHero
      : staggerItem;
  return (
    <motion.div className={className} variants={variants}>
      {children}
    </motion.div>
  );
}
