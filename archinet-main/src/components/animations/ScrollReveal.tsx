'use client';

import React from 'react';
import { motion, useReducedMotion, Variants, HTMLMotionProps } from 'framer-motion';
import {
  fadeInDown,
  slideInLeft,
  slideInRight,
  fadeInUp,
  scaleUp,
  staggerContainer,
  defaultViewport,
  reducedMotionVariants,
  CUBIC_EASE,
} from './motionVariants';

export type RevealDirection = 'down' | 'left' | 'right' | 'up' | 'scale';

const getVariantByDirection = (direction: RevealDirection): Variants => {
  switch (direction) {
    case 'down':
      return fadeInDown;
    case 'left':
      return slideInLeft;
    case 'right':
      return slideInRight;
    case 'scale':
      return scaleUp;
    case 'up':
    default:
      return fadeInUp;
  }
};

export interface RevealProps extends HTMLMotionProps<'div'> {
  direction?: RevealDirection;
  delay?: number;
  duration?: number;
  once?: boolean;
  amount?: number;
  staggerChildren?: number;
  delayChildren?: number;
  variants?: Variants;
  className?: string;
  children: React.ReactNode;
}

/**
 * Universal Reveal Wrapper Component
 * Triggers entrance animation when scrolled into view (once: false re-triggers on every scroll visit)
 */
export function Reveal({
  direction = 'up',
  delay = 0,
  duration = 1.2,
  once = false,
  amount = 0.2,
  staggerChildren,
  delayChildren,
  variants,
  className = '',
  children,
  ...props
}: RevealProps) {
  const shouldReduceMotion = useReducedMotion();

  const activeVariants = React.useMemo(() => {
    if (shouldReduceMotion) return reducedMotionVariants;
    if (staggerChildren !== undefined || delayChildren !== undefined) {
      return staggerContainer(staggerChildren ?? 0.2, delayChildren ?? 0);
    }
    if (variants) return variants;
    return getVariantByDirection(direction);
  }, [shouldReduceMotion, staggerChildren, delayChildren, variants, direction]);

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount }}
      variants={activeVariants}
      custom={{ delay, duration }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}

/** Section Titles / Subheaders: Fade & Slide DOWN from top (y: -40px to 0) */
export function RevealTitle(props: Omit<RevealProps, 'direction'>) {
  return <Reveal direction="down" {...props} />;
}

/** Left Column / Feature Cards / Badges: Slide IN from left (x: -60px to 0) */
export function RevealLeft(props: Omit<RevealProps, 'direction'>) {
  return <Reveal direction="left" {...props} />;
}

/** Right Column / CTA Buttons / Visuals: Slide IN from right (x: 60px to 0) */
export function RevealRight(props: Omit<RevealProps, 'direction'>) {
  return <Reveal direction="right" {...props} />;
}

/** Main Grid Items / Cards / Body Text: Slide UP from bottom (y: 50px to 0) */
export function RevealUp(props: Omit<RevealProps, 'direction'>) {
  return <Reveal direction="up" {...props} />;
}

/** Hero Highlights / Icons / Media: Scale & Zoom UP (scale: 0.85 to 1.0) */
export function RevealZoom(props: Omit<RevealProps, 'direction'>) {
  return <Reveal direction="scale" {...props} />;
}

export interface StaggerContainerProps extends HTMLMotionProps<'div'> {
  staggerChildren?: number;
  delayChildren?: number;
  once?: boolean;
  amount?: number;
  className?: string;
  children: React.ReactNode;
}

/**
 * Parent Stagger Container for sequence child animations (once: false re-triggers on every scroll visit)
 */
export function StaggerContainer({
  staggerChildren = 0.2,
  delayChildren = 0,
  once = false,
  amount = 0.2,
  className = '',
  children,
  ...props
}: StaggerContainerProps) {
  const shouldReduceMotion = useReducedMotion();
  const containerVariants = shouldReduceMotion
    ? reducedMotionVariants
    : staggerContainer(staggerChildren, delayChildren);

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount }}
      variants={containerVariants}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export interface StaggerItemProps extends HTMLMotionProps<'div'> {
  direction?: RevealDirection;
  delay?: number;
  duration?: number;
  variants?: Variants;
  className?: string;
  children: React.ReactNode;
}

/**
 * Child element inside a StaggerContainer
 */
export function StaggerItem({
  direction = 'up',
  delay = 0,
  duration = 1.2,
  variants,
  className = '',
  children,
  ...props
}: StaggerItemProps) {
  const shouldReduceMotion = useReducedMotion();
  const activeVariants = shouldReduceMotion
    ? reducedMotionVariants
    : variants ?? getVariantByDirection(direction);

  return (
    <motion.div
      variants={activeVariants}
      custom={{ delay, duration }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}

// Backward compatibility exports for existing codebase
export const ScrollReveal = Reveal;
export const RevealItem = StaggerItem;
export const RevealGroup = StaggerContainer;
