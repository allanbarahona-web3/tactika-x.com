'use client';

import { barmentechConfig } from '../theme.config';

export function Pricing() {
  const config = barmentechConfig.content;

  return (
    <section id="pricing" className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-20">
          <h2 className="text-5xl font-bold mb-4">Simple, Transparent Pricing</h2>
          <p className="text-xl text-slate-600">
            Start free, upgrade as you grow. No hidden fees. Cancel anytime.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {config.pricing.map((plan) => (
            <div
              key={plan.id}
              className={`rounded-2xl p-8 transition-all ${
                plan.featured
                  ? 'border-2 -translate-y-4 shadow-2xl'
                  : 'border-2 border-slate-200'
              }`}
              style={plan.featured ? {
                borderColor: barmentechConfig.colors.primary,
                backgroundColor: 'white'
              } : {
                backgroundColor: 'white'
              }}
            >
              {/* Badge */}
              {plan.featured && (
                <div className="mb-4 inline-block px-4 py-1 rounded-full text-sm font-bold"
                  style={{ backgroundColor: barmentechConfig.colors.secondary, color: 'white' }}>
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
                className="w-full py-3 rounded-lg font-semibold text-white transition hover:shadow-lg mb-8"
                style={{ backgroundColor: barmentechConfig.colors.primary }}
              >
                Start Free Trial
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
