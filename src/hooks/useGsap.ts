import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export type GsapContext = ReturnType<typeof gsap.context>;

export function useGsapContext(scope: React.RefObject<HTMLElement | null>) {
  const ctxRef = useRef<GsapContext | null>(null);

  useEffect(() => {
    if (!scope.current) return;
    ctxRef.current = gsap.context(() => {}, scope.current);
    return () => ctxRef.current?.revert();
  }, [scope]);

  return ctxRef;
}

export { gsap, ScrollTrigger };
