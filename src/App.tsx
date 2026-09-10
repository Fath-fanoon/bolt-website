import { useEffect } from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Hero } from '@/components/sections/Hero';
import { CompanyIntro } from '@/components/sections/CompanyIntro';
import { Solutions } from '@/components/sections/Solutions';
import { ProductShowcase } from '@/components/sections/ProductShowcase';
import { Industries } from '@/components/sections/Industries';
import { ITSecurity } from '@/components/sections/ITSecurity';
import { WhyInfonet } from '@/components/sections/WhyInfonet';
import { Testimonials } from '@/components/sections/Testimonials';
import { Contact } from '@/components/sections/Contact';
import { useLenis, usePrefersReducedMotion } from '@/hooks/useScrollSetup';

function App() {
  const prefersReduced = usePrefersReducedMotion();
  useLenis(!prefersReduced);

  useEffect(() => {
    // Refresh ScrollTrigger after all content mounts
    let refreshTimeout: ReturnType<typeof setTimeout>;

    (async () => {
      const { ScrollTrigger } = await import('@/hooks/useGsap');
      refreshTimeout = setTimeout(() => ScrollTrigger.refresh(), 300);
    })();

    return () => clearTimeout(refreshTimeout);
  }, []);

  return (
    <>
      <div className="noise-overlay" />
      <Navbar />
      <main className="relative">
        <Hero />
        <CompanyIntro />
        <Solutions />
        <ProductShowcase />
        <Industries />
        <ITSecurity />
        <WhyInfonet />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

export default App;
