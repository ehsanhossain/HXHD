"use client";

import { motion, useReducedMotion, type Variants } from 'motion/react';
import type { ReactNode } from 'react';

/**
 * Shared motion vocabulary. Every entrance on the site uses these tokens so
 * the whole page moves with one rhythm: short, ease-out, transform+opacity
 * only (never width/height/top/left), and fully disabled under
 * prefers-reduced-motion.
 */
const EASE = [0.16, 1, 0.3, 1] as const;
const DURATION = 0.55;

type Direction = 'up' | 'down' | 'left' | 'right' | 'none';

const OFFSET: Record<Direction, { x: number; y: number }> = {
  up: { x: 0, y: 24 },
  down: { x: 0, y: -24 },
  left: { x: 28, y: 0 },
  right: { x: -28, y: 0 },
  none: { x: 0, y: 0 },
};

interface RevealProps {
  children: ReactNode;
  /** Entrance direction. Defaults to rising from below. */
  direction?: Direction;
  /** Seconds to wait before animating. */
  delay?: number;
  className?: string;
  /** Render as a different element (e.g. "li", "section"). */
  as?: 'div' | 'section' | 'li' | 'span' | 'article';
}

export function Reveal({
  children,
  direction = 'up',
  delay = 0,
  className,
  as = 'div',
}: RevealProps) {
  const reduced = useReducedMotion();
  const offset = reduced ? OFFSET.none : OFFSET[direction];
  const MotionTag = motion[as];

  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, x: offset.x, y: offset.y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: reduced ? 0 : DURATION, delay: reduced ? 0 : delay, ease: EASE }}
    >
      {children}
    </MotionTag>
  );
}

/**
 * Wraps a list/grid so children enter in sequence.
 * Pair with <StaggerItem> for each child.
 */
export function Stagger({
  children,
  className,
  /** Gap between each child's entrance, in seconds (40ms default). */
  step = 0.04,
  delay = 0,
  as = 'div',
}: {
  children: ReactNode;
  className?: string;
  step?: number;
  delay?: number;
  as?: 'div' | 'ul' | 'section';
}) {
  const reduced = useReducedMotion();
  const MotionTag = motion[as];

  const variants: Variants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: reduced ? 0 : step,
        delayChildren: reduced ? 0 : delay,
      },
    },
  };

  return (
    <MotionTag
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.15 }}
    >
      {children}
    </MotionTag>
  );
}

export function StaggerItem({
  children,
  className,
  as = 'div',
}: {
  children: ReactNode;
  className?: string;
  as?: 'div' | 'li' | 'article';
}) {
  const reduced = useReducedMotion();
  const MotionTag = motion[as];

  const variants: Variants = {
    hidden: { opacity: 0, y: reduced ? 0 : 22 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: reduced ? 0 : DURATION, ease: EASE },
    },
  };

  return (
    <MotionTag className={className} variants={variants}>
      {children}
    </MotionTag>
  );
}

/** Thin rule that draws itself in — used as a section divider. */
export function DrawLine({ className = '' }: { className?: string }) {
  const reduced = useReducedMotion();

  return (
    <motion.div
      className={`h-px w-full origin-left bg-[var(--line)] ${className}`}
      initial={{ scaleX: reduced ? 1 : 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true }}
      transition={{ duration: reduced ? 0 : 0.9, ease: EASE }}
    />
  );
}
