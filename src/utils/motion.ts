import type { Variants, Transition } from 'framer-motion';

/** Helper to build staggered fade-up variants that satisfy Framer Motion's strict Variants type */
export function fadeUpVariants(stagger = 0.1, duration = 0.5): Variants {
  return {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number = 0) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration,
        delay: i * stagger,
        ease: [0.25, 0.46, 0.45, 0.94],
      } satisfies Transition,
    }),
  };
}

export function fadeLeftVariants(stagger = 0.1, duration = 0.5): Variants {
  return {
    hidden: { opacity: 0, x: 30 },
    visible: (i: number = 0) => ({
      opacity: 1,
      x: 0,
      transition: {
        duration,
        delay: i * stagger,
        ease: [0.25, 0.46, 0.45, 0.94],
      } satisfies Transition,
    }),
  };
}

export function scaleUpVariants(stagger = 0.05, duration = 0.4): Variants {
  return {
    hidden: { opacity: 0, scale: 0.85, y: 20 },
    visible: (i: number = 0) => ({
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration,
        delay: i * stagger,
        ease: [0.25, 0.46, 0.45, 0.94],
      } satisfies Transition,
    }),
  };
}

export const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

export const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] } satisfies Transition,
  },
};
