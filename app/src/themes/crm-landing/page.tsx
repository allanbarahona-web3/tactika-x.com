'use client';

import { useState } from 'react';
import Link from 'next/link';
import { BarChart3, CheckCircle2, ArrowRight, UserPlus, Settings, MessageSquare, Rocket, Star, ChevronDown } from 'lucide-react';
import { Header } from './components/header';
import { Features } from './components/features';
import { Channels } from './components/channels';
import { Pricing } from './components/pricing';
import { Footer } from './components/footer';
import { ContactModal } from './components/contact-modal';

export function CRMLandingPage() {
  const [language, setLanguage] = useState<'es' | 'en'>('es');
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const whatsappNumber = '+17863918722';
  const whatsappLink = `https://wa.me/${whatsappNumber.replace(/[^0-9]/g, '')}`;

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
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Header */}
      <Header language={language} onLanguageChange={setLanguage} onContactClick={() => setIsContactOpen(true)} />

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 rounded-full mb-6 border border-blue-300">
            <CheckCircle2 size={16} className="text-blue-700" />
            <span className="text-sm font-bold text-blue-700">{hero.badge}</span>
          </div>

          <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight text-slate-900 mb-6 max-w-4xl mx-auto">
            {hero.title}
          </h1>

          <p className="text-xl text-slate-600 max-w-2xl mx-auto mb-12">
            {hero.subtitle}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-20">
            <Link
              href="/crm/signup"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-xl hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-2xl transition"
            >
              {hero.cta_signup}
              <ArrowRight size={20} />
            </Link>
            <Link
              href="/admin/login"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-slate-400 text-slate-700 font-semibold rounded-xl hover:bg-slate-100 hover:border-slate-500 transition bg-white/50"
            >
              {hero.cta_login}
            </Link>
          </div>

          <div className="w-full max-w-4xl mx-auto aspect-video bg-gradient-to-br from-blue-900 via-purple-900 to-slate-900 rounded-2xl shadow-2xl flex items-center justify-center border border-blue-700/50 relative overflow-hidden">
            {/* Animated background elements */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-10 left-10 w-40 h-40 bg-blue-500 rounded-full blur-3xl animate-pulse"></div>
              <div className="absolute bottom-10 right-10 w-40 h-40 bg-purple-500 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
            </div>
            <div className="relative z-10 text-center">
              <BarChart3 size={80} className="text-blue-300 mx-auto mb-4" />
              <p className="text-blue-200 font-semibold text-lg">
                {language === 'es' ? 'Panel de Control Omnicanal' : 'Omnichannel Control Panel'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* WhatsApp Floating Button */}
      <a
        href={whatsappLink}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 group"
      >
        <div className="relative flex items-center justify-center">
          {/* Animated background circles */}
          <div className="absolute inset-0 bg-green-500 rounded-full animate-pulse opacity-75"></div>
          <div className="absolute inset-1 bg-green-500 rounded-full animate-bounce" style={{animationDuration: '1.5s'}}></div>
          
          {/* Button */}
          <div className="relative w-14 h-14 bg-gradient-to-r from-green-400 to-green-600 rounded-full flex items-center justify-center shadow-lg hover:shadow-2xl hover:scale-110 transition-all duration-300 cursor-pointer">
            <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.272-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.67-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421-7.403h-.004a9.87 9.87 0 00-5.031 1.378c-3.055 2.116-4.867 5.51-4.867 8.902 0 3.666 2.25 6.966 6.215 8.316l.645.274 4.888-.959-.002-13.6c0-2.34-.571-4.545-1.222-6.368-.547-1.503-1.467-2.848-2.772-3.74a9.86 9.86 0 00-4.146-.953z"/>
            </svg>
          </div>
        </div>
        
        {/* Tooltip */}
        <div className="absolute bottom-full right-0 mb-3 bg-slate-900 text-white px-4 py-2 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap border border-slate-700">
          <p className="font-semibold text-sm">WhatsApp Support</p>
          <p className="text-xs text-slate-300">+1 (786) 391-8722</p>
        </div>
      </a>

      {/* Features Section */}
      <Features language={language} />

      {/* Channels Section */}
      <Channels language={language} />

      {/* How It Works Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              {language === 'es' ? '¿Cómo Funciona?' : 'How It Works?'}
            </h2>
            <p className="text-slate-600 text-lg">
              {language === 'es' 
                ? 'Empieza a gestionar todas tus conversaciones en 4 simples pasos' 
                : 'Start managing all your conversations in 4 simple steps'}
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {/* Step 1 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <UserPlus size={32} className="text-white" />
              </div>
              <div className="mb-4">
                <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-bold mb-3">
                  {language === 'es' ? 'Paso 1' : 'Step 1'}
                </span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                {language === 'es' ? 'Crea tu Cuenta' : 'Create Your Account'}
              </h3>
              <p className="text-slate-600">
                {language === 'es' 
                  ? 'Regístrate gratis en menos de 2 minutos. No necesitas tarjeta de crédito.' 
                  : 'Sign up for free in less than 2 minutes. No credit card required.'}
              </p>
            </div>

            {/* Step 2 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <MessageSquare size={32} className="text-white" />
              </div>
              <div className="mb-4">
                <span className="inline-block px-3 py-1 bg-purple-100 text-purple-600 rounded-full text-sm font-bold mb-3">
                  {language === 'es' ? 'Paso 2' : 'Step 2'}
                </span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {language === 'es' ? 'Contáctanos' : 'Contact Us'}
              </h3>
              <p className="text-gray-600">
                {language === 'es' 
                  ? 'Nuestro equipo te ayudará a configurar tus canales de comunicación.' 
                  : 'Our team will help you set up your communication channels.'}
              </p>
            </div>

            {/* Step 3 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <Settings size={32} className="text-white" />
              </div>
              <div className="mb-4">
                <span className="inline-block px-3 py-1 bg-pink-100 text-pink-600 rounded-full text-sm font-bold mb-3">
                  {language === 'es' ? 'Paso 3' : 'Step 3'}
                </span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {language === 'es' ? 'Configura Canales' : 'Configure Channels'}
              </h3>
              <p className="text-gray-600">
                {language === 'es' 
                  ? 'Conecta WhatsApp, Instagram, Facebook y más en minutos.' 
                  : 'Connect WhatsApp, Instagram, Facebook and more in minutes.'}
              </p>
            </div>

            {/* Step 4 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <Rocket size={32} className="text-white" />
              </div>
              <div className="mb-4">
                <span className="inline-block px-3 py-1 bg-green-100 text-green-600 rounded-full text-sm font-bold mb-3">
                  {language === 'es' ? 'Paso 4' : 'Step 4'}
                </span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {language === 'es' ? '¡Listo!' : 'Ready!'}
              </h3>
              <p className="text-gray-600">
                {language === 'es' 
                  ? 'Empieza a gestionar todas tus conversaciones desde un solo lugar.' 
                  : 'Start managing all your conversations from one place.'}
              </p>
            </div>
          </div>

          {/* Progress Line */}
          <div className="hidden md:block mt-16 relative">
            <div className="absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 via-pink-500 to-green-500 transform -translate-y-1/2"></div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              {language === 'es' ? 'Lo Que Dicen Nuestros Clientes' : 'What Our Customers Say'}
            </h2>
            <p className="text-gray-600 text-lg">
              {language === 'es' 
                ? 'Empresas de todo el mundo confían en Barmentech CRM' 
                : 'Companies worldwide trust Barmentech CRM'}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-lg transition border border-gray-100">
              <div className="flex gap-1 mb-4">
                {[1,2,3,4,5].map((i) => (
                  <Star key={i} size={18} className="text-yellow-400 fill-yellow-400" />
                ))}
              </div>
              <p className="text-gray-600 mb-6 leading-relaxed italic">
                {language === 'es'
                  ? '"Barmentech CRM revolucionó nuestra atención al cliente. Ahora manejamos WhatsApp, Instagram y Facebook desde un solo lugar. ¡Increíble!"'
                  : '"Barmentech CRM revolutionized our customer service. Now we manage WhatsApp, Instagram and Facebook from one place. Amazing!"'}
              </p>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold">MR</span>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">María Rodríguez</h4>
                  <p className="text-sm text-gray-500">
                    {language === 'es' ? 'Dueña, Tienda de Moda' : 'Owner, Fashion Store'}
                  </p>
                </div>
              </div>
            </div>

            {/* Testimonial 2 */}
            <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-lg transition border border-gray-100">
              <div className="flex gap-1 mb-4">
                {[1,2,3,4,5].map((i) => (
                  <Star key={i} size={18} className="text-yellow-400 fill-yellow-400" />
                ))}
              </div>
              <p className="text-gray-600 mb-6 leading-relaxed italic">
                {language === 'es'
                  ? '"La integración con Meta es perfecta. No hemos tenido ningún problema de baneo. El soporte es excelente y siempre están disponibles."'
                  : '"The Meta integration is perfect. We haven\'t had any ban issues. Support is excellent and always available."'}
              </p>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold">JC</span>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">Juan Carlos</h4>
                  <p className="text-sm text-gray-500">
                    {language === 'es' ? 'CEO, Tech Gadgets' : 'CEO, Tech Gadgets'}
                  </p>
                </div>
              </div>
            </div>

            {/* Testimonial 3 */}
            <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-lg transition border border-gray-100">
              <div className="flex gap-1 mb-4">
                {[1,2,3,4,5].map((i) => (
                  <Star key={i} size={18} className="text-yellow-400 fill-yellow-400" />
                ))}
              </div>
              <p className="text-gray-600 mb-6 leading-relaxed italic">
                {language === 'es'
                  ? '"Pasamos de perder mensajes a tener todo organizado. La IA nos ayuda a responder más rápido. Nuestras ventas subieron 40%."'
                  : '"We went from losing messages to having everything organized. AI helps us respond faster. Our sales increased 40%."'}
              </p>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-red-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold">SP</span>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">Sofía Pérez</h4>
                  <p className="text-sm text-gray-500">
                    {language === 'es' ? 'Gerente, E-commerce' : 'Manager, E-commerce'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Trust Badge */}
          <div className="mt-16 text-center">
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-blue-50 rounded-full border border-blue-200">
              <CheckCircle2 size={24} className="text-blue-600" />
              <span className="text-blue-900 font-semibold">
                {language === 'es' 
                  ? '+ de 500 empresas confían en Barmentech CRM' 
                  : '500+ companies trust Barmentech CRM'}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <Pricing language={language} />

      {/* FAQ Section */}
      <section id="faq" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              {language === 'es' ? 'Preguntas Frecuentes' : 'Frequently Asked Questions'}
            </h2>
            <p className="text-gray-600 text-lg">
              {language === 'es' 
                ? 'Resolvemos todas tus dudas sobre Barmentech CRM' 
                : 'We answer all your questions about Barmentech CRM'}
            </p>
          </div>

          <div className="space-y-4">
            {/* FAQ 1 */}
            <div className="bg-white border-2 border-gray-200 rounded-xl overflow-hidden hover:border-blue-500 transition">
              <button
                onClick={() => setOpenFaq(openFaq === 1 ? null : 1)}
                className="w-full px-6 py-5 text-left flex justify-between items-center hover:bg-gray-50"
              >
                <span className="font-bold text-gray-900 text-lg">
                  {language === 'es' 
                    ? '¿Necesito conocimientos técnicos para usar Barmentech CRM?' 
                    : 'Do I need technical knowledge to use Barmentech CRM?'}
                </span>
                <ChevronDown 
                  size={24} 
                  className={`text-blue-600 transition-transform ${openFaq === 1 ? 'rotate-180' : ''}`} 
                />
              </button>
              {openFaq === 1 && (
                <div className="px-6 pb-5 text-gray-600 leading-relaxed">
                  {language === 'es'
                    ? 'No. Barmentech CRM está diseñado para ser intuitivo y fácil de usar. Nuestro equipo te ayuda con la configuración inicial de todos tus canales. Solo necesitas seguir unos simples pasos y estarás listo para empezar.'
                    : 'No. Barmentech CRM is designed to be intuitive and easy to use. Our team helps you with the initial setup of all your channels. You just need to follow a few simple steps and you\'ll be ready to start.'}
                </div>
              )}
            </div>

            {/* FAQ 2 */}
            <div className="bg-white border-2 border-gray-200 rounded-xl overflow-hidden hover:border-blue-500 transition">
              <button
                onClick={() => setOpenFaq(openFaq === 2 ? null : 2)}
                className="w-full px-6 py-5 text-left flex justify-between items-center hover:bg-gray-50"
              >
                <span className="font-bold text-gray-900 text-lg">
                  {language === 'es' 
                    ? '¿Puedo conectar mis cuentas de WhatsApp Business, Instagram y Facebook?' 
                    : 'Can I connect my WhatsApp Business, Instagram and Facebook accounts?'}
                </span>
                <ChevronDown 
                  size={24} 
                  className={`text-blue-600 transition-transform ${openFaq === 2 ? 'rotate-180' : ''}`} 
                />
              </button>
              {openFaq === 2 && (
                <div className="px-6 pb-5 text-gray-600 leading-relaxed">
                  {language === 'es'
                    ? 'Sí, absolutamente. Barmentech CRM se integra directamente con Meta (Facebook) para conectar WhatsApp Business API, Instagram Direct y Facebook Messenger. También soportamos Telegram, TikTok y Email. Todas tus conversaciones en un solo lugar.'
                    : 'Yes, absolutely. Barmentech CRM integrates directly with Meta (Facebook) to connect WhatsApp Business API, Instagram Direct and Facebook Messenger. We also support Telegram, TikTok and Email. All your conversations in one place.'}
                </div>
              )}
            </div>

            {/* FAQ 3 */}
            <div className="bg-white border-2 border-gray-200 rounded-xl overflow-hidden hover:border-blue-500 transition">
              <button
                onClick={() => setOpenFaq(openFaq === 3 ? null : 3)}
                className="w-full px-6 py-5 text-left flex justify-between items-center hover:bg-gray-50"
              >
                <span className="font-bold text-gray-900 text-lg">
                  {language === 'es' 
                    ? '¿Mi cuenta de Instagram o WhatsApp puede ser baneada?' 
                    : 'Can my Instagram or WhatsApp account be banned?'}
                </span>
                <ChevronDown 
                  size={24} 
                  className={`text-blue-600 transition-transform ${openFaq === 3 ? 'rotate-180' : ''}`} 
                />
              </button>
              {openFaq === 3 && (
                <div className="px-6 pb-5 text-gray-600 leading-relaxed">
                  {language === 'es'
                    ? 'No. Barmentech es un Meta Business Partner certificado. Usamos las APIs oficiales de Meta, lo que significa que tu cuenta está 100% segura y cumple con todas las políticas de Facebook, Instagram y WhatsApp. A diferencia de otras soluciones no oficiales, no corres riesgo de baneo.'
                    : 'No. Barmentech is a certified Meta Business Partner. We use Meta\'s official APIs, which means your account is 100% safe and complies with all Facebook, Instagram and WhatsApp policies. Unlike other unofficial solutions, you are not at risk of being banned.'}
                </div>
              )}
            </div>

            {/* FAQ 4 */}
            <div className="bg-white border-2 border-gray-200 rounded-xl overflow-hidden hover:border-blue-500 transition">
              <button
                onClick={() => setOpenFaq(openFaq === 4 ? null : 4)}
                className="w-full px-6 py-5 text-left flex justify-between items-center hover:bg-gray-50"
              >
                <span className="font-bold text-gray-900 text-lg">
                  {language === 'es' 
                    ? '¿Cuánto tiempo toma configurar el CRM?' 
                    : 'How long does it take to set up the CRM?'}
                </span>
                <ChevronDown 
                  size={24} 
                  className={`text-blue-600 transition-transform ${openFaq === 4 ? 'rotate-180' : ''}`} 
                />
              </button>
              {openFaq === 4 && (
                <div className="px-6 pb-5 text-gray-600 leading-relaxed">
                  {language === 'es'
                    ? 'El proceso completo toma aproximadamente 1-2 días hábiles. Primero creas tu cuenta (2 minutos), luego nuestro equipo te contacta para configurar tus canales (1 hora de trabajo conjunto), y finalmente hacemos pruebas para asegurar que todo funcione perfectamente. ¡Y listo para usar!'
                    : 'The complete process takes approximately 1-2 business days. First you create your account (2 minutes), then our team contacts you to configure your channels (1 hour of joint work), and finally we do tests to ensure everything works perfectly. Ready to use!'}
                </div>
              )}
            </div>

            {/* FAQ 5 */}
            <div className="bg-white border-2 border-gray-200 rounded-xl overflow-hidden hover:border-blue-500 transition">
              <button
                onClick={() => setOpenFaq(openFaq === 5 ? null : 5)}
                className="w-full px-6 py-5 text-left flex justify-between items-center hover:bg-gray-50"
              >
                <span className="font-bold text-gray-900 text-lg">
                  {language === 'es' 
                    ? '¿Puedo cancelar mi suscripción en cualquier momento?' 
                    : 'Can I cancel my subscription at any time?'}
                </span>
                <ChevronDown 
                  size={24} 
                  className={`text-blue-600 transition-transform ${openFaq === 5 ? 'rotate-180' : ''}`} 
                />
              </button>
              {openFaq === 5 && (
                <div className="px-6 pb-5 text-gray-600 leading-relaxed">
                  {language === 'es'
                    ? 'Sí, puedes cancelar tu suscripción en cualquier momento sin penalidades. Si cancelas, mantendrás acceso hasta el final de tu período de facturación actual. Todos tus datos pueden ser exportados antes de cancelar.'
                    : 'Yes, you can cancel your subscription at any time without penalties. If you cancel, you will maintain access until the end of your current billing period. All your data can be exported before canceling.'}
                </div>
              )}
            </div>

            {/* FAQ 6 */}
            <div className="bg-white border-2 border-gray-200 rounded-xl overflow-hidden hover:border-blue-500 transition">
              <button
                onClick={() => setOpenFaq(openFaq === 6 ? null : 6)}
                className="w-full px-6 py-5 text-left flex justify-between items-center hover:bg-gray-50"
              >
                <span className="font-bold text-gray-900 text-lg">
                  {language === 'es' 
                    ? '¿Ofrecen soporte en español?' 
                    : 'Do you offer support in Spanish?'}
                </span>
                <ChevronDown 
                  size={24} 
                  className={`text-blue-600 transition-transform ${openFaq === 6 ? 'rotate-180' : ''}`} 
                />
              </button>
              {openFaq === 6 && (
                <div className="px-6 pb-5 text-gray-600 leading-relaxed">
                  {language === 'es'
                    ? 'Sí, nuestro equipo de soporte habla español e inglés. Estamos disponibles por email, WhatsApp y videollamada. En el plan Profesional y Enterprise ofrecemos soporte prioritario y 24/7.'
                    : 'Yes, our support team speaks Spanish and English. We are available via email, WhatsApp and video call. On the Professional and Enterprise plans we offer priority and 24/7 support.'}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

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

      {/* Contact Modal */}
      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} language={language} />
    </div>
  );
}
