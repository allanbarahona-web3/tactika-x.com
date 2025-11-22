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

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      pending: 'bg-yellow-100 text-yellow-800',
      paid: 'bg-green-100 text-green-800',
      failed: 'bg-red-100 text-red-800',
      refunded: 'bg-gray-100 text-gray-800',
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
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
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Payments</h1>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
          {error}
        </div>
      )}

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading payments...</p>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          {payments.length === 0 ? (
            <div className="p-12 text-center text-gray-500">
              <p className="text-lg">No payments yet</p>
            </div>
          ) : (
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">
                    Transaction ID
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">
                    Order ID
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">
                    Amount
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">
                    Method
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {payments.map((payment) => (
                  <tr key={payment.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 text-sm text-gray-900 font-mono">
                      {payment.transactionId || '—'}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {payment.orderId}
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">
                      ${(payment.amount / 100).toFixed(2)}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600 capitalize">
                      {payment.paymentMethod}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                          payment.status
                        )}`}
                      >
                        {payment.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {new Date(payment.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-sm space-x-2">
                      {payment.status === 'pending' && (
                        <>
                          <button
                            onClick={() => handleMarkPaid(payment.id)}
                            className="text-green-600 hover:text-green-700 font-medium"
                          >
                            ✓ Mark Paid
                          </button>
                          <button
                            onClick={() => handleMarkFailed(payment.id)}
                            className="text-red-600 hover:text-red-700 font-medium"
                          >
                            ✗ Mark Failed
                          </button>
                        </>
                      )}
                      {payment.status !== 'pending' && (
                        <span className="text-gray-500">—</span>
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
