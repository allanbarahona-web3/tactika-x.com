'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Check } from 'lucide-react';

export default function CRMSignupPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [language, setLanguage] = useState<'es' | 'en'>('es');
  const [formData, setFormData] = useState({
    companyName: '',
    email: '',
    password: '',
    confirmPassword: '',
    terms: false,
  });

  const translations = {
    es: {
      title: 'Barmentech CRM',
      subtitle: 'Crea tu cuenta gratis',
      company: 'Nombre de la Empresa',
      email: 'Email',
      password: 'Contraseña',
      confirmPassword: 'Confirmar Contraseña',
      terms: 'Acepto los términos y condiciones',
      signup: 'Crear Cuenta',
      signingUp: 'Creando cuenta...',
      login: '¿Ya tienes cuenta? Inicia sesión',
      features: [
        'Gestiona múltiples canales',
        'IA y automatización',
        'Reportes y analítica',
        'Equipo ilimitado',
      ],
    },
    en: {
      title: 'Barmentech CRM',
      subtitle: 'Create your free account',
      company: 'Company Name',
      email: 'Email',
      password: 'Password',
      confirmPassword: 'Confirm Password',
      terms: 'I agree to the terms and conditions',
      signup: 'Create Account',
      signingUp: 'Creating account...',
      login: 'Already have an account? Sign in',
      features: [
        'Manage multiple channels',
        'AI and automation',
        'Reports and analytics',
        'Unlimited team',
      ],
    },
  };

  const t = translations[language];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validations
    if (formData.password !== formData.confirmPassword) {
      setError(language === 'es' ? 'Las contraseñas no coinciden' : 'Passwords do not match');
      return;
    }

    if (formData.password.length < 8) {
      setError(language === 'es' ? 'La contraseña debe tener al menos 8 caracteres' : 'Password must be at least 8 characters');
      return;
    }

    if (!formData.terms) {
      setError(language === 'es' ? 'Debes aceptar los términos y condiciones' : 'You must accept the terms and conditions');
      return;
    }

    setIsLoading(true);

    try {
      // API call to create CRM tenant
      const response = await fetch('http://localhost:3000/api/v1/auth/crm/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          companyName: formData.companyName,
          email: formData.email,
          password: formData.password,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Signup failed');
      }

      const data = await response.json();
      
      // Store tokens in localStorage (auto-login)
      if (data.accessToken && data.refreshToken) {
        localStorage.setItem('accessToken', data.accessToken);
        localStorage.setItem('refreshToken', data.refreshToken);
        localStorage.setItem('user', JSON.stringify(data.user));
        
        // Redirect to CRM dashboard
        router.push('/crm/conversations');
      } else {
        // Fallback to login if no tokens returned
        router.push('/admin/login');
      }
    } catch (err) {
      console.error('Signup error:', err);
      setError(err instanceof Error ? err.message : language === 'es' ? 'Error al registrarse' : 'Signup failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 p-3 sm:p-4 md:p-6">
      {/* Language Switcher */}
      <div className="absolute top-3 sm:top-6 right-3 sm:right-6 flex items-center gap-1 sm:gap-2 bg-white rounded-full p-0.5 sm:p-1 shadow-sm">
        <button
          onClick={() => setLanguage('es')}
          className={`px-2 sm:px-4 py-1 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition ${
            language === 'es'
              ? 'bg-blue-600 text-white'
              : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          ES
        </button>
        <button
          onClick={() => setLanguage('en')}
          className={`px-2 sm:px-4 py-1 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition ${
            language === 'en'
              ? 'bg-blue-600 text-white'
              : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          EN
        </button>
      </div>

      <div className="w-full max-w-7xl grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
        {/* Left: Form */}
        <div className="w-full max-w-md mx-auto md:mx-0">
          {/* Header */}
          <div className="mb-6 sm:mb-8">
            {/* Logo */}
            <div className="flex items-center gap-3 mb-4 sm:mb-6">
              <div className="relative w-32 sm:w-40 h-16 sm:h-20">
                <Image 
                  src="/themes/barmentech/logo_barmentech.png" 
                  alt="Barmentech CRM" 
                  width={160}
                  height={80}
                  className="object-contain w-full h-full"
                />
              </div>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-1 sm:mb-2">{t.title}</h1>
            <p className="text-xs sm:text-sm text-gray-500">{t.subtitle}</p>
          </div>

          {/* Form Card */}
          <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 md:p-8 space-y-4 sm:space-y-6">
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg px-4 py-3">
                <p className="text-red-700 text-sm font-medium">{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Company Name */}
              <div>
                <label htmlFor="companyName" className="block text-sm font-semibold text-gray-900 mb-2">
                  {t.company}
                </label>
                <input
                  type="text"
                  id="companyName"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleChange}
                  placeholder={language === 'es' ? 'Mi Empresa' : 'My Company'}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-white text-gray-900 placeholder-gray-400 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-colors text-sm"
                  required
                  disabled={isLoading}
                />
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-gray-900 mb-2">
                  {t.email}
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-white text-gray-900 placeholder-gray-400 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-colors text-sm"
                  required
                  disabled={isLoading}
                />
              </div>

              {/* Password */}
              <div>
                <label htmlFor="password" className="block text-sm font-semibold text-gray-900 mb-2">
                  {t.password}
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-white text-gray-900 placeholder-gray-400 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-colors text-sm"
                  required
                  disabled={isLoading}
                />
              </div>

              {/* Confirm Password */}
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-semibold text-gray-900 mb-2">
                  {t.confirmPassword}
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-white text-gray-900 placeholder-gray-400 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-colors text-sm"
                  required
                  disabled={isLoading}
                />
              </div>

              {/* Terms Checkbox */}
              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  id="terms"
                  name="terms"
                  checked={formData.terms}
                  onChange={handleChange}
                  className="w-4 h-4 border border-gray-300 rounded text-blue-600 focus:ring-blue-600 cursor-pointer mt-1"
                  disabled={isLoading}
                />
                <label htmlFor="terms" className="text-sm text-gray-600 cursor-pointer">
                  {t.terms}
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full px-4 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-xl font-semibold transition-all text-sm mt-8 flex items-center justify-center gap-2"
              >
                {isLoading ? t.signingUp : t.signup}
                {!isLoading && <ArrowRight size={16} />}
              </button>
            </form>
          </div>

          {/* Footer Link */}
          <p className="mt-6 text-center text-sm text-gray-600">
            {t.login}{' '}
            <Link href="/admin/login" className="text-blue-600 hover:text-blue-700 font-medium">
              {language === 'es' ? 'aquí' : 'here'}
            </Link>
          </p>

          {/* Back to Landing */}
          <div className="mt-6 text-center">
            <Link href="/" className="text-sm text-gray-500 hover:text-gray-700 transition">
              {language === 'es' ? '← Volver a inicio' : '← Back to home'}
            </Link>
          </div>
        </div>

        {/* Right: Features (Desktop Only) */}
        <div className="hidden md:block">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            {language === 'es' ? '¿Por qué Barmentech CRM?' : 'Why Barmentech CRM?'}
          </h2>
          <ul className="space-y-6">
            {t.features.map((feature, idx) => (
              <li key={idx} className="flex items-start gap-4">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mt-1 flex-shrink-0">
                  <Check size={20} className="text-blue-600" />
                </div>
                <div>
                  <p className="text-lg text-gray-900 font-medium">{feature}</p>
                </div>
              </li>
            ))}
          </ul>

          {/* Trust Badge */}
          <div className="mt-12 p-6 bg-blue-50 rounded-xl border border-blue-200">
            <p className="text-sm font-semibold text-blue-900 mb-2">
              {language === 'es' ? 'Certificado Meta Business Partner' : 'Meta Certified Business Partner'}
            </p>
            <p className="text-xs text-blue-800">
              {language === 'es'
                ? 'Tu cuenta está protegida. Nunca serás baneado por usar Barmentech CRM.'
                : 'Your account is protected. You will never be banned for using Barmentech CRM.'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
