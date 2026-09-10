import { useEffect, useRef } from 'react';
import { industries } from '@/data/content';
import { useIsMobile } from '@/hooks/useScrollSetup';

export function Industries() {
  const sectionRef = useRef<HTMLElement>(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    let ctx: gsap.core.Context | null = null;

    (async () => {
      const { gsap, ScrollTrigger } = await import('@/hooks/useGsap');
      if (!sectionRef.current) return;

      ctx = gsap.context(() => {
        if (isMobile) return;

        const track = sectionRef.current?.querySelector('.industries-track') as HTMLElement;
        if (!track) return;

        const panels = gsap.utils.toArray<HTMLElement>('.industry-panel');
        const totalWidth = panels.reduce((sum, panel) => sum + panel.offsetWidth, 0);

        gsap.to(track, {
          x: () => -(totalWidth - window.innerWidth + 80),
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: () => `+=${totalWidth}`,
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true,
          },
        });

        // Reveal text
        panels.forEach((panel) => {
          const name = panel.querySelector('.industry-name');
          const desc = panel.querySelector('.industry-desc');

          gsap.fromTo(
            name,
            { y: 80, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 1,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: panel,
                containerAnimation: ScrollTrigger.getAll().find((st) => st.vars.trigger === sectionRef.current),
                start: 'left 80%',
                toggleActions: 'play none none reverse',
              },
            }
          );

          gsap.fromTo(
            desc,
            { y: 30, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.8,
              delay: 0.2,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: panel,
                containerAnimation: ScrollTrigger.getAll().find((st) => st.vars.trigger === sectionRef.current),
                start: 'left 80%',
                toggleActions: 'play none none reverse',
              },
            }
          );
        });
      }, sectionRef.current);
    })();

    return () => ctx?.revert();
  }, [isMobile]);

  return (
    <section
      id="industries"
      ref={sectionRef}
      className="relative bg-base-900 overflow-hidden"
    >
      <div className="absolute inset-0 grid-bg-fine opacity-15 pointer-events-none" />

      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-10 pt-24 lg:pt-32 px-6 lg:px-10 max-w-[1400px] mx-auto">
        <div className="flex items-center gap-3 mb-6">
          <span className="text-xs font-mono text-accent-400 tracking-ultra uppercase">04</span>
          <div className="h-px w-8 bg-accent-500/40" />
          <span className="text-xs font-mono text-gray-500 tracking-ultra uppercase">Industries</span>
        </div>
        <h2 className="font-display font-semibold text-white text-4xl lg:text-6xl leading-[1.05] tracking-tightest">
          Built for your industry.
        </h2>
      </div>

      {/* Desktop: horizontal scroll */}
      {!isMobile ? (
        <div className="h-screen flex items-center pt-20">
          <div className="industries-track flex items-center gap-8 px-10 pl-[10vw]">
            {industries.map((industry, i) => (
              <div
                key={industry.name}
                className="industry-panel relative shrink-0 w-[60vw] max-w-[700px] h-[55vh] max-h-[500px] rounded-3xl bg-gradient-to-br from-base-800 to-base-850 border border-white/5 overflow-hidden flex flex-col justify-end p-10 lg:p-14"
              >
                <div className="absolute top-0 left-0 right-0 h-1/2 grid-bg opacity-20 mask-fade-b" />

                {/* Giant number */}
                <div className="absolute top-8 right-8 font-display font-bold text-[120px] leading-none text-white/[0.03]">
                  0{i + 1}
                </div>

                <div className="relative">
                  <h3 className="industry-name font-display font-bold text-white text-5xl lg:text-7xl tracking-tightest leading-none mb-4">
                    {industry.name}
                  </h3>
                  <p className="industry-desc text-base lg:text-lg text-gray-400 font-light leading-relaxed max-w-md">
                    {industry.description}
                  </p>
                </div>
              </div>
            ))}

            {/* End cap */}
            <div className="shrink-0 w-[30vw] max-w-[400px] flex items-center justify-center">
              <div className="text-center">
                <div className="font-display font-bold text-white/10 text-3xl tracking-tightest">
                  And more.
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Mobile: vertical stack */
        <div className="pt-32 pb-20 px-6 max-w-[1400px] mx-auto">
          <div className="space-y-6">
            {industries.map((industry, i) => (
              <div
                key={industry.name}
                className="relative rounded-3xl bg-gradient-to-br from-base-800 to-base-850 border border-white/5 overflow-hidden p-8"
              >
                <div className="absolute top-4 right-4 font-display font-bold text-[80px] leading-none text-white/[0.03]">
                  0{i + 1}
                </div>
                <h3 className="font-display font-bold text-white text-3xl tracking-tightest leading-none mb-3">
                  {industry.name}
                </h3>
                <p className="text-sm text-gray-400 font-light leading-relaxed">
                  {industry.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
