import Link from 'next/link';
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
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* About / Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">BM</span>
              </div>
              <div>
                <span className="text-lg font-bold">Barmentech</span>
                <span className="text-xs text-gray-400 block">CRM Omnicanal</span>
              </div>
            </div>
            <p className="text-gray-400 text-sm mb-6 leading-relaxed">
              {t.tagline}
            </p>
            <div className="flex gap-3">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-gray-800 hover:bg-blue-600 rounded-lg flex items-center justify-center transition">
                <Facebook size={18} />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-gray-800 hover:bg-pink-600 rounded-lg flex items-center justify-center transition">
                <Instagram size={18} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-gray-800 hover:bg-blue-400 rounded-lg flex items-center justify-center transition">
                <Twitter size={18} />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-gray-800 hover:bg-blue-700 rounded-lg flex items-center justify-center transition">
                <Linkedin size={18} />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-gray-800 hover:bg-red-600 rounded-lg flex items-center justify-center transition">
                <Youtube size={18} />
              </a>
            </div>
          </div>

          {/* Product */}
          <div>
            <h4 className="font-bold mb-4 text-white">{t.product}</h4>
            <ul className="space-y-3">
              <li><a href="#features" className="text-gray-400 hover:text-white text-sm transition">{t.features}</a></li>
              <li><a href="#pricing" className="text-gray-400 hover:text-white text-sm transition">{t.pricing}</a></li>
              <li><a href="#channels" className="text-gray-400 hover:text-white text-sm transition">{t.templates}</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white text-sm transition">{t.roadmap}</a></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-bold mb-4 text-white">{t.support}</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-400 hover:text-white text-sm transition">{t.helpCenter}</a></li>
              <li><a href="#faq" className="text-gray-400 hover:text-white text-sm transition">{t.faq}</a></li>
              <li><a href="#contact" className="text-gray-400 hover:text-white text-sm transition">{t.contact}</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white text-sm transition">{t.status}</a></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-bold mb-4 text-white">{t.legal}</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-400 hover:text-white text-sm transition">{t.terms}</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white text-sm transition">{t.privacy}</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white text-sm transition">{t.cookies}</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white text-sm transition">{t.licenses}</a></li>
            </ul>
          </div>
        </div>

        {/* Contact Info */}
        <div className="border-t border-gray-800 pt-8 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
            <div className="flex items-start gap-3">
              <Mail size={20} className="text-blue-500 mt-1" />
              <div>
                <p className="text-gray-400 mb-1">{t.contactUs}</p>
                <a href="mailto:soporte@barmentech.com" className="text-white hover:text-blue-400 transition">soporte@barmentech.com</a>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Phone size={20} className="text-blue-500 mt-1" />
              <div>
                <p className="text-gray-400 mb-1">WhatsApp</p>
                <a href="https://wa.me/50688888888" className="text-white hover:text-blue-400 transition">+506 8888-8888</a>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <MapPin size={20} className="text-blue-500 mt-1" />
              <div>
                <p className="text-gray-400 mb-1">San José, Costa Rica</p>
                <p className="text-white">Barrio Escalante</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            &copy; 2025 Barmentech Web Design. {t.rights}
          </p>
        </div>
      </div>
    </footer>
  );
}
