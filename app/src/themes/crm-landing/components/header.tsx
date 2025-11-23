import Link from 'next/link';
import Image from 'next/image';

interface HeaderProps {
  language: 'es' | 'en';
  onLanguageChange: (lang: 'es' | 'en') => void;
  onContactClick: () => void;
}

export function Header({ language, onLanguageChange, onContactClick }: HeaderProps) {
  return (
    <header className="fixed w-full top-0 z-60 bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800 backdrop-blur-md border-b border-slate-600 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition">
            <div className="relative w-10 h-10">
              <Image 
                src="/themes/barmentech/logo_barmentech.png" 
                alt="Barmentech" 
                width={40}
                height={40}
                className="object-contain"
              />
            </div>
            <div>
              <span className="text-sm font-bold text-white">Barmentech</span>
              <span className="text-xs text-slate-300 block">CRM Omnicanal</span>
            </div>
          </Link>

          <div className="flex items-center gap-3">
            {/* Language Switcher */}
            <div className="flex items-center gap-2 bg-slate-700/50 rounded-lg p-1 border border-slate-600">
              <button
                onClick={() => onLanguageChange('es')}
                className={`px-3 py-1 rounded text-xs font-medium transition ${
                  language === 'es'
                    ? 'bg-slate-600 text-white shadow-md'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                ES
              </button>
              <button
                onClick={() => onLanguageChange('en')}
                className={`px-3 py-1 rounded text-xs font-medium transition ${
                  language === 'en'
                    ? 'bg-slate-600 text-white shadow-md'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                EN
              </button>
            </div>

            {/* Agenda Demo Button - Animated */}
            <a
              href="https://calendly.com/barmentech/consulta-exploratoria-b2b"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:inline-flex items-center gap-2 px-5 py-2 text-sm font-bold text-white bg-gradient-to-r from-orange-500 to-pink-600 hover:from-orange-600 hover:to-pink-700 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 animate-pulse hover:animate-none hover:scale-105 border border-orange-400/30"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              {language === 'es' ? 'Agenda Demostración' : 'Book Demo'}
            </a>

            {/* Contact Button */}
            <button
              onClick={onContactClick}
              className="hidden sm:inline-flex px-4 py-2 text-sm font-medium text-slate-200 hover:text-white hover:bg-slate-700/70 rounded-lg transition border border-slate-600"
            >
              {language === 'es' ? 'Contáctanos' : 'Contact Us'}
            </button>

            {/* Sign In Button */}
            <Link
              href="/admin/login"
              className="hidden lg:inline-flex px-4 py-2 text-sm font-medium text-slate-200 hover:text-white hover:bg-slate-700/70 rounded-lg transition border border-slate-600"
            >
              {language === 'es' ? 'Iniciar Sesión' : 'Sign In'}
            </Link>

            {/* CTA Button */}
            <Link
              href="/crm/signup"
              className="inline-flex px-4 sm:px-6 py-2 text-sm font-bold text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-lg shadow-lg hover:shadow-xl transition"
            >
              {language === 'es' ? 'Comenzar Gratis' : 'Get Started Free'}
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
