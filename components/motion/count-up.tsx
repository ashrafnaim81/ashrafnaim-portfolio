'use client';

import { useEffect, useRef, useState } from 'react';
import { animate, useInView, useReducedMotion } from 'framer-motion';
import { DURATION, EASE } from './tokens';

// Pecahkan "19+" / "300k+" / "17" kepada prefix, nombor, suffix.
function parseValue(value: string) {
  const match = value.match(/^(\D*)([\d.,]+)(.*)$/);
  if (!match) return { prefix: '', num: null as number | null, suffix: value };
  const [, prefix, digits, suffix] = match;
  const num = parseFloat(digits.replace(/,/g, ''));
  return { prefix, num: Number.isNaN(num) ? null : num, suffix };
}

export function CountUp({ value, className }: { value: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const reduce = useReducedMotion();
  const { prefix, num, suffix } = parseValue(value);
  const isInteger = num !== null && Number.isInteger(num);

  // Mula dari 0 (jika boleh dibilang & motion dibenarkan), kalau tidak terus tunjuk nilai penuh.
  const [display, setDisplay] = useState(
    num === null || reduce ? value : `${prefix}0${suffix}`,
  );

  useEffect(() => {
    if (num === null || reduce) {
      setDisplay(value);
      return;
    }
    if (!inView) return;

    const controls = animate(0, num, {
      duration: DURATION.count,
      ease: EASE,
      onUpdate(latest) {
        const shown = isInteger ? Math.round(latest).toString() : latest.toFixed(1);
        setDisplay(`${prefix}${shown}${suffix}`);
      },
    });
    return () => controls.stop();
  }, [inView, num, reduce, prefix, suffix, value, isInteger]);

  return (
    <span ref={ref} className={className}>
      {display}
    </span>
  );
}
