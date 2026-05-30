import type { Variants, Transition } from 'framer-motion';

// Easing "rasa B" (ease-out berkelas).
// Jenis tuple eksplisit (BUKAN `as const`) supaya boleh diberi pada `ease` Framer.
export const EASE: [number, number, number, number] = [0.22, 0.61, 0.36, 1];

export const DURATION = { enter: 0.55, page: 0.35, count: 1.2 } as const;
export const DISTANCE = { reveal: 16, page: 10, hero: 32 } as const;
export const STAGGER = 0.1;

// Trigger reveal: sekali sahaja, bila ~20% elemen masuk view
export const VIEWPORT = { once: true, amount: 0.2 } as const;

const enterTransition: Transition = { duration: DURATION.enter, ease: EASE };

// Spring ringan untuk hero (sedikit "overshoot" ekspresif)
const heroSpring: Transition = { type: 'spring', stiffness: 120, damping: 14, mass: 0.9 };

// --- Penuh (gerakan) ---
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: DISTANCE.reveal },
  show: { opacity: 1, y: 0, transition: enterTransition },
};

export const staggerContainer: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: STAGGER } },
};

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: DISTANCE.reveal },
  show: { opacity: 1, y: 0, transition: enterTransition },
};

// Item hero — naik lebih jauh + spring (lebih ekspresif)
export const staggerItemHero: Variants = {
  hidden: { opacity: 0, y: DISTANCE.hero },
  show: { opacity: 1, y: 0, transition: heroSpring },
};

// --- Reduced motion (opacity sahaja, tiada gerakan) ---
export const fadeUpReduced: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: enterTransition },
};

export const staggerItemReduced: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: enterTransition },
};
