'use client';

import { ReactNode } from 'react';
import { Sidebar } from '@/src/components/crm/sidebar';
import { Header } from '@/src/components/crm/header';

export default function CrmLayout({ children }: { children: ReactNode }) {
  return (
    <div className="h-screen flex flex-col bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar Navigation */}
        <Sidebar />

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto">
          <div className="h-full">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
