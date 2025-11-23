import { Facebook, Instagram, Twitter, Linkedin, Youtube, Mail, Phone, MapPin } from 'lucide-react';

interface FooterProps {
  language: 'es' | 'en';
}

export function Footer({ language }: FooterProps) {
  const translations = {
    es: {
      tagline: 'La forma más fácil de crear tu tienda online. Plantillas profesionales, pagos integrados y herramientas poderosas para crecer tu negocio.',
      product: 'Producto',
      templates: 'Plantillas',
      pricing: 'Precios',
      features: 'Características',
      roadmap: 'Roadmap',
      support: 'Soporte',
      helpCenter: 'Centro de Ayuda',
      faq: 'FAQ',
      contact: 'Contacto',
      status: 'Estado',
      legal: 'Legal',
      terms: 'Términos',
      privacy: 'Privacidad',
      cookies: 'Cookies',
      licenses: 'Licencias',
      rights: 'Todos los derechos reservados.',
      followUs: 'Síguenos',
      contactUs: 'Contáctanos',
    },
    en: {
      tagline: 'The easiest way to create your online store. Professional templates, integrated payments, and powerful tools to grow your business.',
      product: 'Product',
      templates: 'Templates',
      pricing: 'Pricing',
      features: 'Features',
      roadmap: 'Roadmap',
      support: 'Support',
      helpCenter: 'Help Center',
      faq: 'FAQ',
      contact: 'Contact',
      status: 'Status',
      legal: 'Legal',
      terms: 'Terms',
      privacy: 'Privacy',
      cookies: 'Cookies',
      licenses: 'Licenses',
      rights: 'All rights reserved.',
      followUs: 'Follow Us',
      contactUs: 'Contact Us',
    },
  };

  const t = translations[language];

  return (
    <footer className="bg-gray-900 text-white pt-8 sm:pt-12 md:pt-16 pb-6 sm:pb-8">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 md:gap-12 mb-6 sm:mb-8 md:mb-12">
          {/* About / Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-3 sm:mb-4">
              <div className="w-8 sm:w-10 h-8 sm:h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="text-white font-bold text-sm sm:text-lg">BM</span>
              </div>
              <div>
                <span className="text-base sm:text-lg font-bold">Barmentech</span>
                <span className="text-xs text-gray-400 block">CRM Omnicanal</span>
              </div>
            </div>
            <p className="text-gray-400 text-xs sm:text-sm mb-4 sm:mb-6 leading-relaxed">
              {t.tagline}
            </p>
            <div className="flex gap-2 sm:gap-3">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="w-8 sm:w-10 h-8 sm:h-10 bg-gray-800 hover:bg-blue-600 rounded-lg flex items-center justify-center transition flex-shrink-0">
                <Facebook size={16} className="sm:w-[18px] sm:h-[18px]" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="w-8 sm:w-10 h-8 sm:h-10 bg-gray-800 hover:bg-pink-600 rounded-lg flex items-center justify-center transition flex-shrink-0">
                <Instagram size={16} className="sm:w-[18px] sm:h-[18px]" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="w-8 sm:w-10 h-8 sm:h-10 bg-gray-800 hover:bg-blue-400 rounded-lg flex items-center justify-center transition flex-shrink-0">
                <Twitter size={16} className="sm:w-[18px] sm:h-[18px]" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="w-8 sm:w-10 h-8 sm:h-10 bg-gray-800 hover:bg-blue-700 rounded-lg flex items-center justify-center transition flex-shrink-0">
                <Linkedin size={16} className="sm:w-[18px] sm:h-[18px]" />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="w-8 sm:w-10 h-8 sm:h-10 bg-gray-800 hover:bg-red-600 rounded-lg flex items-center justify-center transition flex-shrink-0">
                <Youtube size={16} className="sm:w-[18px] sm:h-[18px]" />
              </a>
            </div>
          </div>

          {/* Product */}
          <div>
            <h4 className="font-bold mb-3 sm:mb-4 text-white text-sm sm:text-base">{t.product}</h4>
            <ul className="space-y-2 sm:space-y-3">
              <li><a href="#features" className="text-gray-400 hover:text-white text-xs sm:text-sm transition">{t.features}</a></li>
              <li><a href="#pricing" className="text-gray-400 hover:text-white text-xs sm:text-sm transition">{t.pricing}</a></li>
              <li><a href="#channels" className="text-gray-400 hover:text-white text-xs sm:text-sm transition">{t.templates}</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white text-xs sm:text-sm transition">{t.roadmap}</a></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-bold mb-3 sm:mb-4 text-white text-sm sm:text-base">{t.support}</h4>
            <ul className="space-y-2 sm:space-y-3">
              <li><a href="#" className="text-gray-400 hover:text-white text-xs sm:text-sm transition">{t.helpCenter}</a></li>
              <li><a href="#faq" className="text-gray-400 hover:text-white text-xs sm:text-sm transition">{t.faq}</a></li>
              <li><a href="#contact" className="text-gray-400 hover:text-white text-xs sm:text-sm transition">{t.contact}</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white text-xs sm:text-sm transition">{t.status}</a></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-bold mb-3 sm:mb-4 text-white text-sm sm:text-base">{t.legal}</h4>
            <ul className="space-y-2 sm:space-y-3">
              <li><a href="#" className="text-gray-400 hover:text-white text-xs sm:text-sm transition">{t.terms}</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white text-xs sm:text-sm transition">{t.privacy}</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white text-xs sm:text-sm transition">{t.cookies}</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white text-xs sm:text-sm transition">{t.licenses}</a></li>
            </ul>
          </div>
        </div>

        {/* Contact Info */}
        <div className="border-t border-gray-800 pt-6 sm:pt-8 mb-6 sm:mb-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 text-xs sm:text-sm">
            <div className="flex items-start gap-2 sm:gap-3">
              <Mail size={18} className="text-blue-500 mt-0.5 flex-shrink-0 sm:w-5 sm:h-5" />
              <div>
                <p className="text-gray-400 mb-1">{t.contactUs}</p>
                <a href="mailto:info@barmentech.com" className="text-white hover:text-blue-400 transition break-all">info@barmentech.com</a>
              </div>
            </div>
            <div className="flex items-start gap-2 sm:gap-3">
              <Phone size={18} className="text-blue-500 mt-0.5 flex-shrink-0 sm:w-5 sm:h-5" />
              <div>
                <p className="text-gray-400 mb-1">Phone</p>
                <a href="tel:+17863918722" className="text-white hover:text-blue-400 transition">+1 (786) 391-8722</a>
              </div>
            </div>
            <div className="flex items-start gap-2 sm:gap-3">
              <MapPin size={18} className="text-blue-500 mt-0.5 flex-shrink-0 sm:w-5 sm:h-5" />
              <div>
                <p className="text-gray-400 mb-1">Location</p>
                <p className="text-white">Sheridan, Wyoming</p>
                <p className="text-slate-400 text-xs">United States</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-6 sm:pt-8 text-center">
          <p className="text-gray-400 text-xs sm:text-sm">
            &copy; 2025 Barmentech Web Design. {t.rights}
          </p>
        </div>
      </div>
    </footer>
  );
}
