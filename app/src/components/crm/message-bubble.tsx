'use client';

import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { Message, MessageDirection } from '@/types/crm';
import { CheckCheck, Clock } from 'lucide-react';

interface MessageBubbleProps {
  message: Message;
}

export function MessageBubble({ message }: MessageBubbleProps) {
  const isOutbound = message.direction === MessageDirection.OUTBOUND;

  const statusIcon = {
    pending: <Clock size={14} className="text-slate-400" />,
    sent: <CheckCheck size={14} className="text-slate-400" />,
    delivered: <CheckCheck size={14} className="text-blue-500" />,
    read: <CheckCheck size={14} className="text-blue-600" />,
    failed: <span className="text-red-500 text-xs">✗</span>,
  };

  return (
    <div className={`flex ${isOutbound ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg space-y-1 ${
          isOutbound
            ? 'bg-blue-500 text-white rounded-br-none'
            : 'bg-slate-100 text-slate-900 rounded-bl-none'
        }`}
      >
        {/* Content */}
        <p className="text-sm leading-relaxed break-words">{message.content}</p>

        {/* Media if exists */}
        {message.mediaUrl && (
          <a
            href={message.mediaUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-block mt-2 text-xs underline ${
              isOutbound ? 'text-blue-100' : 'text-blue-600'
            }`}
          >
            📎 Ver archivo
          </a>
        )}

        {/* Footer */}
        <div className={`flex items-center gap-1 text-xs ${
          isOutbound ? 'text-blue-100' : 'text-slate-500'
        }`}>
          <span>{format(new Date(message.createdAt), 'HH:mm', { locale: es })}</span>
          {isOutbound && statusIcon[message.status as keyof typeof statusIcon]}
        </div>
      </div>
    </div>
  );
}
