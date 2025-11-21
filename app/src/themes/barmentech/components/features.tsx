'use client';

import { useLanguage } from '../context/LanguageContext';

export function Features() {
  const { t } = useLanguage();

  const features = [
    {
      icon: '📦',
      title: t.feature1,
      description: t.feature1Desc,
    },
    {
      icon: '🔒',
      title: t.feature2,
      description: t.feature2Desc,
    },
    {
      icon: '📊',
      title: t.feature3,
      description: t.feature3Desc,
    },
    {
      icon: '🔍',
      title: t.feature4,
      description: t.feature4Desc,
    },
    {
      icon: '🎧',
      title: t.feature5,
      description: t.feature5Desc,
    },
    {
      icon: '🔗',
      title: t.feature6,
      description: t.feature6Desc,
    },
  ];

  return (
    <section id="features" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-20">
          <h2 className="text-5xl font-bold mb-4">{t.featuresTitle}</h2>
          <p className="text-xl text-slate-600">
            {t.featuresSubtitle}
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, idx) => (
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
