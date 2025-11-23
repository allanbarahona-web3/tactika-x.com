'use client';

import { ChannelType } from '@/types/crm';

interface FilterBarProps {
  selectedChannel: ChannelType | null;
  onChannelChange: (channel: ChannelType | null) => void;
  isActiveOnly: boolean;
  onActiveOnlyChange: (active: boolean) => void;
}

export function FilterBar({
  selectedChannel,
  onChannelChange,
  isActiveOnly,
  onActiveOnlyChange,
}: FilterBarProps) {
  const channels = [
    { value: ChannelType.WHATSAPP, label: '📱 WhatsApp', color: 'bg-green-50 border-green-200' },
    { value: ChannelType.INSTAGRAM, label: '📷 Instagram', color: 'bg-pink-50 border-pink-200' },
    { value: ChannelType.FACEBOOK, label: '👥 Facebook', color: 'bg-blue-50 border-blue-200' },
  ];

  return (
    <div className="flex items-center gap-3 flex-wrap">
      {/* Channel Filter */}
      <div className="flex items-center gap-2">
        <span className="text-xs font-medium text-slate-600">Canal:</span>
        <button
          onClick={() => onChannelChange(null)}
          className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-colors ${
            selectedChannel === null
              ? 'bg-slate-100 border-slate-300 text-slate-900'
              : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
          }`}
        >
          Todos
        </button>
        {channels.map((channel) => (
          <button
            key={channel.value}
            onClick={() => onChannelChange(selectedChannel === channel.value ? null : channel.value)}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-colors ${
              selectedChannel === channel.value
                ? `${channel.color} text-slate-900`
                : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            {channel.label}
          </button>
        ))}
      </div>

      {/* Active Status Filter */}
      <div className="flex items-center gap-2">
        <span className="text-xs font-medium text-slate-600">Estado:</span>
        <button
          onClick={() => onActiveOnlyChange(!isActiveOnly)}
          className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-colors ${
            isActiveOnly
              ? 'bg-blue-50 border-blue-300 text-blue-900'
              : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
          }`}
        >
          {isActiveOnly ? '🟢 Activas' : '⭕ Todas'}
        </button>
      </div>
    </div>
  );
}
