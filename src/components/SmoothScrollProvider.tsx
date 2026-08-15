"use client";

import { ReactNode, useEffect } from "react";
import Lenis from "lenis";

interface SmoothScrollProviderProps {
  children: ReactNode;
}

/**
 * Lenis smooth scroll (https://lenis.dev).
 *
 * Two things this deliberately does beyond `new Lenis()`:
 *
 * 1. It does not run at all under prefers-reduced-motion. Hijacking the
 *    scroll is the single largest piece of motion on the site, and the CSS
 *    media query cannot switch it off — only not constructing it can.
 * 2. `anchors: true` hands in-page hash links back to Lenis. Without it the
 *    skip link and any #fragment jump fight the hijacked scroll position.
 */
export default function SmoothScrollProvider({ children }: SmoothScrollProviderProps) {
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduced.matches) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: 2,
      infinite: false,
      anchors: true,
      autoRaf: true,
    });

    return () => lenis.destroy();
  }, []);

  return <>{children}</>;
}
