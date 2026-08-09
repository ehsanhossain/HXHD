"use client";

import { useState } from 'react';
import { Send, CheckCircle2 } from 'lucide-react';
import { Reveal } from '@/components/motion/Reveal';
import { useT } from '@/i18n/LanguageProvider';

export function ProductNewsletter() {
  const [email, setEmail] = useState('');
  const [done, setDone] = useState(false);
  const t = useT();

  return (
    <section className="relative bg-[var(--ink)] text-white overflow-hidden">
      <div className="absolute inset-0 bg-grid-dark opacity-60" aria-hidden />
      <div
        className="absolute top-0 right-0 h-full w-1/3 bg-[var(--brand-red)]/10 hidden md:block"
        style={{ clipPath: 'polygon(40% 0, 100% 0, 100% 100%, 0 100%)' }}
        aria-hidden
      />

      <div className="shell relative py-16 grid lg:grid-cols-2 gap-10 items-center">
        <Reveal>
          <p className="eyebrow mb-5">Stay informed</p>
          <h2 className="text-step-2 mb-3">Product & technical updates</h2>
          <p className="text-white/60 leading-relaxed max-w-lg">
            New grades, datasheet revisions and application notes — sent
            occasionally, never shared.
          </p>
        </Reveal>

        <Reveal direction="left" delay={0.08}>
          {done ? (
            <p className="flex items-center gap-3 text-[var(--brand-teal)] font-bold border border-[var(--brand-teal)]/35 bg-[var(--brand-teal)]/10 px-5 py-4">
              <CheckCircle2 className="w-5 h-5 shrink-0" />
              {t('news.thanks', { email })}
            </p>
          ) : (
            <form
              className="flex flex-col sm:flex-row gap-3"
              onSubmit={(e) => {
                e.preventDefault();
                if (email.trim()) setDone(true);
              }}
            >
              <label htmlFor="product-newsletter" className="sr-only">
                {t('news.emailLabel')}
              </label>
              <input
                id="product-newsletter"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@company.com"
                className="flex-1 h-12 px-5 bg-white/5 border border-white/20 text-white placeholder:text-white/35 focus:border-[var(--brand-teal)] focus:outline-none transition-colors"
              />
              <button type="submit" className="btn btn-primary cut-br group shrink-0">
                {t('cta.subscribe')}
                <Send className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5" />
              </button>
            </form>
          )}
        </Reveal>
      </div>
    </section>
  );
}
