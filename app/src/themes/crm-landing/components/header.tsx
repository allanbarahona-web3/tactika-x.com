import Link from 'next/link';
import Image from 'next/image';

interface HeaderProps {
  language: 'es' | 'en';
  onLanguageChange: (lang: 'es' | 'en') => void;
  onContactClick: () => void;
}

export function Header({ language, onLanguageChange, onContactClick }: HeaderProps) {
  return (
    <header className="fixed w-full top-0 z-60 bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-24">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 hover:opacity-90 transition">
            <div className="relative w-40 h-20">
              <Image 
                src="/themes/barmentech/logo_barmentech.png" 
                alt="Barmentech" 
                width={160}
                height={80}
                className="object-contain w-full h-full"
              />
            </div>
          </Link>

          <div className="flex items-center gap-3">
            {/* Agenda Demo Button - Animated */}
            <a
              href="https://calendly.com/barmentech/consulta-exploratoria-b2b"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:inline-flex items-center gap-2 px-6 py-2.5 text-sm font-bold text-white bg-gradient-to-r from-orange-500 to-pink-600 hover:from-orange-600 hover:to-pink-700 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 relative overflow-hidden group"
            >
              {/* Animated shine effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"></div>
              <svg className="w-4 h-4 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span className="relative z-10">{language === 'es' ? 'Agenda Demostración' : 'Book Demo'}</span>
            </a>

            {/* Contact Button */}
            <button
              onClick={onContactClick}
              className="hidden sm:inline-flex px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition border border-gray-300"
            >
              {language === 'es' ? 'Contáctanos' : 'Contact Us'}
            </button>

            {/* Sign In Button */}
            <Link
              href="/admin/login"
              className="hidden lg:inline-flex px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition border border-gray-300"
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

            {/* Language Switcher */}
            <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-1 border border-gray-200">
              <button
                onClick={() => onLanguageChange('es')}
                className={`px-3 py-1 rounded text-xs font-medium transition ${
                  language === 'es'
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                ES
              </button>
              <button
                onClick={() => onLanguageChange('en')}
                className={`px-3 py-1 rounded text-xs font-medium transition ${
                  language === 'en'
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                EN
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
