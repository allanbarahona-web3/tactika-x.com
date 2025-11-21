'use client';

import { barmentechConfig } from '../theme.config';

export function Features() {
  const config = barmentechConfig.content;

  return (
    <section id="features" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-20">
          <h2 className="text-5xl font-bold mb-4">Everything You Need to Succeed</h2>
          <p className="text-xl text-slate-600">
            Powerful tools to launch, manage and grow your online store.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {config.features.map((feature, idx) => (
            <div
              key={idx}
              className="p-8 border-2 border-slate-200 rounded-2xl hover:border-purple-500 transition-colors"
            >
              <div className="text-5xl mb-4">{feature.icon}</div>
              <h3 className="text-2xl font-bold mb-3">{feature.title}</h3>
              <p className="text-slate-600 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
