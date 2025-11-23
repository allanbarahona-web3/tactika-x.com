'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  MessageSquare,
  Settings,
  ChevronRight,
  BarChart3,
} from 'lucide-react';

const menuItems = [
  {
    label: 'Conversaciones',
    href: '/tenant-admin/crm/conversations',
    icon: MessageSquare,
    badge: null,
  },
  {
    label: 'Estadísticas',
    href: '/tenant-admin/crm/stats',
    icon: BarChart3,
    badge: null,
  },
  {
    label: 'Configuración',
    href: '/tenant-admin/crm/settings',
    icon: Settings,
    badge: null,
  },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 border-r border-slate-200 bg-white overflow-y-auto flex flex-col">
      {/* Menu Items */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname.includes(item.href.split('/').pop() || '');

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-blue-50 text-blue-600'
                  : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon size={18} />
                <span>{item.label}</span>
              </div>
              {item.badge && (
                <span className="inline-flex items-center justify-center px-2 py-0.5 text-xs font-semibold leading-none text-white transform bg-blue-600 rounded-full">
                  {item.badge}
                </span>
              )}
              {isActive && <ChevronRight size={16} className="ml-auto" />}
            </Link>
          );
        })}
      </nav>

      {/* Footer Info */}
      <div className="px-3 py-4 border-t border-slate-200 space-y-3">
        <div className="text-xs text-slate-500 space-y-1">
          <p className="font-semibold">Canales Disponibles</p>
          <div className="flex flex-wrap gap-1">
            <span className="inline-flex items-center px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
              WhatsApp
            </span>
            <span className="inline-flex items-center px-2 py-1 text-xs font-medium bg-pink-100 text-pink-800 rounded-full">
              Instagram
            </span>
          </div>
        </div>
      </div>
    </aside>
  );
}
