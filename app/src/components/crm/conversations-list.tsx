'use client';

import Link from 'next/link';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { Conversation } from '@/types/crm';
import { MessageCircle, User } from 'lucide-react';

interface ConversationsListProps {
  conversations: Conversation[];
  isLoading: boolean;
}

const channelEmoji: Record<string, string> = {
  whatsapp: '💬',
  instagram: '📷',
  facebook: '👥',
  telegram: '✈️',
  tiktok: '🎵',
  sms: '📲',
  email: '📧',
};

export function ConversationsList({ conversations, isLoading }: ConversationsListProps) {
  if (isLoading) {
    return (
      <div className="p-6 space-y-4">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="animate-pulse">
            <div className="flex items-center gap-4 p-4 rounded-lg bg-slate-100 h-20" />
          </div>
        ))}
      </div>
    );
  }

  if (conversations.length === 0) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center space-y-3">
          <MessageCircle size={48} className="mx-auto text-slate-300" />
          <h3 className="text-lg font-medium text-slate-900">No hay conversaciones</h3>
          <p className="text-sm text-slate-500">
            Las conversaciones aparecerán aquí cuando recibas mensajes
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="divide-y divide-slate-200">
      {conversations.map((conversation) => (
        <Link
          key={conversation.id}
          href={`/crm/conversations/${conversation.id}`}
          className="block hover:bg-slate-50 transition-colors group"
        >
          <div className="px-6 py-4 flex items-center justify-between">
            {/* Left - Avatar and info */}
            <div className="flex items-center gap-4 flex-1 min-w-0">
              {/* Avatar */}
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white font-semibold">
                {(conversation.channelUsername || conversation.customer?.name || 'U').charAt(0).toUpperCase()}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-slate-900 truncate">
                    {conversation.channelUsername || conversation.customer?.name || conversation.channelUserId}
                  </span>
                  <span className="text-lg">
                    {channelEmoji[conversation.channel.toLowerCase()] || '💬'}
                  </span>
                  {!conversation.isActive && (
                    <span className="text-xs px-2 py-0.5 bg-slate-200 text-slate-700 rounded-full">
                      Inactiva
                    </span>
                  )}
                </div>
                <p className="text-sm text-slate-600 truncate mt-1">
                  {conversation.lastMessage?.content || 'Sin mensajes'}
                </p>
              </div>
            </div>

            {/* Right - Last message time */}
            <div className="flex-shrink-0 ml-4 text-right">
              <p className="text-xs text-slate-500">
                {conversation.lastMessageAt
                  ? format(new Date(conversation.lastMessageAt), 'p', { locale: es })
                  : 'Hace poco'}
              </p>
              <p className="text-xs text-slate-400 mt-1">
                {conversation.customer?.email && (
                  <span className="inline-flex items-center gap-1">
                    <User size={12} />
                    {conversation.customer.email}
                  </span>
                )}
              </p>
            </div>

            {/* Hover indicator */}
            <div className="ml-4 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
              <svg
                className="w-5 h-5 text-slate-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
