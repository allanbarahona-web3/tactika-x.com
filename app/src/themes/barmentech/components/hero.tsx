'use client';

import { useLanguage } from '../context/LanguageContext';

export function Hero() {
  const { t } = useLanguage();
  
  return (
    <section className="relative py-32 overflow-hidden bg-gradient-to-br from-blue-600 via-purple-600 to-pink-500">
      {/* Background pattern */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: 'url(\'data:image/svg+xml,<svg width="100" height="100" xmlns="http://www.w3.org/2000/svg"><circle cx="50" cy="50" r="2" fill="rgba(255,255,255,0.1)"/></svg>\')',
        }}
      />

      <div className="max-w-4xl mx-auto px-8 text-center relative z-10">
        {/* Badge */}
        <div className="inline-block mb-8 px-6 py-2.5 rounded-full bg-white/20 backdrop-blur-sm border border-white/30">
          <span className="text-white text-xs font-bold uppercase tracking-widest">
            🚀 NO CREDIT CARD REQUIRED
          </span>
        </div>

        {/* Title */}
        <h1 className="text-[68px] font-extrabold text-white mb-6 leading-[1.1] tracking-tight font-display">
          {t.launch}
        </h1>

        {/* Subtitle */}
        <p className="text-[22px] text-white/95 mb-12 max-w-2xl mx-auto leading-relaxed">
          {t.subtitle}
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-5 justify-center mb-16">
          <a
            href="#pricing"
            className="px-10 py-4.5 text-lg bg-gradient-to-r from-purple-600 to-purple-700 text-white font-bold rounded-lg shadow-xl hover:-translate-y-0.5 hover:shadow-2xl transition-all"
          >
            {t.cta}
          </a>
          <a
            href="#templates"
            className="px-10 py-4.5 text-lg border-2 border-white text-white font-bold rounded-lg hover:bg-white hover:text-blue-600 transition-all"
          >
            {t.browseTemplates}
          </a>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-16 pt-16 border-t border-white/20">
          <div className="text-center">
            <div className="text-5xl font-extrabold text-white mb-1 font-display">{t.stats1}</div>
            <p className="text-white/90 text-sm">{t.stats1Desc}</p>
          </div>
          <div className="text-center">
            <div className="text-5xl font-extrabold text-white mb-1 font-display">{t.stats2}</div>
            <p className="text-white/90 text-sm">{t.stats2Desc}</p>
          </div>
          <div className="text-center">
            <div className="text-5xl font-extrabold text-white mb-1 font-display">{t.stats3}</div>
            <p className="text-white/90 text-sm">{t.stats3Desc}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
