'use client';

import { useEffect, useState } from 'react';
import { useApi } from '@/src/lib/api';
import { BarChart3, MessageCircle, Users, TrendingUp } from 'lucide-react';

export default function CrmStatsPage() {
  const [stats, setStats] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { get } = useApi();

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setIsLoading(true);
        const data = await get('/crm/stats');
        setStats(data);
      } catch (error) {
        console.error('Error fetching stats:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStats();
  }, [get]);

  const statCards = [
    {
      label: 'Conversaciones Totales',
      value: stats?.totalConversations || 0,
      icon: MessageCircle,
      color: 'bg-blue-500',
    },
    {
      label: 'Conversaciones Activas',
      value: stats?.activeConversations || 0,
      icon: TrendingUp,
      color: 'bg-green-500',
    },
    {
      label: 'Clientes Únicos',
      value: stats?.uniqueCustomers || 0,
      icon: Users,
      color: 'bg-purple-500',
    },
    {
      label: 'Mensajes Totales',
      value: stats?.totalMessages || 0,
      icon: BarChart3,
      color: 'bg-orange-500',
    },
  ];

  if (isLoading) {
    return (
      <div className="p-6">
        <div className="animate-pulse space-y-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-20 bg-slate-200 rounded-lg" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col bg-gradient-to-br from-slate-50 to-slate-100 p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">Estadísticas del CRM</h1>
        <p className="text-slate-600 mt-2">Vista general de tu actividad</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((card, index) => {
          const Icon = card.icon;
          return (
            <div
              key={index}
              className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-lg ${card.color}`}>
                  <Icon size={24} className="text-white" />
                </div>
              </div>
              <p className="text-slate-600 text-sm mb-1">{card.label}</p>
              <p className="text-3xl font-bold text-slate-900">{card.value}</p>
            </div>
          );
        })}
      </div>

      {/* Channel Breakdown */}
      {stats?.byChannel && (
        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
          <h2 className="text-lg font-semibold text-slate-900 mb-4">Por Canal</h2>
          <div className="space-y-3">
            {Object.entries(stats.byChannel).map(([channel, count]: [string, any]) => (
              <div key={channel} className="flex items-center justify-between">
                <span className="text-slate-600 capitalize">{channel}</span>
                <div className="flex items-center gap-3">
                  <div className="w-32 bg-slate-200 rounded-full h-2">
                    <div
                      className="bg-blue-500 h-2 rounded-full"
                      style={{
                        width: `${Math.min((count / stats.totalConversations) * 100, 100)}%`,
                      }}
                    />
                  </div>
                  <span className="text-sm font-medium text-slate-900 w-12 text-right">{count}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
