'use client';

import { barmentechConfig } from '../theme.config';

export function Testimonials() {
  const config = barmentechConfig.content;

  return (
    <section className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-20">
          <h2 className="text-5xl font-bold mb-4">Trusted by Entrepreneurs</h2>
          <p className="text-xl text-slate-600">
            See what our customers say about Barmentech Platform
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {config.testimonials.map((testimonial, idx) => (
            <div
              key={idx}
              className="bg-white border-2 border-slate-200 rounded-2xl p-8 hover:border-purple-500 transition-colors"
            >
              {/* Stars */}
              <div className="text-2xl mb-4">⭐⭐⭐⭐⭐</div>

              {/* Text */}
              <p className="text-slate-700 mb-6 italic leading-relaxed">
                "{testimonial.text}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-4">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold"
                  style={{ backgroundColor: barmentechConfig.colors.primary }}
                >
                  {testimonial.avatar}
                </div>
                <div>
                  <p className="font-bold">{testimonial.name}</p>
                  <p className="text-sm text-slate-600">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
