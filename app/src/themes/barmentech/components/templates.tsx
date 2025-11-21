'use client';

import { useLanguage } from '../context/LanguageContext';

export function Templates() {
  const { t } = useLanguage();

  const templates = [
    {
      id: 'amazon',
      emoji: '🛒',
      badge: 'Popular',
      title: t.amazon,
      description: t.amazonDesc,
      tags: ['Responsive', 'Fast', 'SEO Ready']
    },
    {
      id: 'minimal',
      emoji: '⚡',
      badge: 'Modern',
      title: t.minimal,
      description: t.minimalDesc,
      tags: ['Minimal', 'Clean', 'Elegant']
    },
    {
      id: 'vibrant',
      emoji: '🎨',
      badge: 'Trending',
      title: t.vibrant,
      description: t.vibrantDesc,
      tags: ['Bold', 'Creative', 'Eye-catching']
    },
    {
      id: 'digital',
      emoji: '💻',
      badge: 'New',
      title: t.digital,
      description: t.digitalDesc,
      tags: ['Digital', 'Downloads', 'Courses']
    },
  ];

  const gradients = {
    amazon: 'from-amber-500 to-slate-900',
    minimal: 'from-slate-100 to-slate-300',
    vibrant: 'from-purple-600 to-cyan-400',
    digital: 'from-purple-700 to-blue-500',
  };

  return (
    <section id="templates" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-20">
          <h2 className="text-5xl font-bold mb-4">{t.browseTemplates}</h2>
          <p className="text-xl text-slate-600">
            {t.templateSubtitle}
          </p>
        </div>

        {/* Templates Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {templates.map((template) => (
            <div
              key={template.id}
              className="border-2 border-slate-200 rounded-2xl overflow-hidden hover:border-purple-500 hover:-translate-y-2 transition-all"
            >
              {/* Preview */}
              <div
                className={`w-full h-64 bg-gradient-to-br ${gradients[template.id as keyof typeof gradients]} flex items-center justify-center relative`}
              >
                <div className="absolute top-4 right-4 bg-white rounded-full px-3 py-1 text-xs font-bold">
                  {template.badge}
                </div>
                <div className="text-7xl">{template.emoji}</div>
              </div>

              {/* Info */}
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-2">{template.title}</h3>
                <p className="text-slate-600 mb-4 leading-relaxed">{template.description}</p>

                {/* Tags */}
                <div className="flex gap-2 mb-4 flex-wrap">
                  {template.tags.map((tag) => (
                    <span key={tag} className="px-3 py-1 bg-slate-100 rounded-full text-sm font-medium">
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Demo Link */}
                <button className="w-full py-2 rounded-lg font-semibold transition bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                  👁️ View Live Demo
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
