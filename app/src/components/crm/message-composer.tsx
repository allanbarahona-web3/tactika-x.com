'use client';

import { useState, useRef } from 'react';
import { Send, Paperclip, Loader } from 'lucide-react';

interface MessageComposerProps {
  onSend: (content: string, mediaUrl?: string) => Promise<void>;
  isLoading?: boolean;
  disabled?: boolean;
}

export function MessageComposer({ onSend, isLoading, disabled }: MessageComposerProps) {
  const [content, setContent] = useState('');
  const [isComposing, setIsComposing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSend = async () => {
    if (!content.trim() || isLoading) return;

    try {
      setIsComposing(true);
      await onSend(content.trim());
      setContent('');
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setIsComposing(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  if (disabled) {
    return (
      <div className="border-t border-slate-200 p-4 bg-slate-50">
        <div className="text-center py-2">
          <p className="text-sm text-slate-500">Esta conversación está inactiva</p>
        </div>
      </div>
    );
  }

  return (
    <div className="border-t border-slate-200 p-4 bg-white">
      <div className="flex items-end gap-3">
        {/* File input */}
        <input
          ref={fileInputRef}
          type="file"
          className="hidden"
          onChange={(e) => {
            // TODO: Implementar upload de archivos
            console.log('File selected:', e.target.files?.[0]);
          }}
        />

        {/* Attachment button */}
        <button
          onClick={() => fileInputRef.current?.click()}
          disabled={isLoading}
          className="p-2 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors disabled:opacity-50"
          title="Adjuntar archivo"
        >
          <Paperclip size={20} />
        </button>

        {/* Text input */}
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Escribe tu mensaje... (Shift+Enter para nueva línea)"
          disabled={isLoading}
          className="flex-1 px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none max-h-24 bg-slate-50"
          rows={1}
        />

        {/* Send button */}
        <button
          onClick={handleSend}
          disabled={!content.trim() || isLoading}
          className="p-2 bg-blue-500 text-white hover:bg-blue-600 rounded-lg transition-colors disabled:bg-slate-300 disabled:cursor-not-allowed flex items-center gap-2"
          title="Enviar mensaje (Enter)"
        >
          {isLoading ? (
            <Loader size={20} className="animate-spin" />
          ) : (
            <Send size={20} />
          )}
        </button>
      </div>
    </div>
  );
}
