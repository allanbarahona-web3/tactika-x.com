'use client';

import { useLanguage } from '../context/LanguageContext';

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-slate-900 text-white" style={{ backgroundColor: '#0F172A' }}>
      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Footer Content Grid */}
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* About */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center font-bold bg-gradient-to-r from-blue-600 to-purple-600">
                B
              </div>
              <span className="font-bold text-lg">Barmentech</span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed">
              {t.footerAbout}
            </p>
          </div>

          {/* Product */}
          <div>
            <h3 className="font-bold mb-4">{t.footerProduct}</h3>
            <ul className="space-y-2 text-slate-400 text-sm">
              <li><a href="#templates" className="hover:text-white transition">{t.footerProductTemplates}</a></li>
              <li><a href="#pricing" className="hover:text-white transition">{t.footerProductPricing}</a></li>
              <li><a href="#features" className="hover:text-white transition">{t.footerProductFeatures}</a></li>
              <li><a href="#" className="hover:text-white transition">{t.footerProductRoadmap}</a></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-bold mb-4">{t.footerSupport}</h3>
            <ul className="space-y-2 text-slate-400 text-sm">
              <li><a href="#" className="hover:text-white transition">{t.footerSupportHelp}</a></li>
              <li><a href="#faq" className="hover:text-white transition">{t.footerSupportFAQ}</a></li>
              <li><a href="#" className="hover:text-white transition">{t.footerSupportContact}</a></li>
              <li><a href="#" className="hover:text-white transition">{t.footerSupportStatus}</a></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-bold mb-4">{t.footerLegal}</h3>
            <ul className="space-y-2 text-slate-400 text-sm">
              <li><a href="#" className="hover:text-white transition">{t.footerLegalTerms}</a></li>
              <li><a href="#" className="hover:text-white transition">{t.footerLegalPrivacy}</a></li>
              <li><a href="#" className="hover:text-white transition">{t.footerLegalCookies}</a></li>
              <li><a href="#" className="hover:text-white transition">{t.footerLegalLicenses}</a></li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-slate-700 pt-8">
          <p className="text-center text-slate-400 text-sm">
            © {new Date().getFullYear()} Barmentech. {t.footerCopyright}.
          </p>
        </div>
      </div>
    </footer>
  );
}
