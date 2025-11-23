'use client';

import { useState, useEffect, useRef } from 'react';
import { useParams } from 'next/navigation';
import { useApi } from '@/src/lib/api';
import { ConversationDetail } from '@/types/crm';
import { MessageBubble } from '@/src/components/crm/message-bubble';
import { MessageComposer } from '@/src/components/crm/message-composer';
import { Loader } from 'lucide-react';

export default function ConversationDetailPage() {
  const params = useParams();
  const conversationId = params.id as string;
  const { get, post } = useApi();

  const [conversation, setConversation] = useState<ConversationDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSending, setIsSending] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to latest message
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [conversation?.messages]);

  // Fetch conversation details
  useEffect(() => {
    const fetchConversation = async () => {
      try {
        setIsLoading(true);
        const data = await get(`/crm/conversations/${conversationId}?limit=100&offset=0`);
        setConversation(data);
      } catch (error) {
        console.error('Error fetching conversation:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (conversationId) {
      fetchConversation();
    }
  }, [conversationId, get]);

  const handleSendMessage = async (content: string, mediaUrl?: string) => {
    if (!conversation) return;

    try {
      setIsSending(true);
      const newMessage = await post(`/crm/conversations/${conversationId}/messages`, {
        content,
        mediaUrl,
      });

      // Agregar el nuevo mensaje a la conversación
      setConversation({
        ...conversation,
        messages: [...(conversation.messages || []), newMessage],
        lastMessageAt: new Date(),
      });
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setIsSending(false);
    }
  };

  if (isLoading) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-center">
          <Loader className="mx-auto animate-spin text-blue-500 mb-4" size={40} />
          <p className="text-slate-600">Cargando conversación...</p>
        </div>
      </div>
    );
  }

  if (!conversation) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-center">
          <p className="text-lg text-slate-600">Conversación no encontrada</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col bg-white">
      {/* Header */}
      <div className="border-b border-slate-200 p-4 flex items-center justify-between bg-gradient-to-r from-slate-50 to-white">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">
            {conversation.channelUsername || conversation.customer?.name || conversation.channelUserId}
          </h2>
          <p className="text-sm text-slate-500">
            {conversation.channel} • {conversation.isActive ? '🟢 Activa' : '⭕ Inactiva'}
          </p>
        </div>
        {conversation.customer && (
          <div className="text-right">
            <p className="text-sm font-medium text-slate-900">{conversation.customer.name}</p>
            <p className="text-xs text-slate-500">{conversation.customer.email}</p>
          </div>
        )}
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {conversation.messages && conversation.messages.length > 0 ? (
          <>
            {conversation.messages.map((message) => (
              <MessageBubble key={message.id} message={message} />
            ))}
            <div ref={messagesEndRef} />
          </>
        ) : (
          <div className="flex items-center justify-center h-full">
            <p className="text-slate-500">No hay mensajes aún</p>
          </div>
        )}
      </div>

      {/* Message Composer */}
      <MessageComposer
        onSend={handleSendMessage}
        isLoading={isSending}
        disabled={!conversation.isActive}
      />
    </div>
  );
}
