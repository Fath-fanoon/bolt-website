import { useEffect, useRef, useState } from 'react';
import { Mail, Phone, MapPin, Clock, ArrowRight, CheckCircle2 } from 'lucide-react';
import { company } from '@/data/content';
import { gsap } from '@/hooks/useGsap';
import type { GsapContext } from '@/hooks/useGsap';

export function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const e: Record<string, string> = {};
    if (!formState.name.trim()) e.name = 'Please enter your name';
    if (!formState.email.trim()) e.email = 'Please enter your email';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formState.email)) e.email = 'Please enter a valid email';
    if (!formState.message.trim()) e.message = 'Please tell us what you need';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const subject = encodeURIComponent(`Inquiry from ${formState.name}${formState.company ? ` (${formState.company})` : ''}`);
    const body = encodeURIComponent(
      `Name: ${formState.name}\nEmail: ${formState.email}\nCompany: ${formState.company}\n\n${formState.message}`
    );
    window.location.href = `mailto:${company.email}?subject=${subject}&body=${body}`;
    setSubmitted(true);
  };

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx: GsapContext = gsap.context(() => {
        gsap.fromTo(
          '.contact-content',
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
    }, sectionRef.current);

    return () => ctx.revert();
  }, []);

  const contactInfo = [
    { icon: Mail, label: 'Email', value: company.email, href: `mailto:${company.email}` },
    { icon: Phone, label: 'Phone', value: company.phone, href: `tel:${company.phone.replace(/\s/g, '')}` },
    { icon: MapPin, label: 'Location', value: company.address, href: null },
    { icon: Clock, label: 'Hours', value: company.hours, href: null },
  ];

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative bg-base-950 overflow-hidden py-32 lg:py-48 px-6 lg:px-10"
    >
      <div className="absolute inset-0 grid-bg opacity-20 pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-accent-500/10 blur-[150px] pointer-events-none" />

      <div className="max-w-[1200px] mx-auto relative contact-content">
        {/* CTA headline */}
        <div className="text-center mb-20">
          <div className="flex items-center justify-center gap-3 mb-6">
            <span className="text-xs font-mono text-accent-400 tracking-ultra uppercase">08</span>
            <div className="h-px w-8 bg-accent-500/40" />
            <span className="text-xs font-mono text-gray-500 tracking-ultra uppercase">Contact</span>
          </div>
          <h2 className="font-display font-bold text-white text-5xl lg:text-7xl xl:text-8xl leading-[0.95] tracking-tightest mb-6">
            Let's build
            <br />
            <span className="gradient-text">what's next.</span>
          </h2>
          <p className="text-lg text-gray-400 font-light max-w-xl mx-auto">
            Tell us about your project. We'll get back to you within one business day.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-12 lg:gap-16">
          {/* Contact info */}
          <div className="lg:col-span-2 space-y-6">
            {contactInfo.map((info) => (
              <div key={info.label} className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-xl bg-accent-500/10 border border-accent-500/20 flex items-center justify-center shrink-0">
                  <info.icon className="w-5 h-5 text-accent-300" strokeWidth={1.5} />
                </div>
                <div>
                  <div className="text-xs font-mono text-gray-500 uppercase tracking-wider mb-1">
                    {info.label}
                  </div>
                  {info.href ? (
                    <a
                      href={info.href}
                      className="text-base text-white hover:text-accent-300 transition-colors"
                    >
                      {info.value}
                    </a>
                  ) : (
                    <div className="text-base text-white">{info.value}</div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Form */}
          <div className="lg:col-span-3">
            {submitted ? (
              <div className="rounded-2xl bg-base-850 border border-accent-500/20 p-10 lg:p-12 text-center">
                <CheckCircle2 className="w-12 h-12 text-accent-400 mx-auto mb-6" strokeWidth={1.2} />
                <h3 className="font-display font-semibold text-white text-2xl mb-3">Thank you for reaching out</h3>
                <p className="text-gray-400 font-light mb-6">
                  Your email client should have opened with your message. If not, email us directly at{' '}
                  <a href={`mailto:${company.email}`} className="text-accent-300 underline">
                    {company.email}
                  </a>
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setFormState({ name: '', email: '', company: '', message: '' });
                  }}
                  className="text-sm text-accent-400 hover:text-accent-300 transition-colors"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-mono text-gray-500 uppercase tracking-wider mb-2">
                      Name *
                    </label>
                    <input
                      type="text"
                      value={formState.name}
                      onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                      className="w-full px-4 py-3.5 bg-base-850 border border-white/8 rounded-xl text-white text-sm placeholder-gray-600 focus:border-accent-500/50 focus:outline-none transition-colors"
                      placeholder="Your name"
                    />
                    {errors.name && <p className="mt-2 text-xs text-signal-red">{errors.name}</p>}
                  </div>
                  <div>
                    <label className="block text-xs font-mono text-gray-500 uppercase tracking-wider mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      value={formState.email}
                      onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                      className="w-full px-4 py-3.5 bg-base-850 border border-white/8 rounded-xl text-white text-sm placeholder-gray-600 focus:border-accent-500/50 focus:outline-none transition-colors"
                      placeholder="you@company.com"
                    />
                    {errors.email && <p className="mt-2 text-xs text-signal-red">{errors.email}</p>}
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-mono text-gray-500 uppercase tracking-wider mb-2">
                    Company
                  </label>
                  <input
                    type="text"
                    value={formState.company}
                    onChange={(e) => setFormState({ ...formState, company: e.target.value })}
                    className="w-full px-4 py-3.5 bg-base-850 border border-white/8 rounded-xl text-white text-sm placeholder-gray-600 focus:border-accent-500/50 focus:outline-none transition-colors"
                    placeholder="Your company (optional)"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-gray-500 uppercase tracking-wider mb-2">
                    Message *
                  </label>
                  <textarea
                    rows={5}
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    className="w-full px-4 py-3.5 bg-base-850 border border-white/8 rounded-xl text-white text-sm placeholder-gray-600 focus:border-accent-500/50 focus:outline-none transition-colors resize-none"
                    placeholder="Tell us about your project, your challenges, or what you'd like to explore."
                  />
                  {errors.message && <p className="mt-2 text-xs text-signal-red">{errors.message}</p>}
                </div>
                <button
                  type="submit"
                  className="group w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 bg-accent-500 hover:bg-accent-400 text-white font-semibold rounded-xl transition-all duration-300 hover:shadow-xl hover:shadow-accent-500/30 text-sm"
                >
                  Send Message
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
