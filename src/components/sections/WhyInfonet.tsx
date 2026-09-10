import { useEffect, useRef, useState } from 'react';
import { processSteps } from '@/data/content';
import { useIsMobile } from '@/hooks/useScrollSetup';
import { gsap, ScrollTrigger } from '@/hooks/useGsap';
import type { GsapContext } from '@/hooks/useGsap';

export function WhyInfonet() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeStep, setActiveStep] = useState(0);
  const isMobile = useIsMobile();

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx: GsapContext = gsap.context(() => {
        const steps = gsap.utils.toArray<HTMLElement>('.process-step');

        steps.forEach((step, i) => {
          ScrollTrigger.create({
            trigger: step,
            start: 'top 60%',
            end: 'bottom 40%',
            onEnter: () => setActiveStep(i),
            onEnterBack: () => setActiveStep(i),
          });

          // Reveal animation
          gsap.fromTo(
            step.querySelector('.step-number'),
            { opacity: 0, scale: 0.8 },
            {
              opacity: 1,
              scale: 1,
              duration: 0.8,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: step,
                start: 'top 70%',
                toggleActions: 'play none none none',
              },
            }
          );

          gsap.fromTo(
            step.querySelector('.step-content'),
            { y: 40, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.8,
              delay: 0.15,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: step,
                start: 'top 70%',
                toggleActions: 'play none none none',
              },
            }
          );
        });

        // Progress line
        if (!isMobile) {
          gsap.fromTo(
            '.process-line-fill',
            { scaleY: 0 },
            {
              scaleY: 1,
              ease: 'none',
              scrollTrigger: {
                trigger: '.process-steps-container',
                start: 'top 50%',
                end: 'bottom 70%',
                scrub: 1,
              },
            }
          );
        }
    }, sectionRef.current);

    return () => ctx.revert();
  }, [isMobile]);

  return (
    <section
      id="why"
      ref={sectionRef}
      className="relative bg-base-900 overflow-hidden py-32 lg:py-48 px-6 lg:px-10"
    >
      <div className="absolute inset-0 grid-bg-fine opacity-15 pointer-events-none" />

      <div className="max-w-[1400px] mx-auto relative">
        {/* Header */}
        <div className="mb-20 lg:mb-32">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-xs font-mono text-accent-400 tracking-ultra uppercase">06</span>
            <div className="h-px w-8 bg-accent-500/40" />
            <span className="text-xs font-mono text-gray-500 tracking-ultra uppercase">Why Infonet</span>
          </div>
          <h2 className="font-display font-semibold text-white text-4xl lg:text-6xl leading-[1.05] tracking-tightest max-w-3xl">
            How we work. From first conversation to long-term support.
          </h2>
        </div>

        {/* Process steps */}
        <div className="process-steps-container relative">
          {/* Vertical line */}
          <div className="absolute left-8 lg:left-1/2 top-0 bottom-0 w-px bg-white/5 -translate-x-1/2 hidden lg:block">
            <div className="process-line-fill absolute top-0 left-0 w-full h-full bg-gradient-to-b from-accent-500 to-accent-400/30 origin-top" style={{ transform: 'scaleY(0)' }} />
          </div>

          <div className="space-y-20 lg:space-y-32">
            {processSteps.map((step, i) => {
              const isLeft = i % 2 === 0;
              return (
                <div
                  key={step.number}
                  className={`process-step relative flex items-center gap-8 lg:gap-0 ${
                    isLeft ? 'lg:flex-row' : 'lg:flex-row-reverse'
                  }`}
                >
                  {/* Number marker */}
                  <div className={`step-number shrink-0 relative z-10 lg:absolute lg:left-1/2 lg:-translate-x-1/2 ${
                    activeStep === i ? 'scale-100' : ''
                  }`}>
                    <div
                      className={`w-16 h-16 lg:w-20 lg:h-20 rounded-2xl flex items-center justify-center font-display font-bold text-2xl lg:text-3xl transition-all duration-500 ${
                        activeStep === i
                          ? 'bg-accent-500 text-white shadow-lg shadow-accent-500/30'
                          : 'bg-base-800 text-gray-500 border border-white/5'
                      }`}
                    >
                      {step.number}
                    </div>
                  </div>

                  {/* Content */}
                  <div className={`step-content flex-1 lg:w-[calc(50%-4rem)] lg:flex-none ${isLeft ? 'lg:pr-16 lg:text-right' : 'lg:pl-16'}`}>
                    <h3 className="font-display font-semibold text-white text-3xl lg:text-4xl tracking-tightest mb-3">
                      {step.title}
                    </h3>
                    <p className="text-base lg:text-lg text-gray-400 font-light leading-relaxed">
                      {step.description}
                    </p>
                  </div>

                  {/* Spacer for other side */}
                  <div className="hidden lg:block w-[calc(50%-4rem)]" />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
