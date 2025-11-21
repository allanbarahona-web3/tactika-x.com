'use client';

import { useState } from 'react';
import { barmentechConfig } from '../theme.config';

export function Header() {
  const [language, setLanguage] = useState<'es' | 'en'>('es');

  const translations = {
    es: {
      templates: 'Plantillas',
      pricing: 'Precios',
      features: 'Características',
      faq: 'FAQ',
      cta: 'Empezar Gratis'
    },
    en: {
      templates: 'Templates',
      pricing: 'Pricing',
      features: 'Features',
      faq: 'FAQ',
      cta: 'Start Free Trial'
    }
  };

  const t = translations[language];

  return (
    <>
      {/* Language Switcher */}
      <div className="fixed top-5 right-5 z-[2000] flex gap-1 bg-white border border-slate-200 rounded-full p-1 shadow-md">
        <button
          onClick={() => setLanguage('es')}
          className={`px-5 py-2 rounded-full text-xs font-semibold uppercase tracking-wide transition-all ${
            language === 'es'
              ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
              : 'text-slate-600 hover:bg-slate-50'
          }`}
        >
          🇪🇸 ES
        </button>
        <button
          onClick={() => setLanguage('en')}
          className={`px-5 py-2 rounded-full text-xs font-semibold uppercase tracking-wide transition-all ${
            language === 'en'
              ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
              : 'text-slate-600 hover:bg-slate-50'
          }`}
        >
          🇺🇸 EN
        </button>
      </div>

      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-[1000]">
        <div className="max-w-7xl mx-auto px-8">
          <div className="flex items-center justify-between py-5">
            {/* Logo */}
            <a href="#" className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent font-display tracking-tight">
              Barmentech
            </a>

            {/* Navigation */}
            <nav className="hidden md:flex items-center gap-9">
              <a href="#templates" className="text-slate-600 font-semibold text-sm hover:text-blue-600 transition">
                {t.templates}
              </a>
              <a href="#pricing" className="text-slate-600 font-semibold text-sm hover:text-blue-600 transition">
                {t.pricing}
              </a>
              <a href="#features" className="text-slate-600 font-semibold text-sm hover:text-blue-600 transition">
                {t.features}
              </a>
              <a href="#faq" className="text-slate-600 font-semibold text-sm hover:text-blue-600 transition">
                {t.faq}
              </a>
            </nav>

            {/* CTA Button */}
            <a
              href="#pricing"
              className="px-7 py-3.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold text-sm rounded-lg shadow-lg hover:-translate-y-0.5 hover:shadow-xl transition-all"
            >
              {t.cta}
            </a>
          </div>
        </div>
      </header>
    </>
  );
}
