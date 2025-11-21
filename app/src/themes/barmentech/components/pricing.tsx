'use client';

import { useLanguage } from '../context/LanguageContext';

export function Pricing() {
  const { t } = useLanguage();

  const getPlans = () => [
    {
      id: 'starter',
      name: t.starter,
      price: 24.99,
      description: t.starterDesc,
      featured: false,
      features: [
        { name: t.featureUp50, included: true },
        { name: t.featureBasicAnalytics, included: true },
        { name: t.featureEmailSupport, included: true },
        { name: t.featureCustomDomain, included: false },
        { name: t.featureAPIAccess, included: false },
      ]
    },
    {
      id: 'professional',
      name: t.professional,
      price: 44.99,
      description: t.professionalDesc,
      featured: true,
      features: [
        { name: t.featureUnlimited, included: true },
        { name: t.featureAdvancedAnalytics, included: true },
        { name: t.featurePrioritySupport, included: true },
        { name: t.featureCustomDomain, included: true },
        { name: t.featureAPIAccess, included: false },
      ]
    },
    {
      id: 'enterprise',
      name: t.enterprise,
      price: 79.95,
      description: t.enterpriseDesc,
      featured: false,
      features: [
        { name: t.featureUnlimited, included: true },
        { name: t.featureAdvancedAnalytics, included: true },
        { name: t.feature247Support, included: true },
        { name: t.featureCustomDomain, included: true },
        { name: t.featureAPIAccess, included: true },
      ]
    },
  ];

  const plans = getPlans();

  return (
    <section id="pricing" className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-20">
          <h2 className="text-5xl font-bold mb-4">{t.pricingTitle}</h2>
          <p className="text-xl text-slate-600">
            {t.pricingSubtitle}
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`rounded-2xl p-8 transition-all duration-300 cursor-pointer hover:shadow-2xl ${
                plan.featured
                  ? 'border-2 -translate-y-4 shadow-2xl border-blue-600 hover:-translate-y-6'
                  : 'border-2 border-slate-200 hover:border-blue-600 hover:-translate-y-2'
              }`}
              style={plan.featured ? {
                backgroundColor: 'white'
              } : {
                backgroundColor: 'white'
              }}
            >
              {/* Badge */}
              {plan.featured && (
                <div className="mb-4 inline-block px-4 py-1 rounded-full text-sm font-bold bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                  Most Popular
                </div>
              )}

              {/* Plan Name */}
              <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
              <p className="text-slate-600 mb-6">{plan.description}</p>

              {/* Price */}
              <div className="mb-8">
                <div className="text-5xl font-bold">${plan.price}</div>
                <div className="text-slate-600">/month</div>
              </div>

              {/* CTA Button */}
              <button
                className="w-full py-3 rounded-lg font-semibold text-white transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 mb-8 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              >
                {t.cta}
              </button>

              {/* Features */}
              <ul className="space-y-4">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span className={`text-xl mt-0.5 ${feature.included ? 'text-green-500' : 'text-slate-300'}`}>
                      {feature.included ? '✓' : '✗'}
                    </span>
                    <span className={feature.included ? 'text-slate-700' : 'text-slate-400'}>
                      {feature.name}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Note */}
        <div className="text-center mt-12">
          <p className="text-slate-600">
            ✨ 14-day free trial on all plans. No credit card required. Cancel anytime.
          </p>
        </div>
      </div>
    </section>
  );
}
