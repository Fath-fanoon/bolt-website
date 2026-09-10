import { useEffect, useRef } from 'react';
import { stats } from '@/data/content';
import { Reveal } from '@/components/Reveal';
import { gsap } from '@/hooks/useGsap';
import type { GsapContext } from '@/hooks/useGsap';

export function CompanyIntro() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx: GsapContext = gsap.context(() => {
        // Stats counter
        stats.forEach((stat) => {
          const numStr = stat.value.replace(/[^0-9.]/g, '');
          const num = parseFloat(numStr);
          if (isNaN(num)) return;

          const obj = { val: 0 };
          const el = sectionRef.current?.querySelector(`[data-stat="${stat.value}"]`);
          if (!el) return;

          gsap.to(obj, {
            val: num,
            duration: 2,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
            onUpdate: () => {
              const prefix = stat.value.startsWith('99') ? '' : '';
              const suffix = stat.value.replace(/[0-9.]/g, '');
              el.textContent = `${prefix}${num % 1 !== 0 ? obj.val.toFixed(1) : Math.floor(obj.val)}${suffix}`;
            },
          });
        });
    }, sectionRef.current);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="company"
      ref={sectionRef}
      className="relative py-32 lg:py-48 px-6 lg:px-10 bg-base-950 overflow-hidden"
    >
      <div className="absolute inset-0 grid-bg-fine opacity-30 pointer-events-none" />

      <div className="max-w-[1400px] mx-auto relative">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20">
          <div className="lg:col-span-5">
            <Reveal>
              <div className="flex items-center gap-3 mb-6">
                <span className="text-xs font-mono text-accent-400 tracking-ultra uppercase">01</span>
                <div className="h-px w-8 bg-accent-500/40" />
                <span className="text-xs font-mono text-gray-500 tracking-ultra uppercase">About</span>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <h2 className="font-display font-semibold text-white text-4xl lg:text-5xl leading-[1.05] tracking-tightest mb-8">
                We build the technology that runs your business.
              </h2>
            </Reveal>
          </div>

          <div className="lg:col-span-6 lg:col-start-7">
            <Reveal delay={0.2}>
              <p className="text-lg lg:text-xl text-gray-400 leading-relaxed font-light mb-6">
                Infonet Technologies is a full-service technology company delivering enterprise software,
                IT infrastructure, and cybersecurity solutions to businesses across the region.
              </p>
            </Reveal>
            <Reveal delay={0.3}>
              <p className="text-base lg:text-lg text-gray-500 leading-relaxed font-light">
                From ERP systems and custom software development to network design, surveillance, and
                managed IT support, we provide end-to-end technology services that help organizations
                operate smarter, move faster, and stay secure.
              </p>
            </Reveal>
          </div>
        </div>

        <div className="mt-24 lg:mt-32 grid grid-cols-2 lg:grid-cols-4 gap-px bg-white/5 rounded-2xl overflow-hidden border border-white/5">
          {stats.map((stat, i) => (
            <Reveal key={stat.label} delay={i * 0.1}>
              <div className="bg-base-900 p-8 lg:p-10 text-center lg:text-left">
                <div
                  data-stat={stat.value}
                  className="font-display font-bold text-4xl lg:text-5xl text-white tracking-tightest"
                >
                  {stat.value}
                </div>
                <div className="mt-2 text-xs font-mono text-gray-500 tracking-ultra uppercase">
                  {stat.label}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
