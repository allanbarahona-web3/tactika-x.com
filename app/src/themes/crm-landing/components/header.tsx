import Link from 'next/link';

interface HeaderProps {
  language: 'es' | 'en';
  onLanguageChange: (lang: 'es' | 'en') => void;
}

export function Header({ language, onLanguageChange }: HeaderProps) {
  return (
    <header className="fixed w-full top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">BM</span>
            </div>
            <div>
              <span className="text-sm font-semibold text-gray-900">Barmentech</span>
              <span className="text-xs text-gray-500 block">CRM Omnicanal</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => onLanguageChange('es')}
                className={`px-3 py-1 rounded text-xs font-medium transition ${
                  language === 'es'
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-600'
                }`}
              >
                ES
              </button>
              <button
                onClick={() => onLanguageChange('en')}
                className={`px-3 py-1 rounded text-xs font-medium transition ${
                  language === 'en'
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-600'
                }`}
              >
                EN
              </button>
            </div>

            <Link
              href="/admin/login"
              className="hidden sm:inline-flex px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 rounded-lg"
            >
              {language === 'es' ? 'Iniciar Sesión' : 'Sign In'}
            </Link>

            <Link
              href="/crm/signup"
              className="hidden sm:inline-flex px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg"
            >
              {language === 'es' ? 'Comenzar Gratis' : 'Get Started Free'}
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
