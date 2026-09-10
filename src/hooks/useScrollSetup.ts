import { useEffect, useRef, useState } from 'react';

export function useIsMobile(breakpoint = 768): boolean {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < breakpoint);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, [breakpoint]);

  return isMobile;
}

export function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  return reduced;
}

type LenisInstance = {
  destroy: () => void;
  on: (event: string, fn: () => void) => void;
  off: (event: string, fn: () => void) => void;
  scrollTo: (target: string | number | HTMLElement, opts?: Record<string, unknown>) => void;
  raf: (time: number) => void;
};

export function useLenis(enabled: boolean) {
  const lenisRef = useRef<LenisInstance | null>(null);

  useEffect(() => {
    if (!enabled) return;

    let rafId = 0;
    let lenis: LenisInstance | null = null;

    (async () => {
      const Lenis = (await import('lenis')).default;
      lenis = new Lenis({
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        touchMultiplier: 1.5,
      }) as unknown as LenisInstance;

      lenisRef.current = lenis;

      const raf = (time: number) => {
        lenis?.raf(time);
        rafId = requestAnimationFrame(raf);
      };
      rafId = requestAnimationFrame(raf);

      lenis.on('scroll', () => {
        window.dispatchEvent(new Event('lenis-scroll'));
      });
    })();

    return () => {
      cancelAnimationFrame(rafId);
      lenis?.destroy();
      lenisRef.current = null;
    };
  }, [enabled]);

  return lenisRef;
}

export function scrollToSection(id: string) {
  const el = document.getElementById(id);
  if (!el) return;

  const event = new CustomEvent('infonet-scroll-to', { detail: { id } });
  window.dispatchEvent(event);

  el.scrollIntoView({ behavior: 'smooth', block: 'start' });
}
