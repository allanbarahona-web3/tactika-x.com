'use client';

import { barmentechConfig } from '../theme.config';

export function Hero() {
  const config = barmentechConfig.content;
  
  return (
    <section className="relative py-28 overflow-hidden" style={{ backgroundColor: barmentechConfig.colors.primary }}>
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <circle cx="50" cy="50" r="2" fill="white" opacity="0.3" />
        </svg>
      </div>

      <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
        {/* Badge */}
        <div className="inline-block mb-8 px-6 py-2 rounded-full bg-white bg-opacity-20 backdrop-blur-sm border border-white border-opacity-30">
          <span className="text-white text-sm font-bold uppercase tracking-wide">
            🚀 No Credit Card Required
          </span>
        </div>

        {/* Title */}
        <h1 className="text-6xl md:text-7xl font-bold text-white mb-6 leading-tight">
          {config.heroTitle}
        </h1>

        {/* Subtitle */}
        <p className="text-xl text-white text-opacity-95 mb-12 max-w-2xl mx-auto">
          {config.heroSubtitle}
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
          <button className="px-8 py-4 rounded-lg font-semibold text-white transition hover:shadow-lg"
            style={{ backgroundColor: barmentechConfig.colors.secondary }}>
            {config.heroMainCTA}
          </button>
          <button className="px-8 py-4 rounded-lg font-semibold border-2 border-white text-white hover:bg-white hover:text-blue-600 transition">
            {config.heroSecondaryCTA}
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-8 pt-8 border-t border-white border-opacity-20">
          <div className="text-center">
            <div className="text-4xl font-bold text-white mb-1">2,500+</div>
            <p className="text-white text-opacity-90 text-sm">Active Stores</p>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-white mb-1">$50M+</div>
            <p className="text-white text-opacity-90 text-sm">Sales Processed</p>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-white mb-1">99.9%</div>
            <p className="text-white text-opacity-90 text-sm">Uptime</p>
          </div>
        </div>
      </div>
    </section>
  );
}
