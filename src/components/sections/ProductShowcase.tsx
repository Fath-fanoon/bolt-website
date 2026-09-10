import { useEffect, useRef, useState } from 'react';
import {
  LayoutDashboard, TrendingUp, Users, Package, ShoppingCart,
  DollarSign, Activity, BarChart3, Settings, Bell,
  type LucideIcon,
} from 'lucide-react';
import { products } from '@/data/content';
import { useIsMobile } from '@/hooks/useScrollSetup';
import { gsap, ScrollTrigger } from '@/hooks/useGsap';
import type { GsapContext } from '@/hooks/useGsap';

export function ProductShowcase() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const isMobile = useIsMobile();

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx: GsapContext = gsap.context(() => {
        const track = sectionRef.current?.querySelector('.product-track') as HTMLElement;
        if (!track) return;

        const total = products.length;

        // Pin the showcase
        ScrollTrigger.create({
          trigger: track,
          start: 'top top',
          end: () => `+=${total * 100}vh`,
          pin: '.product-stage',
          pinSpacing: false,
        });

        // Update active product based on scroll progress
        ScrollTrigger.create({
          trigger: track,
          start: 'top top',
          end: () => `+=${total * 100}vh`,
          onUpdate: (self) => {
            const idx = Math.min(Math.floor(self.progress * total), total - 1);
            setActiveIndex(idx);
          },
        });

        // Product name labels - crossfade
        products.forEach((_, i) => {
          const label = sectionRef.current?.querySelector(`[data-product-label="${i}"]`);
          if (!label) return;

          gsap.to(label, {
            opacity: i === 0 ? 1 : 0,
            y: i === 0 ? 0 : 30,
            duration: 0.5,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: track,
              start: () => `${(i / total) * 100}% top`,
              end: () => `${((i + 1) / total) * 100}% top`,
              scrub: 1,
              onEnter: () => setActiveIndex(i),
              onEnterBack: () => setActiveIndex(i),
            },
          });
        });

        // Dashboard content sections
        const dashPanels = gsap.utils.toArray<HTMLElement>('.dash-panel');
        dashPanels.forEach((panel, i) => {
          gsap.set(panel, { opacity: i === 0 ? 1 : 0, display: i === 0 ? 'flex' : 'none' });
        });

        // Animate dashboard panels
        products.forEach((_, i) => {
          ScrollTrigger.create({
            trigger: track,
            start: () => `${(i / products.length) * 100}% top`,
            end: () => `${((i + 1) / products.length) * 100}% top`,
            onEnter: () => switchPanel(i),
            onEnterBack: () => switchPanel(i),
          });
        });

        function switchPanel(idx: number) {
          setActiveIndex(idx);
          dashPanels.forEach((panel, j) => {
            if (j === idx) {
              gsap.to(panel, { opacity: 1, display: 'flex', duration: 0.5, ease: 'power2.out' });
            } else {
              gsap.to(panel, { opacity: 0, duration: 0.3, ease: 'power2.in', onComplete: () => {
                gsap.set(panel, { display: 'none' });
              }});
            }
          });
        }
    }, sectionRef.current);

    return () => ctx.revert();
  }, []);

  const active = products[activeIndex];

  return (
    <section
      id="products"
      ref={sectionRef}
      className="relative bg-base-950 overflow-hidden"
    >
      <div className="absolute inset-0 grid-bg-fine opacity-20 pointer-events-none" />

      {/* Section header */}
      <div className="py-24 lg:py-32 px-6 lg:px-10 max-w-[1400px] mx-auto">
        <div className="flex items-center gap-3 mb-6">
          <span className="text-xs font-mono text-accent-400 tracking-ultra uppercase">03</span>
          <div className="h-px w-8 bg-accent-500/40" />
          <span className="text-xs font-mono text-gray-500 tracking-ultra uppercase">Products</span>
        </div>
        <h2 className="font-display font-semibold text-white text-4xl lg:text-6xl leading-[1.05] tracking-tightest max-w-3xl">
          Software built for the way you work.
        </h2>
        <p className="mt-6 text-lg text-gray-400 font-light max-w-2xl">
          Scroll to explore our product suite. Each solution is designed for a specific industry,
          engineered for performance, and built to scale.
        </p>
      </div>

      {/* Pinned showcase */}
      <div className="product-track relative">
        <div className="product-stage h-screen flex items-center justify-center px-6 lg:px-10">
          <div className="w-full max-w-6xl">
            {/* Product name labels (stacked, crossfaded) */}
            <div className="relative h-16 lg:h-20 mb-6 lg:mb-8">
              {products.map((product, i) => (
                <div
                  key={product.id}
                  data-product-label={i}
                  className="absolute inset-0 flex items-center justify-between"
                  style={{ opacity: i === 0 ? 1 : 0 }}
                >
                  <div>
                    <div
                      className="text-xs font-mono tracking-ultra uppercase mb-1"
                      style={{ color: product.accent }}
                    >
                      {product.category}
                    </div>
                    <h3 className="font-display font-bold text-white text-3xl lg:text-5xl tracking-tightest">
                      {product.name}
                    </h3>
                  </div>
                  <div className="hidden lg:flex items-center gap-2">
                    {products.map((_, j) => (
                      <div
                        key={j}
                        className="h-1 rounded-full transition-all duration-500"
                        style={{
                          width: j === i ? 32 : 8,
                          backgroundColor: j === i ? products[j].accent : 'rgba(255,255,255,0.1)',
                        }}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Dashboard mockup */}
            <div className="relative rounded-2xl bg-base-850 border border-white/8 overflow-hidden shadow-2xl">
              {/* Window chrome */}
              <div className="flex items-center justify-between px-4 py-3 bg-base-800 border-b border-white/5">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-signal-red/60" />
                  <div className="w-3 h-3 rounded-full bg-signal-amber/60" />
                  <div className="w-3 h-3 rounded-full bg-signal-green/60" />
                </div>
                <div className="text-xs font-mono text-gray-500">
                  {active.name.toLowerCase().replace(/\s+/g, '-')}.infonet.app
                </div>
                <div className="flex items-center gap-2">
                  <Settings className="w-4 h-4 text-gray-600" />
                  <Bell className="w-4 h-4 text-gray-600" />
                </div>
              </div>

              {/* Dashboard body */}
              <div className="relative h-[420px] lg:h-[480px] flex">
                {/* Sidebar */}
                <div className="hidden lg:flex flex-col w-56 border-r border-white/5 bg-base-900/50 p-4">
                  <div className="flex items-center gap-2 px-3 py-2 mb-4">
                    <div
                      className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold text-white"
                      style={{ backgroundColor: active.accent }}
                    >
                      {active.name.charAt(0)}
                    </div>
                    <span className="text-sm font-medium text-white">{active.name.split(' ')[1] || active.name}</span>
                  </div>

                  <div className="space-y-1">
                    {[
                      { icon: LayoutDashboard, label: 'Dashboard' },
                      { icon: TrendingUp, label: 'Analytics' },
                      { icon: Package, label: 'Inventory' },
                      { icon: Users, label: 'Customers' },
                      { icon: ShoppingCart, label: 'Orders' },
                      { icon: DollarSign, label: 'Finance' },
                      { icon: BarChart3, label: 'Reports' },
                    ].map((item, j) => (
                      <div
                        key={item.label}
                        className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-[13px] transition-colors ${
                          j === 0 ? 'text-white' : 'text-gray-500 hover:text-gray-300'
                        }`}
                        style={j === 0 ? { backgroundColor: `${active.accent}15` } : {}}
                      >
                        <item.icon className="w-4 h-4" strokeWidth={1.5} />
                        {item.label}
                      </div>
                    ))}
                  </div>

                  <div className="mt-auto px-3 py-2 rounded-lg bg-white/5 flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-accent-500/30 flex items-center justify-center text-xs font-bold text-accent-300">
                      AD
                    </div>
                    <div>
                      <div className="text-xs text-white font-medium">Admin User</div>
                      <div className="text-[10px] text-gray-500">Administrator</div>
                    </div>
                  </div>
                </div>

                {/* Main content area - switches per product */}
                <div className="flex-1 relative p-5 lg:p-6 overflow-hidden">
                  {products.map((product, i) => (
                    <div
                      key={product.id}
                      className="dash-panel absolute inset-5 lg:inset-6 flex-col"
                      style={{ opacity: i === 0 ? 1 : 0, display: i === 0 ? 'flex' : 'none' }}
                    >
                      {/* Top stats */}
                      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4 mb-5">
                        {product.features.slice(0, 4).map((feature, j) => (
                          <div
                            key={feature}
                            className="rounded-xl bg-base-800/80 border border-white/5 p-3 lg:p-4"
                          >
                            <div className="text-[10px] font-mono text-gray-500 uppercase tracking-wider mb-1">
                              {feature}
                            </div>
                            <div className="text-xl lg:text-2xl font-display font-bold text-white">
                              {(j + 1) * 23 + i * 17}{j % 2 === 0 ? '%' : 'k'}
                            </div>
                            <div className="flex items-center gap-1 mt-1">
                              <TrendingUp className="w-3 h-3" style={{ color: product.accent }} />
                              <span className="text-[10px]" style={{ color: product.accent }}>+{(j + 1) * 4}%</span>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Chart + sidebar */}
                      <div className="flex-1 grid lg:grid-cols-3 gap-4 min-h-0">
                        {/* Chart area */}
                        <div className="lg:col-span-2 rounded-xl bg-base-800/80 border border-white/5 p-4 flex flex-col">
                          <div className="flex items-center justify-between mb-3">
                            <span className="text-xs font-medium text-white">Performance Overview</span>
                            <div className="flex gap-1.5">
                              <span className="text-[10px] font-mono text-gray-500">7D</span>
                              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded" style={{ backgroundColor: `${product.accent}20`, color: product.accent }}>30D</span>
                              <span className="text-[10px] font-mono text-gray-500">90D</span>
                            </div>
                          </div>
                          {/* SVG chart */}
                          <div className="flex-1 relative">
                            <svg className="w-full h-full" viewBox="0 0 400 160" preserveAspectRatio="none">
                              <defs>
                                <linearGradient id={`grad-${product.id}`} x1="0" y1="0" x2="0" y2="1">
                                  <stop offset="0%" stopColor={product.accent} stopOpacity="0.3" />
                                  <stop offset="100%" stopColor={product.accent} stopOpacity="0" />
                                </linearGradient>
                              </defs>
                              {[0, 40, 80, 120].map((y) => (
                                <line key={y} x1="0" y1={y} x2="400" y2={y} stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
                              ))}
                              <path
                                d={`M 0 ${100 + i * 5} L 50 ${70 + i * 3} L 100 ${85 + i * 2} L 150 ${50 + i * 4} L 200 ${65 + i * 2} L 250 ${40 + i * 3} L 300 ${55 + i * 2} L 350 ${30 + i * 2} L 400 ${45 + i * 1}`}
                                fill="none"
                                stroke={product.accent}
                                strokeWidth="2"
                              />
                              <path
                                d={`M 0 ${100 + i * 5} L 50 ${70 + i * 3} L 100 ${85 + i * 2} L 150 ${50 + i * 4} L 200 ${65 + i * 2} L 250 ${40 + i * 3} L 300 ${55 + i * 2} L 350 ${30 + i * 2} L 400 ${45 + i * 1} L 400 160 L 0 160 Z`}
                                fill={`url(#grad-${product.id})`}
                              />
                            </svg>
                          </div>
                        </div>

                        {/* Activity feed */}
                        <div className="rounded-xl bg-base-800/80 border border-white/5 p-4 flex flex-col">
                          <div className="flex items-center gap-2 mb-3">
                            <Activity className="w-3.5 h-3.5" style={{ color: product.accent }} />
                            <span className="text-xs font-medium text-white">Live Activity</span>
                          </div>
                          <div className="space-y-3 flex-1 overflow-hidden">
                            {product.features.slice(0, 5).map((feature, j) => (
                              <div key={feature} className="flex items-start gap-2.5">
                                <div
                                  className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0"
                                  style={{ backgroundColor: product.accent }}
                                />
                                <div className="min-w-0">
                                  <div className="text-[11px] text-gray-300 truncate">{feature} updated</div>
                                  <div className="text-[10px] text-gray-600">{j + 1}m ago</div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Product description + features */}
            <div className="relative mt-6 lg:mt-8 min-h-[120px]">
              {products.map((product, i) => (
                <div
                  key={product.id}
                  className="absolute inset-0 transition-opacity duration-500"
                  style={{ opacity: i === activeIndex ? 1 : 0, pointerEvents: i === activeIndex ? 'auto' : 'none' }}
                >
                  <p className="text-sm lg:text-base text-gray-400 font-light leading-relaxed max-w-3xl mb-4">
                    {product.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {product.features.map((feature) => (
                      <span
                        key={feature}
                        className="px-3 py-1.5 rounded-full text-xs font-medium border"
                        style={{
                          borderColor: `${product.accent}30`,
                          color: product.accent,
                          backgroundColor: `${product.accent}08`,
                        }}
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll spacers for pinned section */}
        <div style={{ height: `${products.length * 100}vh` }} />
      </div>
    </section>
  );
}
