import { Variants } from 'framer-motion';

/**
 * Ultra-smooth physics easing curve [0.22, 1, 0.36, 1] for luxurious deceleration.
 */
export const CUBIC_EASE = [0.22, 1, 0.36, 1] as const;
export const PREMIUM_EASE = CUBIC_EASE;

/**
 * Default viewport configuration for scroll triggers:
 * once: false (re-triggers every time user scrolls to component), amount: 0.2
 */
export const defaultViewport = {
  once: false,
  amount: 0.2,
};

/**
 * Stagger container variant for general content sequences (staggerChildren: 0.2s)
 */
export const staggerContainer = (staggerChildren = 0.2, delayChildren = 0): Variants => ({
  hidden: {},
  visible: {
    transition: {
      staggerChildren,
      delayChildren,
    },
  },
});

export const staggerGrid = staggerContainer;

/**
 * Section Titles / Subheaders: Fade & Slide DOWN from top (y: -40px to 0)
 * Duration: 1.1s - 1.3s for slow, high-end visibility
 */
export const fadeInDown: Variants = {
  hidden: {
    opacity: 0,
    y: -40,
  },
  visible: (custom?: { duration?: number; delay?: number }) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: custom?.duration ?? 1.2,
      delay: custom?.delay ?? 0,
      ease: CUBIC_EASE,
    },
  }),
};
export const fadeDown = fadeInDown;

/**
 * Left Column / Feature Cards / Badges: Slide IN from left (x: -60px to 0)
 * Duration: 1.2s
 */
export const slideInLeft: Variants = {
  hidden: {
    opacity: 0,
    x: -60,
  },
  visible: (custom?: { duration?: number; delay?: number }) => ({
    opacity: 1,
    x: 0,
    transition: {
      duration: custom?.duration ?? 1.2,
      delay: custom?.delay ?? 0,
      ease: CUBIC_EASE,
    },
  }),
};
export const fadeLeft = slideInLeft;

/**
 * Right Column / CTA Buttons / Visuals: Slide IN from right (x: 60px to 0)
 * Duration: 1.2s
 */
export const slideInRight: Variants = {
  hidden: {
    opacity: 0,
    x: 60,
  },
  visible: (custom?: { duration?: number; delay?: number }) => ({
    opacity: 1,
    x: 0,
    transition: {
      duration: custom?.duration ?? 1.2,
      delay: custom?.delay ?? 0,
      ease: CUBIC_EASE,
    },
  }),
};
export const fadeRight = slideInRight;

/**
 * Main Grid Items / Cards / Body Text: Slide UP from bottom (y: 50px to 0)
 * Duration: 1.2s
 */
export const fadeInUp: Variants = {
  hidden: {
    opacity: 0,
    y: 50,
  },
  visible: (custom?: { duration?: number; delay?: number }) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: custom?.duration ?? 1.2,
      delay: custom?.delay ?? 0,
      ease: CUBIC_EASE,
    },
  }),
};
export const fadeUp = fadeInUp;
export const cardReveal = fadeInUp;

/**
 * Hero Highlights / Icons / Media: Scale & Zoom UP (scale: 0.85 to 1.0)
 * Duration: 1.2s
 */
export const scaleUp: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.85,
  },
  visible: (custom?: { duration?: number; delay?: number }) => ({
    opacity: 1,
    scale: 1,
    transition: {
      duration: custom?.duration ?? 1.2,
      delay: custom?.delay ?? 0,
      ease: CUBIC_EASE,
    },
  }),
};
export const scaleIn = scaleUp;
export const imageReveal = scaleUp;

/**
 * Accessibility fallback for reduced motion
 */
export const reducedMotionVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.4 },
  },
};
