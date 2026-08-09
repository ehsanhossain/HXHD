"use client";

import { useState } from 'react';
import { Send, CheckCircle2 } from 'lucide-react';
import { Reveal } from '@/components/motion/Reveal';
import { useT } from '@/i18n/LanguageProvider';

export function NewsletterStrip() {
  const [email, setEmail] = useState('');
  const [done, setDone] = useState(false);
  const t = useT();

  return (
    <section className="bg-[var(--brand-teal)] relative overflow-hidden">
      <div className="absolute inset-0 bg-hatch opacity-20" style={{ filter: 'invert(1)' }} aria-hidden />

      <div className="shell relative py-14 grid lg:grid-cols-2 gap-8 items-center">
        <Reveal>
          <h2 className="text-step-2 text-white mb-2">{t('news.title')}</h2>
          <p className="text-white/80">
            {t('news.copy')}
          </p>
        </Reveal>

        <Reveal direction="left" delay={0.08}>
          {done ? (
            <p className="flex items-center gap-3 text-white font-bold bg-white/15 border border-white/30 px-5 py-4">
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
              <label htmlFor="contact-newsletter" className="sr-only">
                {t('news.emailLabel')}
              </label>
              <input
                id="contact-newsletter"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@company.com"
                className="flex-1 h-12 px-5 bg-white/95 border border-transparent text-[var(--ink)] placeholder:text-[var(--steel-2)] focus:border-[var(--ink)] focus:outline-none transition-colors"
              />
              <button
                type="submit"
                className="btn bg-[var(--ink)] text-white hover:bg-black cut-br group shrink-0"
              >
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
