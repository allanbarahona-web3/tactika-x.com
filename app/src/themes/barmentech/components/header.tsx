'use client';

import { barmentechConfig } from '../theme.config';

export function Header() {
  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-white"
            style={{ backgroundColor: barmentechConfig.colors.primary }}>
            B
          </div>
          <span className="font-bold text-lg">Barmentech</span>
        </div>
        
        <nav className="hidden md:flex items-center gap-8">
          <a href="#templates" className="text-sm font-medium text-slate-600 hover:text-slate-900 transition">
            Templates
          </a>
          <a href="#pricing" className="text-sm font-medium text-slate-600 hover:text-slate-900 transition">
            Pricing
          </a>
          <a href="#features" className="text-sm font-medium text-slate-600 hover:text-slate-900 transition">
            Features
          </a>
          <a href="#faq" className="text-sm font-medium text-slate-600 hover:text-slate-900 transition">
            FAQ
          </a>
        </nav>

        <button 
          className="px-6 py-2 rounded-lg font-semibold text-white transition"
          style={{ backgroundColor: barmentechConfig.colors.primary }}
        >
          Start Free
        </button>
      </div>
    </header>
  );
}
