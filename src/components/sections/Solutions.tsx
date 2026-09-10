import { useEffect, useRef, useState } from 'react';
import {
  LayoutGrid, Boxes, Code2, Globe, Smartphone, Server, Network,
  ShieldCheck, Cctv, CreditCard, Workflow, Calculator, Headset,
  type LucideIcon,
} from 'lucide-react';
import { solutions } from '@/data/content';
import { useIsMobile, usePrefersReducedMotion } from '@/hooks/useScrollSetup';
import { gsap, ScrollTrigger } from '@/hooks/useGsap';
import type { GsapContext } from '@/hooks/useGsap';

const iconMap: Record<string, LucideIcon> = {
  LayoutGrid, Boxes, Code2, Globe, Smartphone, Server, Network,
  ShieldCheck, Cctv, CreditCard, Workflow, Calculator, Headset,
};

export function Solutions() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const isMobile = useIsMobile();
  const prefersReduced = usePrefersReducedMotion();

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx: GsapContext = gsap.context(() => {
        if (isMobile) return;

        const items = gsap.utils.toArray<HTMLElement>('.solution-item');
        const total = items.length;

        // Pin the visual panel
        gsap.to('.solution-pin', {
          scrollTrigger: {
            trigger: '.solutions-track',
            start: 'top top',
            end: () => `+=${total * 60}vh`,
            pin: '.solution-pin',
            pinSpacing: false,
          },
        });

        // Track active index based on scroll
        items.forEach((item, i) => {
          ScrollTrigger.create({
            trigger: item,
            start: 'top 60%',
            end: 'bottom 40%',
            onEnter: () => setActiveIndex(i),
            onEnterBack: () => setActiveIndex(i),
          });

          // Reveal each item
          gsap.fromTo(
            item,
            { opacity: 0.15, y: 60 },
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: item,
                start: 'top 75%',
                end: 'top 35%',
                scrub: 1,
              },
            }
          );
        });

        // Update visual based on active
        ScrollTrigger.create({
          trigger: '.solutions-track',
          start: 'top top',
          end: () => `+=${total * 60}vh`,
          onUpdate: (self) => {
            const idx = Math.min(Math.floor(self.progress * total), total - 1);
            setActiveIndex(idx);
          },
        });
    }, sectionRef.current);

    return () => ctx.revert();
  }, [isMobile]);

  const active = solutions[activeIndex];
  const ActiveIcon = iconMap[active.icon] || LayoutGrid;

  return (
    <section
      id="solutions"
      ref={sectionRef}
      className="relative bg-base-900 overflow-hidden"
    >
      <div className="absolute inset-0 grid-bg-fine opacity-20 pointer-events-none" />

      {/* Section header */}
      <div className="py-24 lg:py-32 px-6 lg:px-10 max-w-[1400px] mx-auto">
        <div className="flex items-center gap-3 mb-6">
          <span className="text-xs font-mono text-accent-400 tracking-ultra uppercase">02</span>
          <div className="h-px w-8 bg-accent-500/40" />
          <span className="text-xs font-mono text-gray-500 tracking-ultra uppercase">Solutions</span>
        </div>
        <h2 className="font-display font-semibold text-white text-4xl lg:text-6xl leading-[1.05] tracking-tightest max-w-3xl">
          Everything your business needs, in one technology partner.
        </h2>
      </div>

      {/* Scroll sequence */}
      <div className="solutions-track relative">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
            {/* Left: pinned visual */}
            <div className="solution-pin hidden lg:block">
              <div className="sticky top-0 h-screen flex items-center">
                <div className="w-full">
                  <div
                    className="relative aspect-square max-w-md mx-auto rounded-3xl bg-gradient-to-br from-base-800 to-base-850 border border-white/5 overflow-hidden"
                    style={{
                      transition: prefersReduced ? 'none' : 'border-color 0.6s ease',
                    }}
                  >
                    {/* Animated background */}
                    <div className="absolute inset-0 grid-bg opacity-20" />
                    <div
                      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full blur-[80px] transition-all duration-700"
                      style={{ backgroundColor: 'rgba(0, 144, 240, 0.15)' }}
                    />

                    {/* Icon */}
                    <div className="relative h-full flex flex-col items-center justify-center p-12">
                      <div
                        key={active.id}
                        className="w-32 h-32 rounded-2xl bg-accent-500/10 border border-accent-500/20 flex items-center justify-center animate-fade-in"
                      >
                        <ActiveIcon className="w-14 h-14 text-accent-300" strokeWidth={1.2} />
                      </div>

                      <div className="mt-8 text-center">
                        <div className="text-xs font-mono text-accent-400/60 tracking-ultra mb-2">
                          {String(activeIndex + 1).padStart(2, '0')} / {String(solutions.length).padStart(2, '0')}
                        </div>
                        <h3 className="font-display font-semibold text-white text-3xl tracking-tightest">
                          {active.title}
                        </h3>
                      </div>

                      {/* Progress bar */}
                      <div className="absolute bottom-0 left-0 right-0 h-px bg-white/5">
                        <div
                          className="h-full bg-accent-500 transition-all duration-500"
                          style={{ width: `${((activeIndex + 1) / solutions.length) * 100}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: scrolling content */}
            <div className="py-8 lg:py-0 space-y-[50vh] lg:space-y-[60vh]">
              {solutions.map((solution, i) => {
                const Icon = iconMap[solution.icon] || LayoutGrid;
                return (
                  <div
                    key={solution.id}
                    className="solution-item min-h-[40vh] flex flex-col justify-center"
                  >
                    {/* Mobile icon */}
                    <div className="lg:hidden w-16 h-16 rounded-xl bg-accent-500/10 border border-accent-500/20 flex items-center justify-center mb-6">
                      <Icon className="w-8 h-8 text-accent-300" strokeWidth={1.2} />
                    </div>

                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-xs font-mono text-accent-400/60 tracking-ultra">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <div className="h-px w-6 bg-white/10" />
                    </div>

                    <h3 className="font-display font-semibold text-white text-3xl lg:text-4xl tracking-tightest mb-4">
                      {solution.title}
                    </h3>
                    <p className="text-base lg:text-lg text-gray-400 leading-relaxed font-light max-w-lg">
                      {solution.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
