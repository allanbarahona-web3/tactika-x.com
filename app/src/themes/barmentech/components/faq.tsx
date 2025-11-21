'use client';

import { useState } from 'react';
import { barmentechConfig } from '../theme.config';

export function FAQ() {
  const config = barmentechConfig.content;
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-20">
          <h2 className="text-5xl font-bold mb-4">Frequently Asked Questions</h2>
        </div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {config.faq.map((item, idx) => (
            <div
              key={idx}
              className="border-2 border-slate-200 rounded-lg overflow-hidden"
            >
              {/* Question */}
              <button
                onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                className="w-full px-6 py-4 flex items-center justify-between font-semibold hover:bg-slate-50 transition"
              >
                <span>{item.question}</span>
                <span className="text-2xl transition-transform" style={{
                  transform: openIndex === idx ? 'rotate(180deg)' : 'rotate(0deg)',
                  color: barmentechConfig.colors.primary
                }}>
                  ▼
                </span>
              </button>

              {/* Answer */}
              {openIndex === idx && (
                <div className="px-6 pb-4 text-slate-600 leading-relaxed border-t-2 border-slate-200">
                  {item.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
