'use client';

import { useState } from 'react';
import { ChannelType } from '@/types/crm';
import { Settings, Save, AlertCircle } from 'lucide-react';

const channels = [
  {
    name: ChannelType.WHATSAPP,
    label: '💬 WhatsApp',
    description: 'Integración con WhatsApp Business API (Twilio)',
    fields: ['apiKey', 'phoneNumber', 'webhookUrl'],
  },
  {
    name: ChannelType.INSTAGRAM,
    label: '📷 Instagram',
    description: 'Integración con Instagram Direct Messages (Meta)',
    fields: ['apiKey'],
  },
  {
    name: ChannelType.FACEBOOK,
    label: '👥 Facebook',
    description: 'Integración con Facebook Messenger',
    fields: ['apiKey'],
    disabled: true,
  },
  {
    name: ChannelType.TELEGRAM,
    label: '✈️ Telegram',
    description: 'Integración con Telegram Bot API',
    fields: ['apiKey'],
    disabled: true,
  },
];

export default function CrmSettingsPage() {
  const [activeTab, setActiveTab] = useState(ChannelType.WHATSAPP);
  const [credentials, setCredentials] = useState<Record<string, any>>({});
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleSave = async (channel: ChannelType) => {
    try {
      setIsSaving(true);
      // TODO: Call API to save credentials
      console.log('Saving credentials for', channel, credentials);
      setMessage({ type: 'success', text: `${channel} configurado exitosamente` });
      setTimeout(() => setMessage(null), 3000);
    } catch (error) {
      setMessage({ type: 'error', text: 'Error al guardar la configuración' });
    } finally {
      setIsSaving(false);
    }
  };

  const activeChannel = channels.find((c) => c.name === activeTab);

  return (
    <div className="h-full flex flex-col bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <div className="border-b border-slate-200 bg-white p-6 sticky top-0 z-10">
        <div className="flex items-center gap-3 mb-2">
          <Settings size={28} className="text-blue-600" />
          <h1 className="text-2xl font-bold text-slate-900">Configuración de Canales</h1>
        </div>
        <p className="text-slate-600">Conecta tus canales de comunicación</p>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar - Channels */}
        <div className="w-64 border-r border-slate-200 bg-white overflow-y-auto">
          <div className="p-4 space-y-2">
            {channels.map((channel) => (
              <button
                key={channel.name}
                onClick={() => !channel.disabled && setActiveTab(channel.name as ChannelType)}
                disabled={channel.disabled}
                className={`w-full text-left px-4 py-3 rounded-lg font-medium transition-colors ${
                  activeTab === channel.name
                    ? 'bg-blue-100 text-blue-900 border-l-4 border-blue-600'
                    : 'text-slate-700 hover:bg-slate-100'
                } ${channel.disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                <div className="flex items-center justify-between">
                  <span>{channel.label}</span>
                  {channel.disabled && <span className="text-xs bg-slate-200 px-2 py-1 rounded">Pronto</span>}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="max-w-2xl mx-auto p-8">
            {activeChannel && (
              <>
                {/* Channel Header */}
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-slate-900 mb-2">{activeChannel.label}</h2>
                  <p className="text-slate-600">{activeChannel.description}</p>
                </div>

                {/* Message Alert */}
                {message && (
                  <div
                    className={`mb-6 p-4 rounded-lg flex items-center gap-3 ${
                      message.type === 'success'
                        ? 'bg-green-50 border border-green-200'
                        : 'bg-red-50 border border-red-200'
                    }`}
                  >
                    <AlertCircle
                      size={20}
                      className={message.type === 'success' ? 'text-green-600' : 'text-red-600'}
                    />
                    <span className={message.type === 'success' ? 'text-green-800' : 'text-red-800'}>
                      {message.text}
                    </span>
                  </div>
                )}

                {/* Form */}
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSave(activeChannel.name as ChannelType);
                  }}
                  className="space-y-6 bg-white rounded-lg p-6 border border-slate-200"
                >
                  {activeChannel.fields.map((field) => (
                    <div key={field}>
                      <label className="block text-sm font-medium text-slate-900 mb-2 capitalize">
                        {field.replace(/([A-Z])/g, ' $1').trim()}
                      </label>
                      <input
                        type={field.includes('Password') || field.includes('Secret') ? 'password' : 'text'}
                        placeholder={`Ingresa tu ${field}`}
                        value={credentials[field] || ''}
                        onChange={(e) =>
                          setCredentials({
                            ...credentials,
                            [field]: e.target.value,
                          })
                        }
                        className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                      <p className="text-xs text-slate-500 mt-1">
                        Mantén esta información segura y confidencial
                      </p>
                    </div>
                  ))}

                  {/* Submit Button */}
                  <div className="flex gap-3">
                    <button
                      type="submit"
                      disabled={isSaving}
                      className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:bg-slate-400"
                    >
                      <Save size={18} />
                      {isSaving ? 'Guardando...' : 'Guardar Configuración'}
                    </button>
                  </div>
                </form>

                {/* Info Box */}
                <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <h3 className="font-semibold text-blue-900 mb-2">¿Cómo obtener credenciales?</h3>
                  <p className="text-sm text-blue-800 mb-3">
                    {activeChannel.name === ChannelType.WHATSAPP && (
                      <>
                        Para WhatsApp, necesitas:
                        <ol className="list-decimal list-inside mt-2 space-y-1">
                          <li>Una cuenta Twilio verificada</li>
                          <li>Una llave de API de Twilio</li>
                          <li>Tu número de teléfono de WhatsApp Business</li>
                        </ol>
                        <a
                          href="https://www.twilio.com"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline mt-2 inline-block"
                        >
                          Ir a Twilio →
                        </a>
                      </>
                    )}
                    {activeChannel.name === ChannelType.INSTAGRAM && (
                      <>
                        Para Instagram, necesitas:
                        <ol className="list-decimal list-inside mt-2 space-y-1">
                          <li>Una cuenta de Meta Business</li>
                          <li>Un token de acceso de la API Graph de Meta</li>
                        </ol>
                        <a
                          href="https://developers.facebook.com"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline mt-2 inline-block"
                        >
                          Ir a Meta Developers →
                        </a>
                      </>
                    )}
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
