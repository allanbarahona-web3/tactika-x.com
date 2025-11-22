'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { productsApi, ordersApi, paymentsApi } from '@/lib/api/client';

interface Stats {
  totalProducts: number;
  totalOrders: number;
  totalRevenue: number;
  pendingPayments: number;
}

export default function DashboardPage() {
  const { token } = useAuth();
  const [stats, setStats] = useState<Stats>({
    totalProducts: 0,
    totalOrders: 0,
    totalRevenue: 0,
    pendingPayments: 0,
  });
  const [loading, setLoading] = useState(true);
  const [recentOrders, setRecentOrders] = useState<any[]>([]);

  useEffect(() => {
    if (!token) return;
    fetchData();
  }, [token]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [productsData, ordersData, paymentsData] = await Promise.all([
        productsApi.list(token!),
        ordersApi.list(token!),
        paymentsApi.list(token!),
      ]);

      const products = productsData?.data || [];
      const orders = ordersData?.data || [];
      const payments = paymentsData?.data || [];

      const totalRevenue = orders.reduce((sum: number, order: any) => sum + (order.total || 0), 0);
      const pendingPayments = payments.filter((p: any) => p.status === 'pending').length;

      setStats({
        totalProducts: products.length,
        totalOrders: orders.length,
        totalRevenue: totalRevenue / 100, // Convert from cents
        pendingPayments,
      });

      setRecentOrders(orders.slice(0, 5));
    } catch (err) {
      console.error('Failed to fetch data:', err);
    } finally {
      setLoading(false);
    }
  };

  const StatCard = ({ label, value, unit = '' }: { label: string; value: string | number; unit?: string }) => (
    <div className="bg-white border border-gray-200 rounded-lg p-6 hover:border-gray-300 transition-colors">
      <p className="text-sm text-gray-600 font-medium mb-2">{label}</p>
      <p className="text-3xl font-semibold text-gray-900">
        {value}
        {unit && <span className="text-lg text-gray-600 ml-1">{unit}</span>}
      </p>
    </div>
  );

  return (
    <div className="space-y-8">
      {/* Stats Grid */}
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="text-center">
            <div className="w-12 h-12 rounded-full border-2 border-gray-200 border-t-gray-900 animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600 text-sm font-medium">Loading dashboard</p>
          </div>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard label="Products" value={stats.totalProducts} />
            <StatCard label="Orders" value={stats.totalOrders} />
            <StatCard label="Revenue" value={`$${stats.totalRevenue.toFixed(2)}`} />
            <StatCard label="Pending Payments" value={stats.pendingPayments} />
          </div>

          {/* Recent Orders */}
          <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-base font-semibold text-gray-900">Recent Orders</h2>
            </div>

            {recentOrders.length === 0 ? (
              <div className="px-6 py-12 text-center text-gray-500">
                <p className="text-sm font-medium">No orders yet</p>
              </div>
            ) : (
              <div className="divide-y divide-gray-200">
                {recentOrders.map((order) => (
                  <div key={order.id} className="px-6 py-4 hover:bg-gray-50 transition-colors">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-gray-900">Order #{order.orderNumber}</p>
                        <p className="text-xs text-gray-500 mt-1">
                          {new Date(order.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-gray-900">
                          ${(order.total / 100).toFixed(2)}
                        </p>
                        <span className="inline-block px-2 py-1 rounded text-xs font-medium mt-1 bg-gray-100 text-gray-700">
                          {order.status}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <a
              href="/admin/products"
              className="bg-white border border-gray-200 rounded-lg p-6 hover:border-gray-300 hover:shadow-sm transition-all text-center"
            >
              <p className="text-sm text-gray-600 font-medium mb-2">Manage</p>
              <p className="text-lg font-semibold text-gray-900">Products</p>
            </a>
            <a
              href="/admin/orders"
              className="bg-white border border-gray-200 rounded-lg p-6 hover:border-gray-300 hover:shadow-sm transition-all text-center"
            >
              <p className="text-sm text-gray-600 font-medium mb-2">View</p>
              <p className="text-lg font-semibold text-gray-900">Orders</p>
            </a>
            <a
              href="/admin/media"
              className="bg-white border border-gray-200 rounded-lg p-6 hover:border-gray-300 hover:shadow-sm transition-all text-center"
            >
              <p className="text-sm text-gray-600 font-medium mb-2">Manage</p>
              <p className="text-lg font-semibold text-gray-900">Media</p>
            </a>
          </div>
        </>
      )}
    </div>
  );
}
