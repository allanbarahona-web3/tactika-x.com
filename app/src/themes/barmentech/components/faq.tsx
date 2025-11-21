'use client';

import { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';

export function FAQ() {
  const { t } = useLanguage();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: t.faq1,
      answer: t.faq1Ans,
    },
    {
      question: t.faq2,
      answer: t.faq2Ans,
    },
    {
      question: t.faq3,
      answer: t.faq3Ans,
    },
    {
      question: t.faq4,
      answer: t.faq4Ans,
    },
    {
      question: t.faq5,
      answer: t.faq5Ans,
    },
    {
      question: t.faq6,
      answer: t.faq6Ans,
    },
  ];

  return (
    <section id="faq" className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-20">
          <h2 className="text-5xl font-bold mb-4">{t.faqTitle}</h2>
        </div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {faqs.map((item, idx) => (
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
                <span className="text-2xl transition-transform text-blue-600" style={{
                  transform: openIndex === idx ? 'rotate(180deg)' : 'rotate(0deg)',
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
