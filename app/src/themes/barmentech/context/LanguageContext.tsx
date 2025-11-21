'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'es' | 'en';

interface Translations {
  templates: string;
  pricing: string;
  features: string;
  faq: string;
  cta: string;
  [key: string]: string;
}

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations;
}

const translations: Record<Language, Translations> = {
  es: {
    templates: 'Plantillas',
    pricing: 'Precios',
    features: 'Características',
    faq: 'FAQ',
    cta: 'Empezar Gratis',
    launch: 'Lanza Tu Tienda Online en Minutos',
    subtitle: 'Plataforma de comercio electrónico todo en uno para emprendedores y pequeños negocios',
    stats1: '2,500+',
    stats1Desc: 'Tiendas Activas',
    stats2: '$50M+',
    stats2Desc: 'en Ventas Procesadas',
    stats3: '99.9%',
    stats3Desc: 'Tiempo de Actividad',
    browseTemplates: 'Explorar Plantillas',
    templateSubtitle: 'Elige entre nuestras plantillas profesionales diseñadas para convertir visitantes en clientes',
    amazon: 'Estilo Amazon',
    amazonDesc: 'Diseño limpio y minimalista perfecto para cualquier producto',
    minimal: 'Minimalista',
    minimalDesc: 'Elegancia moderna con enfoque en el producto',
    vibrant: 'Vibrante',
    vibrantDesc: 'Colores llamativos que captan la atención',
    digital: 'Digital',
    digitalDesc: 'Optimizado para productos digitales y cursos',
    pricingTitle: 'Precios Simples y Transparentes',
    pricingSubtitle: 'Sin cargos ocultos. Elige el plan que se adapte a tu negocio',
    starter: 'Iniciador',
    starterPrice: '$24.99',
    starterDesc: 'Perfecto para comenzar',
    professional: 'Profesional',
    professionalPrice: '$44.99',
    professionalDesc: 'Para negocios en crecimiento',
    enterprise: 'Empresarial',
    enterprisePrice: '$79.95',
    enterpriseDesc: 'Para operaciones a gran escala',
    featuresTitle: 'Todo lo que Necesitas para Vender Online',
    featuresSubtitle: 'Herramientas poderosas integradas en una plataforma',
    feature1: 'Catálogo Ilimitado',
    feature1Desc: 'Añade productos sin límites a tu tienda',
    feature2: 'Pagos Seguros',
    feature2Desc: 'Integración con las pasarelas más confiables',
    feature3: 'Análisis Avanzado',
    feature3Desc: 'Datos en tiempo real de tu negocio',
    feature4: 'SEO Optimizado',
    feature4Desc: 'Mejora tu posicionamiento en buscadores',
    feature5: 'Soporte 24/7',
    feature5Desc: 'Equipo dedicado siempre disponible',
    feature6: 'Integraciones',
    feature6Desc: 'Conecta con tus herramientas favoritas',
    testimonialsTitle: 'Lo que Dicen Nuestros Clientes',
    testimonial1: 'Aumenté mis ventas 300% en 6 meses. ¡La plataforma es increíble!',
    testimonial1Author: 'María García',
    testimonial2: 'Interfaz intuitiva, soporte excelente. Recomendado 100%.',
    testimonial2Author: 'Carlos López',
    testimonial3: 'Finalmente puedo vender online sin complicaciones técnicas.',
    testimonial3Author: 'Ana Martínez',
    faqTitle: 'Preguntas Frecuentes',
    faq1: '¿Puedo cambiar mi plan después?',
    faq1Ans: 'Sí, puedes cambiar o cancelar tu plan en cualquier momento sin penalizaciones.',
    faq2: '¿Cómo inicio mi tienda?',
    faq2Ans: 'Solo necesitas crear una cuenta, elegir un template y comenzar a añadir productos.',
    faq3: '¿Cobran comisiones por venta?',
    faq3Ans: 'No, pagos fijos mensuales. Tú gestionas todas tus ganancias.',
    faq4: '¿Incluye certificado SSL?',
    faq4Ans: 'Sí, todos nuestros planes incluyen certificado SSL gratuito.',
    faq5: '¿Puedo integrar mi dominio propio?',
    faq5Ans: 'Absolutamente, conecta tu dominio personalizado en segundos.',
    faq6: '¿Hay límites de almacenamiento?',
    faq6Ans: 'No, almacenamiento ilimitado para todos los planes.',
    footerAbout: 'La forma más fácil de crear tu tienda online. Plantillas profesionales, pagos integrados y herramientas poderosas para crecer tu negocio.',
    footerProduct: 'Producto',
    footerProductTemplates: 'Plantillas',
    footerProductPricing: 'Precios',
    footerProductFeatures: 'Características',
    footerProductRoadmap: 'Hoja de Ruta',
    footerSupport: 'Soporte',
    footerSupportHelp: 'Centro de Ayuda',
    footerSupportFAQ: 'Preguntas Frecuentes',
    footerSupportContact: 'Contacto',
    footerSupportStatus: 'Estado',
    footerLegal: 'Legal',
    footerLegalTerms: 'Términos',
    footerLegalPrivacy: 'Privacidad',
    footerLegalCookies: 'Cookies',
    footerLegalLicenses: 'Licencias',
    footerCopyright: 'Todos los derechos reservados',
  },
  en: {
    templates: 'Templates',
    pricing: 'Pricing',
    features: 'Features',
    faq: 'FAQ',
    cta: 'Start Free Trial',
    launch: 'Launch Your Online Store in Minutes',
    subtitle: 'All-in-one ecommerce platform for entrepreneurs and small businesses',
    stats1: '2,500+',
    stats1Desc: 'Active Stores',
    stats2: '$50M+',
    stats2Desc: 'in Sales Processed',
    stats3: '99.9%',
    stats3Desc: 'Uptime',
    browseTemplates: 'Browse Templates',
    templateSubtitle: 'Choose from our professionally designed templates built to convert',
    amazon: 'Amazon Style',
    amazonDesc: 'Clean and minimal design perfect for any product',
    minimal: 'Minimal',
    minimalDesc: 'Modern elegance with product focus',
    vibrant: 'Vibrant',
    vibrantDesc: 'Bold colors that capture attention',
    digital: 'Digital',
    digitalDesc: 'Optimized for digital products and courses',
    pricingTitle: 'Simple & Transparent Pricing',
    pricingSubtitle: 'No hidden fees. Choose the plan that fits your business',
    starter: 'Starter',
    starterPrice: '$24.99',
    starterDesc: 'Perfect for getting started',
    professional: 'Professional',
    professionalPrice: '$44.99',
    professionalDesc: 'For growing businesses',
    enterprise: 'Enterprise',
    enterprisePrice: '$79.95',
    enterpriseDesc: 'For large-scale operations',
    featuresTitle: 'Everything You Need to Sell Online',
    featuresSubtitle: 'Powerful tools integrated in one platform',
    feature1: 'Unlimited Catalog',
    feature1Desc: 'Add unlimited products to your store',
    feature2: 'Secure Payments',
    feature2Desc: 'Integration with the most trusted gateways',
    feature3: 'Advanced Analytics',
    feature3Desc: 'Real-time data about your business',
    feature4: 'SEO Optimized',
    feature4Desc: 'Improve your search engine ranking',
    feature5: '24/7 Support',
    feature5Desc: 'Dedicated team always available',
    feature6: 'Integrations',
    feature6Desc: 'Connect with your favorite tools',
    testimonialsTitle: 'What Our Customers Say',
    testimonial1: 'I increased my sales by 300% in 6 months. The platform is amazing!',
    testimonial1Author: 'Maria Garcia',
    testimonial2: 'Intuitive interface, excellent support. Highly recommended.',
    testimonial2Author: 'Carlos Lopez',
    testimonial3: 'Finally I can sell online without technical complications.',
    testimonial3Author: 'Ana Martinez',
    faqTitle: 'Frequently Asked Questions',
    faq1: 'Can I change my plan later?',
    faq1Ans: 'Yes, you can change or cancel your plan anytime without penalties.',
    faq2: 'How do I start my store?',
    faq2Ans: 'Simply create an account, choose a template, and start adding products.',
    faq3: 'Do you charge commissions on sales?',
    faq3Ans: 'No, fixed monthly payments. You manage all your earnings.',
    faq4: 'Does it include SSL certificate?',
    faq4Ans: 'Yes, all our plans include a free SSL certificate.',
    faq5: 'Can I use my own domain?',
    faq5Ans: 'Absolutely, connect your custom domain in seconds.',
    faq6: 'Are there storage limits?',
    faq6Ans: 'No, unlimited storage for all plans.',
    footerAbout: 'The easiest way to create your online store. Professional templates, integrated payments and powerful tools to grow your business.',
    footerProduct: 'Product',
    footerProductTemplates: 'Templates',
    footerProductPricing: 'Pricing',
    footerProductFeatures: 'Features',
    footerProductRoadmap: 'Roadmap',
    footerSupport: 'Support',
    footerSupportHelp: 'Help Center',
    footerSupportFAQ: 'FAQ',
    footerSupportContact: 'Contact',
    footerSupportStatus: 'Status',
    footerLegal: 'Legal',
    footerLegalTerms: 'Terms',
    footerLegalPrivacy: 'Privacy',
    footerLegalCookies: 'Cookies',
    footerLegalLicenses: 'Licenses',
    footerCopyright: 'All rights reserved',
  },
};

export const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('es');

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t: translations[language] }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
}
