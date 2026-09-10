import { ArrowUp } from 'lucide-react';
import { company, navLinks } from '@/data/content';
import { scrollToSection } from '@/hooks/useScrollSetup';

export function Footer() {
  return (
    <footer className="relative bg-base-950 border-t border-white/5 px-6 lg:px-10 py-16 lg:py-20">
      <div className="max-w-[1400px] mx-auto">
        <div className="grid lg:grid-cols-12 gap-12 mb-16">
          {/* Brand */}
          <div className="lg:col-span-5">
            <button
              onClick={() => scrollToSection('hero')}
              className="flex items-center gap-2.5 mb-6 group"
            >
              <div className="w-9 h-9 rounded-lg bg-accent-500 flex items-center justify-center transition-transform group-hover:scale-110">
                <span className="font-display font-bold text-white text-base">I</span>
              </div>
              <span className="font-display font-semibold text-white text-lg tracking-tight">
                INFONET TECHNOLOGIES
              </span>
            </button>
            <p className="text-sm text-gray-500 font-light leading-relaxed max-w-sm">
              {company.tagline}
            </p>
          </div>

          {/* Navigation */}
          <div className="lg:col-span-3">
            <div className="text-xs font-mono text-gray-600 uppercase tracking-ultra mb-4">
              Navigate
            </div>
            <div className="grid grid-cols-2 gap-x-6 gap-y-2">
              {navLinks.map((link) => (
                <button
                  key={link.target}
                  onClick={() => scrollToSection(link.target)}
                  className="text-sm text-gray-400 hover:text-accent-300 transition-colors text-left"
                >
                  {link.label}
                </button>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div className="lg:col-span-4">
            <div className="text-xs font-mono text-gray-600 uppercase tracking-ultra mb-4">
              Get in Touch
            </div>
            <div className="space-y-2">
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
              <div className="text-sm text-gray-400">{company.address}</div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-gray-600">
            © {new Date().getFullYear()} {company.name}. All rights reserved.
          </div>
          <button
            onClick={() => scrollToSection('hero')}
            className="group flex items-center gap-2 text-xs font-mono text-gray-500 hover:text-accent-300 transition-colors"
          >
            Back to top
            <ArrowUp className="w-3.5 h-3.5 transition-transform group-hover:-translate-y-0.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}
