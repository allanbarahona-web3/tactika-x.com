'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { productsApi, ordersApi, paymentsApi } from '@/lib/api/client';

interface DashboardStats {
  totalProducts: number;
  totalOrders: number;
  totalRevenue: number;
  pendingPayments: number;
}

export default function DashboardPage() {
  const { token } = useAuth();
  const [stats, setStats] = useState<DashboardStats>({
    totalProducts: 0,
    totalOrders: 0,
    totalRevenue: 0,
    pendingPayments: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!token) return;

    const fetchStats = async () => {
      try {
        setLoading(true);
        const [products, orders, payments] = await Promise.all([
          productsApi.list(token),
          ordersApi.list(token),
          paymentsApi.list(token),
        ]);

        const totalRevenue = (orders?.data || []).reduce((sum: number, order: any) => sum + (order.total || 0), 0);
        const pendingPayments = (payments?.data || []).filter((p: any) => p.status === 'pending').length;

        setStats({
          totalProducts: products?.data?.length || 0,
          totalOrders: orders?.data?.length || 0,
          totalRevenue: totalRevenue / 100, // Convert from cents
          pendingPayments,
        });
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load stats');
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [token]);

  const StatCard = ({ title, value, icon }: { title: string; value: string | number; icon: string }) => (
    <div className="bg-white rounded-lg shadow p-6 border-l-4 border-blue-500">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-600 mb-1">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
        </div>
        <div className="text-3xl">{icon}</div>
      </div>
    </div>
  );

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Dashboard</h1>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
          {error}
        </div>
      )}

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading statistics...</p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard title="Total Products" value={stats.totalProducts} icon="📦" />
          <StatCard title="Total Orders" value={stats.totalOrders} icon="📋" />
          <StatCard title="Total Revenue" value={`$${stats.totalRevenue.toFixed(2)}`} icon="💰" />
          <StatCard title="Pending Payments" value={stats.pendingPayments} icon="⏳" />
        </div>
      )}

      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="flex items-center gap-2 px-4 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition-colors">
            <span>➕</span>
            <span>Add Product</span>
          </button>
          <button className="flex items-center gap-2 px-4 py-3 bg-green-500 hover:bg-green-600 text-white rounded-lg font-medium transition-colors">
            <span>📂</span>
            <span>Manage Categories</span>
          </button>
          <button className="flex items-center gap-2 px-4 py-3 bg-purple-500 hover:bg-purple-600 text-white rounded-lg font-medium transition-colors">
            <span>🖼️</span>
            <span>Upload Media</span>
          </button>
        </div>
      </div>
    </div>
  );
}
