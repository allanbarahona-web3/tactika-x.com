'use client';

import { MessageCircle } from 'lucide-react';

export function Header() {
  return (
    <header className="border-b border-slate-200 bg-white sticky top-0 z-10 h-16">
      <div className="h-full px-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg">
            <MessageCircle size={20} className="text-white" />
          </div>
          <div>
            <h1 className="text-lg font-semibold text-slate-900">CRM</h1>
            <p className="text-xs text-slate-500">Multi-channel messaging</p>
          </div>
        </div>

        {/* Right side - could add notifications, user menu, etc */}
        <div className="flex items-center gap-4">
          {/* Placeholder for future additions */}
        </div>
      </div>
    </header>
  );
}
