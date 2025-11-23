import { X } from 'lucide-react';
import { useState } from 'react';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: 'es' | 'en';
}

export function ContactModal({ isOpen, onClose, language }: ContactModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const translations = {
    es: {
      title: 'Contáctanos',
      subtitle: 'Nos encantaría escucharte. Responderemos dentro de 24 horas.',
      name: 'Nombre',
      email: 'Email',
      phone: 'Teléfono',
      message: 'Mensaje',
      send: 'Enviar Mensaje',
      sending: 'Enviando...',
      success: '¡Mensaje enviado! Nos contactaremos pronto.',
      namePlaceholder: 'Tu nombre',
      emailPlaceholder: 'tu@email.com',
      phonePlaceholder: '+1 (786) 391-8722',
      messagePlaceholder: 'Cuéntanos cómo podemos ayudarte...',
    },
    en: {
      title: 'Contact Us',
      subtitle: 'We\'d love to hear from you. We\'ll respond within 24 hours.',
      name: 'Name',
      email: 'Email',
      phone: 'Phone',
      message: 'Message',
      send: 'Send Message',
      sending: 'Sending...',
      success: 'Message sent! We\'ll contact you soon.',
      namePlaceholder: 'Your name',
      emailPlaceholder: 'your@email.com',
      phonePlaceholder: '+1 (786) 391-8722',
      messagePlaceholder: 'Tell us how we can help...',
    },
  };

  const t = translations[language];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Connect to backend API for form submission
    setSubmitted(true);
    setTimeout(() => {
      setFormData({ name: '', email: '', phone: '', message: '' });
      setSubmitted(false);
      onClose();
    }, 2000);
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 z-65 transition-opacity pointer-events-auto"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-65 flex items-center justify-center p-2 sm:p-4 pointer-events-none">
        <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto pointer-events-auto">
          {/* Header */}
          <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-purple-600 px-4 sm:px-6 py-4 sm:py-6 flex justify-between items-center">
            <div>
              <h2 className="text-lg sm:text-2xl font-bold text-white">{t.title}</h2>
              <p className="text-blue-100 text-xs sm:text-sm mt-1">{t.subtitle}</p>
            </div>
            <button
              onClick={onClose}
              className="text-white hover:bg-white/20 rounded-lg p-1.5 sm:p-2 transition flex-shrink-0 ml-2"
            >
              <X size={20} className="sm:w-6 sm:h-6" />
            </button>
          </div>

          {/* Form */}
          <div className="p-4 sm:p-6">
            {submitted ? (
              <div className="text-center py-8 sm:py-12">
                <div className="w-12 sm:w-16 h-12 sm:h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                  <svg className="w-6 sm:w-8 h-6 sm:h-8 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <p className="text-gray-900 font-semibold text-base sm:text-lg">{t.success}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
                {/* Name */}
                <div>
                  <label className="block text-xs sm:text-sm font-semibold text-gray-900 mb-1 sm:mb-2">
                    {t.name}
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder={t.namePlaceholder}
                    className="w-full px-3 sm:px-4 py-2 sm:py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent transition text-sm"
                    required
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-xs sm:text-sm font-semibold text-gray-900 mb-1 sm:mb-2">
                    {t.email}
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder={t.emailPlaceholder}
                    className="w-full px-3 sm:px-4 py-2 sm:py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent transition text-sm"
                    required
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-xs sm:text-sm font-semibold text-gray-900 mb-1 sm:mb-2">
                    {t.phone}
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder={t.phonePlaceholder}
                    className="w-full px-3 sm:px-4 py-2 sm:py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent transition text-sm"
                  />
                </div>

                {/* Message */}
                <div>
                  <label className="block text-xs sm:text-sm font-semibold text-gray-900 mb-1 sm:mb-2">
                    {t.message}
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder={t.messagePlaceholder}
                    rows={3}
                    className="w-full px-3 sm:px-4 py-2 sm:py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent transition resize-none text-sm"
                    required
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold py-2 sm:py-3 rounded-lg hover:shadow-lg transition mt-4 sm:mt-6 text-sm sm:text-base"
                >
                  {t.send}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
