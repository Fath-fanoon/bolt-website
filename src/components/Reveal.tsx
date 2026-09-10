import { useEffect, useState } from 'react';
import { gsap } from '@/hooks/useGsap';
import type { GsapContext } from '@/hooks/useGsap';

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  as?: 'div' | 'span' | 'p' | 'h2' | 'h3';
};

export function Reveal({ children, className = '', delay = 0, y = 40, as = 'div' }: RevealProps) {
  const [ref, setRef] = useState<HTMLElement | null>(null);

  useEffect(() => {
    if (!ref) return;

    const ctx: GsapContext = gsap.context(() => {
      gsap.fromTo(
        ref,
        { y, opacity: 0, filter: 'blur(8px)' },
        {
          y: 0,
          opacity: 1,
          filter: 'blur(0px)',
          duration: 1,
          delay,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: ref,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );
    });

    return () => ctx.revert();
  }, [ref, delay, y]);

  const Tag = as as React.ElementType;

  return (
    <Tag ref={setRef} className={className}>
      {children}
    </Tag>
  );
}
