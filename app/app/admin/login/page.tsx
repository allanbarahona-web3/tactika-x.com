'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useAuth } from '@/contexts/AuthContext';

export default function AdminLoginPage() {
  const router = useRouter();
  const { login, isLoading } = useAuth();
  const [formData, setFormData] = useState({
    email: 'admin@barmentech.com',
    password: 'password123',
    tenantId: 1,
  });
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'tenantId' ? parseInt(value) || 0 : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      console.log('Attempting login with:', { email: formData.email, tenantId: formData.tenantId });
      await login(formData.email, formData.password, formData.tenantId.toString());
      console.log('Login successful, redirecting...');
      router.push('/admin/dashboard');
    } catch (err) {
      console.error('Login error:', err);
      setError(err instanceof Error ? err.message : 'Login failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 p-4">
      <div className="w-full max-w-md">
        {/* Apple-style Card */}
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100 backdrop-blur-xl">
          {/* Header Section */}
          <div className="px-8 pt-16 pb-8 text-center border-b border-gray-100/50">
            {/* Logo */}
            <div className="flex justify-center mb-8">
              <div className="relative w-40 h-40">
                <Image 
                  src="/themes/barmentech/logo_barmentech.png" 
                  alt="CRM Portal" 
                  width={160}
                  height={160}
                  className="object-contain w-full h-full drop-shadow-lg"
                />
              </div>
            </div>
            
            {/* Title */}
            <h1 className="text-2xl font-bold tracking-tight text-gray-900">
              CRM Portal
            </h1>
          </div>

          {/* Form Section */}
          <div className="px-8 py-8 space-y-6">
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3">
                <p className="text-red-700 text-sm font-medium">{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-gray-900 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-white text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 transition-all text-sm"
                  required
                  disabled={isLoading}
                />
              </div>

              {/* Password */}
              <div>
                <label htmlFor="password" className="block text-sm font-semibold text-gray-900 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-white text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 transition-all text-sm"
                  required
                  disabled={isLoading}
                />
              </div>

              {/* Tenant ID */}
              <div>
                <label htmlFor="tenantId" className="block text-sm font-semibold text-gray-900 mb-2">
                  Tenant ID
                </label>
                <input
                  type="number"
                  id="tenantId"
                  name="tenantId"
                  value={formData.tenantId}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-white text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 transition-all text-sm"
                  required
                  disabled={isLoading}
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full px-4 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 disabled:from-gray-400 disabled:to-gray-400 text-white rounded-xl font-semibold transition-all text-sm mt-8 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                {isLoading ? 'Signing in...' : 'Sign In'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
