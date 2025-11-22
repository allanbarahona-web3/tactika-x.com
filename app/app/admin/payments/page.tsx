'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { paymentsApi } from '@/lib/api/client';

interface Payment {
  id: string;
  orderId: string;
  amount: number;
  status: string;
  paymentMethod: string;
  transactionId?: string;
  createdAt: string;
  updatedAt: string;
}

export default function PaymentsPage() {
  const { token } = useAuth();
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!token) return;
    fetchPayments();
  }, [token]);

  const fetchPayments = async () => {
    try {
      setLoading(true);
      const data = await paymentsApi.list(token!);
      setPayments(data?.data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load payments');
    } finally {
      setLoading(false);
    }
  };

  const handleMarkPaid = async (id: string) => {
    if (!token) return;
    try {
      await paymentsApi.markPaid(token, id);
      fetchPayments();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update payment');
    }
  };

  const handleMarkFailed = async (id: string) => {
    if (!token) return;
    try {
      await paymentsApi.markFailed(token, id);
      fetchPayments();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update payment');
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-900">Payments</h1>
      <p className="text-sm text-gray-500 mt-1 mb-8">Track and manage payments</p>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg px-4 py-3 mb-6">
          <p className="text-red-700 text-sm font-medium">{error}</p>
        </div>
      )}

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="text-center">
            <div className="w-12 h-12 rounded-full border-2 border-gray-200 border-t-gray-900 animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600 text-sm font-medium">Loading payments</p>
          </div>
        </div>
      ) : (
        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
          {payments.length === 0 ? (
            <div className="p-12 text-center">
              <svg className="w-16 h-16 mx-auto mb-3 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
              <p className="text-sm font-medium text-gray-900">No payments</p>
            </div>
          ) : (
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wide">ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wide">Order</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wide">Amount</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wide">Method</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wide">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wide">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wide">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {payments.map((payment) => (
                  <tr key={payment.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 text-xs text-gray-900 font-mono">
                      {payment.transactionId || '—'}
                    </td>
                    <td className="px-6 py-4 text-xs text-gray-600">
                      {payment.orderId}
                    </td>
                    <td className="px-6 py-4 text-xs font-semibold text-gray-900">
                      ${(payment.amount / 100).toFixed(2)}
                    </td>
                    <td className="px-6 py-4 text-xs text-gray-600 capitalize">
                      {payment.paymentMethod}
                    </td>
                    <td className="px-6 py-4 text-xs">
                      <span className={`px-2.5 py-1 rounded text-xs font-medium ${
                        payment.status === 'paid'
                          ? 'bg-green-50 text-green-700'
                          : payment.status === 'failed'
                          ? 'bg-red-50 text-red-700'
                          : 'bg-yellow-50 text-yellow-700'
                      }`}>
                        {payment.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-xs text-gray-600">
                      {new Date(payment.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-xs space-x-2">
                      {payment.status === 'pending' && (
                        <>
                          <button
                            onClick={() => handleMarkPaid(payment.id)}
                            className="text-green-600 hover:text-green-700 font-medium"
                          >
                            Paid
                          </button>
                          <button
                            onClick={() => handleMarkFailed(payment.id)}
                            className="text-red-600 hover:text-red-700 font-medium"
                          >
                            Failed
                          </button>
                        </>
                      )}
                      {payment.status !== 'pending' && (
                        <span className="text-gray-400">—</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
}
