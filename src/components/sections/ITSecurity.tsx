import { useEffect, useRef, useState } from 'react';
import {
  Network, Server, ShieldCheck, Lock, Cctv, ShieldAlert, Headset,
  type LucideIcon,
} from 'lucide-react';
import { securityNodes } from '@/data/content';
import { useIsMobile } from '@/hooks/useScrollSetup';
import type { GsapContext } from '@/hooks/useGsap';

const iconMap: Record<string, LucideIcon> = {
  Network, Server, ShieldCheck, Lock, Cctv, ShieldAlert, Headset,
};

export function ITSecurity() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeNode, setActiveNode] = useState(0);
  const isMobile = useIsMobile();

  useEffect(() => {
    let ctx: gsap.core.Context | null = null;

    (async () => {
      const { gsap, ScrollTrigger } = await import('@/hooks/useGsap');
      if (!sectionRef.current) return;

      ctx = gsap.context(() => {
        const nodes = gsap.utils.toArray<HTMLElement>('.sec-node');
        const total = nodes.length;

        // Pin the visual
        ScrollTrigger.create({
          trigger: '.sec-track',
          start: 'top top',
          end: () => `+=${total * 50}vh`,
          pin: '.sec-visual',
          pinSpacing: false,
        });

        // Track active node
        ScrollTrigger.create({
          trigger: '.sec-track',
          start: 'top top',
          end: () => `+=${total * 50}vh`,
          onUpdate: (self) => {
            const idx = Math.min(Math.floor(self.progress * total), total - 1);
            setActiveNode(idx);
          },
        });

        nodes.forEach((node, i) => {
          gsap.fromTo(
            node,
            { opacity: 0.2, x: 30 },
            {
              opacity: 1,
              x: 0,
              duration: 0.6,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: node,
                start: 'top 70%',
                end: 'top 40%',
                scrub: 1,
              },
            }
          );

          ScrollTrigger.create({
            trigger: node,
            start: 'top 60%',
            end: 'bottom 40%',
            onEnter: () => setActiveNode(i),
            onEnterBack: () => setActiveNode(i),
          });
        });

        // Animate connection lines
        const lines = gsap.utils.toArray<SVGLineElement>('.conn-line');
        lines.forEach((line) => {
          gsap.fromTo(
            line,
            { strokeDashoffset: 200, opacity: 0 },
            {
              strokeDashoffset: 0,
              opacity: 0.3,
              duration: 1.5,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: '.sec-visual',
                start: 'top 70%',
                toggleActions: 'play none none none',
              },
            }
          );
        });
      }, sectionRef.current);
    })();

    return () => ctx?.revert();
  }, []);

  const active = securityNodes[activeNode];
  const ActiveIcon = iconMap[active.icon] || Network;

  return (
    <section
      id="security"
      ref={sectionRef}
      className="relative bg-base-950 overflow-hidden"
    >
      <div className="absolute inset-0 grid-bg opacity-25 pointer-events-none" />

      {/* Header */}
      <div className="py-24 lg:py-32 px-6 lg:px-10 max-w-[1400px] mx-auto">
        <div className="flex items-center gap-3 mb-6">
          <span className="text-xs font-mono text-accent-400 tracking-ultra uppercase">05</span>
          <div className="h-px w-8 bg-accent-500/40" />
          <span className="text-xs font-mono text-gray-500 tracking-ultra uppercase">IT & Security</span>
        </div>
        <h2 className="font-display font-semibold text-white text-4xl lg:text-6xl leading-[1.05] tracking-tightest max-w-3xl">
          Infrastructure that holds. Security that never sleeps.
        </h2>
      </div>

      <div className="sec-track relative">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
            {/* Left: pinned network visual */}
            <div className="sec-visual hidden lg:block">
              <div className="sticky top-0 h-screen flex items-center">
                <div className="w-full relative aspect-square max-w-lg mx-auto">
                  {/* Network diagram */}
                  <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 400">
                    {/* Connection lines from center to each node */}
                    {securityNodes.map((_, i) => {
                      const angle = (i / securityNodes.length) * Math.PI * 2 - Math.PI / 2;
                      const x = 200 + Math.cos(angle) * 140;
                      const y = 200 + Math.sin(angle) * 140;
                      return (
                        <line
                          key={i}
                          className="conn-line"
                          x1="200"
                          y1="200"
                          x2={x}
                          y2={y}
                          stroke={i === activeNode ? '#0090F0' : '#283040'}
                          strokeWidth={i === activeNode ? 1.5 : 1}
                          strokeDasharray="200"
                          style={{ transition: 'stroke 0.5s ease, stroke-width 0.5s ease' }}
                        />
                      );
                    })}

                    {/* Outer ring */}
                    <circle cx="200" cy="200" r="180" fill="none" stroke="rgba(40,48,64,0.3)" strokeWidth="1" strokeDasharray="4 8" />
                    <circle cx="200" cy="200" r="140" fill="none" stroke="rgba(40,48,64,0.2)" strokeWidth="1" />

                    {/* Node circles */}
                    {securityNodes.map((node, i) => {
                      const angle = (i / securityNodes.length) * Math.PI * 2 - Math.PI / 2;
                      const x = 200 + Math.cos(angle) * 140;
                      const y = 200 + Math.sin(angle) * 140;
                      const isActive = i === activeNode;
                      return (
                        <g key={node.id} style={{ transition: 'all 0.5s ease' }}>
                          {isActive && (
                            <circle cx={x} cy={y} r="28" fill="rgba(0,144,240,0.1)" className="animate-pulse-glow" />
                          )}
                          <circle
                            cx={x}
                            cy={y}
                            r={isActive ? 20 : 14}
                            fill={isActive ? '#0090F0' : '#141821'}
                            stroke={isActive ? '#2EA4F5' : '#283040'}
                            strokeWidth={isActive ? 2 : 1}
                            style={{ transition: 'all 0.5s ease' }}
                          />
                          <text
                            x={x}
                            y={y + 4}
                            textAnchor="middle"
                            fill={isActive ? '#fff' : '#6b7280'}
                            style={{ fontSize: '9px', fontFamily: 'JetBrains Mono', transition: 'fill 0.5s ease' }}
                          >
                            {i + 1}
                          </text>
                        </g>
                      );
                    })}

                    {/* Center hub */}
                    <circle cx="200" cy="200" r="40" fill="rgba(0,144,240,0.05)" stroke="rgba(0,144,240,0.3)" strokeWidth="1" />
                    <circle cx="200" cy="200" r="28" fill="#0A0C10" stroke="#0090F0" strokeWidth="1.5" />
                    <text x="200" y="196" textAnchor="middle" fill="#0090F0" style={{ fontSize: '8px', fontFamily: 'JetBrains Mono', letterSpacing: '1px' }}>INFONET</text>
                    <text x="200" y="208" textAnchor="middle" fill="#5CB8FA" style={{ fontSize: '7px', fontFamily: 'JetBrains Mono' }}>SECURE CORE</text>
                  </svg>

                  {/* Active label */}
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 text-center w-full">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent-500/10 border border-accent-500/20">
                      <ActiveIcon className="w-4 h-4 text-accent-300" strokeWidth={1.5} />
                      <span className="text-sm font-display font-medium text-white">{active.label}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: scrolling nodes */}
            <div className="py-8 lg:py-0 space-y-[35vh] lg:space-y-[45vh]">
              {securityNodes.map((node, i) => {
                const Icon = iconMap[node.icon] || Network;
                return (
                  <div
                    key={node.id}
                    className="sec-node min-h-[30vh] flex flex-col justify-center"
                  >
                    {/* Mobile mini visual */}
                    <div className="lg:hidden flex items-center gap-3 mb-5">
                      <div className="w-12 h-12 rounded-xl bg-accent-500/10 border border-accent-500/20 flex items-center justify-center">
                        <Icon className="w-6 h-6 text-accent-300" strokeWidth={1.2} />
                      </div>
                      <div className="text-xs font-mono text-accent-400/50">
                        {String(i + 1).padStart(2, '0')} / {String(securityNodes.length).padStart(2, '0')}
                      </div>
                    </div>

                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-xs font-mono text-accent-400/60 tracking-ultra">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <div className="h-px w-6 bg-white/10" />
                    </div>

                    <h3 className="font-display font-semibold text-white text-3xl lg:text-4xl tracking-tightest mb-4">
                      {node.label}
                    </h3>
                    <p className="text-base lg:text-lg text-gray-400 leading-relaxed font-light max-w-lg">
                      {node.description}
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
