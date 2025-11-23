import Link from 'next/link';
import { CheckCircle2 } from 'lucide-react';

interface PricingProps {
  language: 'es' | 'en';
}

export function Pricing({ language }: PricingProps) {
  const plans =
    language === 'es'
      ? [
          {
            name: 'Starter',
            price: '$29',
            desc: 'Perfecto para empezar',
            features: ['Hasta 2 usuarios', '5,000 mensajes/mes', 'Soporte por email'],
          },
          {
            name: 'Profesional',
            price: '$79',
            desc: 'Para negocios en crecimiento',
            features: ['Hasta 10 usuarios', '50,000 mensajes/mes', 'Soporte prioritario'],
            featured: true,
          },
          {
            name: 'Enterprise',
            price: 'Contactar',
            desc: 'Soluciones personalizadas',
            features: ['Usuarios ilimitados', 'Mensajes ilimitados', 'Soporte 24/7'],
          },
        ]
      : [
          {
            name: 'Starter',
            price: '$29',
            desc: 'Perfect to get started',
            features: ['Up to 2 users', '5,000 messages/month', 'Email support'],
          },
          {
            name: 'Professional',
            price: '$79',
            desc: 'For growing businesses',
            features: ['Up to 10 users', '50,000 messages/month', 'Priority support'],
            featured: true,
          },
          {
            name: 'Enterprise',
            price: 'Contact Us',
            desc: 'Custom solutions',
            features: ['Unlimited users', 'Unlimited messages', '24/7 Support'],
          },
        ];

  return (
    <section id="pricing" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 text-center mb-16">
          {language === 'es' ? 'Planes Simples y Transparentes' : 'Simple and Transparent Plans'}
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan, idx) => (
            <div
              key={idx}
              className={`p-8 rounded-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl ${
                plan.featured ? 'border-2 border-blue-600 bg-white shadow-xl relative -mt-4' : 'border border-gray-200 bg-white shadow-lg hover:shadow-2xl'
              }`}
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
              <p className="text-gray-600 text-sm mb-6">{plan.desc}</p>
              <div className="mb-6">
                <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
              </div>
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, fidx) => (
                  <li key={fidx} className="flex items-center gap-2 text-gray-600 text-sm">
                    <CheckCircle2 size={16} className="text-green-500" />
                    {feature}
                  </li>
                ))}
              </ul>
              <Link
                href="/crm/signup"
                className={`w-full py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2 ${
                  plan.featured
                    ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 shadow-lg'
                    : 'border border-gray-300 text-gray-900 hover:bg-gray-50 hover:border-gray-400'
                }`}
              >
                {language === 'es' ? 'Comenzar Ahora' : 'Get Started'}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
