import {
  MessageCircle,
  Instagram,
  Facebook,
  Mail,
  Send,
  TrendingUp,
} from 'lucide-react';

interface ChannelsProps {
  language: 'es' | 'en';
}

export function Channels({ language }: ChannelsProps) {
  const channels = [
    { name: 'WhatsApp', icon: MessageCircle, color: 'text-green-500', bg: 'bg-green-50' },
    { name: 'Instagram', icon: Instagram, color: 'text-pink-500', bg: 'bg-pink-50' },
    { name: 'Facebook', icon: Facebook, color: 'text-blue-600', bg: 'bg-blue-50' },
    { name: 'Telegram', icon: Send, color: 'text-blue-500', bg: 'bg-blue-50' },
    { name: 'TikTok', icon: TrendingUp, color: 'text-black', bg: 'bg-gray-50' },
    { name: 'Email', icon: Mail, color: 'text-gray-700', bg: 'bg-gray-50' },
  ];

  return (
    <section id="channels" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 text-center mb-4">
          {language === 'es' ? 'Canales Soportados' : 'Supported Channels'}
        </h2>
        <p className="text-gray-600 text-lg text-center mb-16">
          {language === 'es' ? 'Conecta todos tus canales favoritos en minutos' : 'Connect all your favorite channels in minutes'}
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {channels.map((channel, idx) => {
            const Icon = channel.icon;
            return (
              <div key={idx} className={`${channel.bg} p-8 rounded-xl border border-gray-200 hover:border-gray-300`}>
                <Icon size={40} className={`${channel.color} mb-4`} />
                <h3 className="text-xl font-semibold text-gray-900">{channel.name}</h3>
                <p className="text-gray-600 text-sm mt-2">
                  {language === 'es' ? 'Conecta en segundos' : 'Connect in seconds'}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
