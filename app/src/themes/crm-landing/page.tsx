'use client';

import { useState } from 'react';
import Link from 'next/link';
import { BarChart3, CheckCircle2, ArrowRight } from 'lucide-react';
import { Header } from './components/header';
import { Features } from './components/features';
import { Channels } from './components/channels';
import { Pricing } from './components/pricing';
import { Footer } from './components/footer';

export function CRMLandingPage() {
  const [language, setLanguage] = useState<'es' | 'en'>('es');

  const heroTranslations = {
    es: {
      title: 'Gestiona Todas Tus Conversaciones en Un Lugar',
      subtitle: 'CRM Omnicanal Profesional. WhatsApp, Instagram, Facebook, Telegram, TikTok, Email. Todo integrado.',
      cta_signup: 'Comenzar Gratis',
      cta_login: 'Iniciar Sesión',
      badge: 'Certificado Meta Business Partner',
      cta_ready: '¿Listo para Empezar?',
      cta_join: 'Únete a miles de negocios que ya usan Barmentech CRM',
    },
    en: {
      title: 'Manage All Your Conversations in One Place',
      subtitle: 'Professional Omnichannel CRM. WhatsApp, Instagram, Facebook, Telegram, TikTok, Email. All integrated.',
      cta_signup: 'Get Started Free',
      cta_login: 'Sign In',
      badge: 'Certified Meta Business Partner',
      cta_ready: 'Ready to Get Started?',
      cta_join: 'Join thousands of businesses already using Barmentech CRM',
    },
  };

  const hero = heroTranslations[language];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <Header language={language} onLanguageChange={setLanguage} />

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-full mb-6 border border-blue-100">
            <CheckCircle2 size={16} className="text-blue-600" />
            <span className="text-sm font-medium text-blue-600">{hero.badge}</span>
          </div>

          <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight text-gray-900 mb-6 max-w-4xl mx-auto">
            {hero.title}
          </h1>

          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-12">
            {hero.subtitle}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-20">
            <Link
              href="/crm/signup"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:shadow-2xl"
            >
              {hero.cta_signup}
              <ArrowRight size={20} />
            </Link>
            <Link
              href="/admin/login"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-gray-300 text-gray-900 font-semibold rounded-xl hover:bg-gray-50"
            >
              {hero.cta_login}
            </Link>
          </div>

          <div className="w-full max-w-4xl mx-auto aspect-video bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl shadow-2xl flex items-center justify-center">
            <BarChart3 size={80} className="text-gray-400" />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <Features language={language} />

      {/* Channels Section */}
      <Channels language={language} />

      {/* Pricing Section */}
      <Pricing language={language} />

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-12 text-center text-white">
          <h2 className="text-4xl font-bold mb-4">{hero.cta_ready}</h2>
          <p className="text-xl mb-8 text-blue-100">{hero.cta_join}</p>
          <Link
            href="/crm/signup"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-blue-600 font-semibold rounded-xl hover:shadow-2xl"
          >
            {hero.cta_signup}
            <ArrowRight size={20} />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <Footer language={language} />
    </div>
  );
}
