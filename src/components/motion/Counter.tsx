"use client";

import { useEffect, useRef, useState } from 'react';
import { useInView, useReducedMotion } from 'motion/react';

interface CounterProps {
  to: number;
  suffix?: string;
  prefix?: string;
  /** Milliseconds for the full count. */
  duration?: number;
  className?: string;
}

/**
 * Counts up once when scrolled into view. Under reduced-motion it renders the
 * final value immediately — the number is the information, the motion is not.
 */
export function Counter({
  to,
  suffix = '',
  prefix = '',
  duration = 1400,
  className,
}: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const reduced = useReducedMotion();
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (reduced) {
      setValue(to);
      return;
    }

    let frame = 0;
    const start = performance.now();

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      // ease-out cubic so it decelerates into the final figure
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(to * eased));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, to, duration, reduced]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      <span className="tnum">{value}</span>
      {suffix}
    </span>
  );
}
