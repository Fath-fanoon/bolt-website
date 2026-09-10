import { useEffect, useRef, useState } from 'react';
import { Quote } from 'lucide-react';
import { testimonials } from '@/data/content';
import type { GsapContext } from '@/hooks/useGsap';

export function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    let ctx: GsapContext | null = null;

    (async () => {
      const { gsap, ScrollTrigger } = await import('@/hooks/useGsap');
      if (!sectionRef.current) return;

      ctx = gsap.context(() => {
        // Auto-advance
        const interval = setInterval(() => {
          setActive((prev) => (prev + 1) % testimonials.length);
        }, 6000);

        // Reveal
        gsap.fromTo(
          '.testimonial-card',
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 70%',
              toggleActions: 'play none none none',
            },
          }
        );

        return () => clearInterval(interval);
      }, sectionRef.current);
    })();

    return () => ctx?.revert();
  }, []);

  return (
    <section
      id="testimonials"
      ref={sectionRef}
      className="relative bg-base-950 overflow-hidden py-32 lg:py-48 px-6 lg:px-10"
    >
      <div className="absolute inset-0 grid-bg-fine opacity-15 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-accent-500/5 blur-[120px] pointer-events-none" />

      <div className="max-w-[1200px] mx-auto relative">
        {/* Header */}
        <div className="text-center mb-16 lg:mb-24">
          <div className="flex items-center justify-center gap-3 mb-6">
            <span className="text-xs font-mono text-accent-400 tracking-ultra uppercase">07</span>
            <div className="h-px w-8 bg-accent-500/40" />
            <span className="text-xs font-mono text-gray-500 tracking-ultra uppercase">Clients</span>
          </div>
          <h2 className="font-display font-semibold text-white text-4xl lg:text-6xl leading-[1.05] tracking-tightest">
            Trusted by businesses
            <br />
            <span className="gradient-text">across the region.</span>
          </h2>
        </div>

        {/* Testimonial display */}
        <div className="testimonial-card relative min-h-[320px] lg:min-h-[280px]">
          {testimonials.map((testimonial, i) => (
            <div
              key={i}
              className="absolute inset-0 transition-all duration-700"
              style={{
                opacity: i === active ? 1 : 0,
                transform: i === active ? 'translateY(0)' : 'translateY(20px)',
                pointerEvents: i === active ? 'auto' : 'none',
              }}
            >
              <div className="flex flex-col items-center text-center">
                <Quote className="w-10 h-10 text-accent-500/30 mb-8" strokeWidth={1} />

                <blockquote className="font-display font-medium text-white text-2xl lg:text-3xl leading-[1.4] tracking-tight max-w-4xl mb-10">
                  "{testimonial.quote}"
                </blockquote>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-accent-500/20 border border-accent-500/30 flex items-center justify-center font-display font-bold text-accent-300">
                    {testimonial.author.charAt(0)}
                  </div>
                  <div className="text-left">
                    <div className="font-display font-semibold text-white text-base">
                      {testimonial.author}
                    </div>
                    <div className="text-sm text-gray-500">
                      {testimonial.role} · {testimonial.company}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Dots */}
        <div className="flex items-center justify-center gap-2 mt-12">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`h-1.5 rounded-full transition-all duration-500 ${
                i === active ? 'w-8 bg-accent-500' : 'w-1.5 bg-white/15 hover:bg-white/30'
              }`}
              aria-label={`Testimonial ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
