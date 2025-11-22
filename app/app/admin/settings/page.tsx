'use client';

import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';

export default function SettingsPage() {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    storeName: 'Tactika-X Store',
    storeEmail: 'admin@tactika-x.com',
    storePhone: '+1 (555) 000-0000',
    shippingCost: 9.99,
    taxRate: 0.1,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'shippingCost' || name === 'taxRate' ? parseFloat(value) : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Save settings to API
    alert('Settings saved (not persisted yet)');
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Settings</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Account Settings */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Account</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <p className="px-4 py-2 bg-gray-50 rounded-lg text-gray-900">
                {user?.email}
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Role
              </label>
              <p className="px-4 py-2 bg-gray-50 rounded-lg text-gray-900 capitalize">
                {user?.role}
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Tenant ID
              </label>
              <p className="px-4 py-2 bg-gray-50 rounded-lg text-gray-900 font-mono text-sm">
                {user?.tenantId}
              </p>
            </div>
          </div>
        </div>

        {/* Store Settings */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Store Settings</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="storeName" className="block text-sm font-medium text-gray-700 mb-1">
                Store Name
              </label>
              <input
                type="text"
                id="storeName"
                name="storeName"
                value={formData.storeName}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label htmlFor="storeEmail" className="block text-sm font-medium text-gray-700 mb-1">
                Store Email
              </label>
              <input
                type="email"
                id="storeEmail"
                name="storeEmail"
                value={formData.storeEmail}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label htmlFor="storePhone" className="block text-sm font-medium text-gray-700 mb-1">
                Store Phone
              </label>
              <input
                type="tel"
                id="storePhone"
                name="storePhone"
                value={formData.storePhone}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div className="border-t border-gray-200 pt-4">
              <h3 className="font-medium text-gray-900 mb-4">Shipping & Tax</h3>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="shippingCost" className="block text-sm font-medium text-gray-700 mb-1">
                    Shipping Cost (USD)
                  </label>
                  <input
                    type="number"
                    id="shippingCost"
                    name="shippingCost"
                    value={formData.shippingCost}
                    onChange={handleInputChange}
                    step="0.01"
                    min="0"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label htmlFor="taxRate" className="block text-sm font-medium text-gray-700 mb-1">
                    Tax Rate (%)
                  </label>
                  <input
                    type="number"
                    id="taxRate"
                    name="taxRate"
                    value={formData.taxRate * 100}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        taxRate: parseFloat(e.target.value) / 100,
                      }))
                    }
                    step="0.01"
                    min="0"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
            >
              Save Settings
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
