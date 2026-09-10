import { useEffect, useState, useCallback } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { navLinks, company } from '@/data/content';
import { scrollToSection } from '@/hooks/useScrollSetup';

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const sections = navLinks.map((l) => document.getElementById(l.target)).filter(Boolean) as HTMLElement[];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: '-40% 0px -50% 0px' }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  const handleNav = useCallback((target: string) => {
    scrollToSection(target);
    setMenuOpen(false);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? 'bg-base-950/80 backdrop-blur-xl border-b border-white/5' : 'bg-transparent'
        }`}
      >
        <nav className="max-w-[1400px] mx-auto px-6 lg:px-10 h-16 lg:h-20 flex items-center justify-between">
          <button
            onClick={() => scrollToSection('hero')}
            className="flex items-center gap-2.5 group"
            aria-label="Infonet Technologies home"
          >
            <div className="w-8 h-8 rounded-lg bg-accent-500 flex items-center justify-center transition-transform group-hover:scale-110">
              <span className="font-display font-bold text-white text-sm">I</span>
            </div>
            <span className="font-display font-semibold text-white text-[15px] tracking-tight hidden sm:block">
              INFONET
            </span>
          </button>

          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <button
                key={link.target}
                onClick={() => handleNav(link.target)}
                className={`px-4 py-2 text-[13px] font-medium rounded-lg transition-colors duration-200 ${
                  activeSection === link.target
                    ? 'text-accent-300'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-4">
            <button
              onClick={() => handleNav('contact')}
              className="group flex items-center gap-1.5 px-5 py-2.5 bg-accent-500 hover:bg-accent-400 text-white text-[13px] font-semibold rounded-lg transition-all duration-200 hover:shadow-lg hover:shadow-accent-500/30"
            >
              Get in Touch
              <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
          </div>

          <button
            onClick={() => setMenuOpen(true)}
            className="lg:hidden w-10 h-10 flex items-center justify-center text-white"
            aria-label="Open menu"
          >
            <Menu className="w-6 h-6" />
          </button>
        </nav>
      </header>

      {/* Mobile menu overlay */}
      <div
        className={`fixed inset-0 z-[60] lg:hidden transition-all duration-500 ${
          menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="absolute inset-0 bg-base-950/95 backdrop-blur-xl" onClick={() => setMenuOpen(false)} />

        <div
          className={`absolute right-0 top-0 bottom-0 w-[85%] max-w-sm bg-base-900 border-l border-white/5 flex flex-col transition-transform duration-500 ${
            menuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="flex items-center justify-between h-16 px-6 border-b border-white/5">
            <span className="font-display font-semibold text-white text-sm">MENU</span>
            <button
              onClick={() => setMenuOpen(false)}
              className="w-10 h-10 flex items-center justify-center text-gray-400 hover:text-white"
              aria-label="Close menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto py-4">
            {navLinks.map((link, i) => (
              <button
                key={link.target}
                onClick={() => handleNav(link.target)}
                className={`w-full text-left px-6 py-4 text-lg font-display font-medium border-b border-white/[0.03] transition-all duration-300 ${
                  menuOpen ? 'translate-x-0 opacity-100' : 'translate-x-8 opacity-0'
                } ${
                  activeSection === link.target ? 'text-accent-300' : 'text-gray-300'
                }`}
                style={{ transitionDelay: menuOpen ? `${i * 60 + 100}ms` : '0ms' }}
              >
                <span className="text-xs font-mono text-accent-500/50 mr-3">0{i + 1}</span>
                {link.label}
              </button>
            ))}
          </div>

          <div className="p-6 border-t border-white/5 space-y-3">
            <a
              href={`mailto:${company.email}`}
              className="block text-sm text-gray-400 hover:text-accent-300 transition-colors"
            >
              {company.email}
            </a>
            <a
              href={`tel:${company.phone.replace(/\s/g, '')}`}
              className="block text-sm text-gray-400 hover:text-accent-300 transition-colors"
            >
              {company.phone}
            </a>
            <button
              onClick={() => handleNav('contact')}
              className="w-full mt-2 py-3.5 bg-accent-500 text-white text-sm font-semibold rounded-lg flex items-center justify-center gap-2"
            >
              Get in Touch
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
