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
    <section id="channels" className="py-8 sm:py-12 md:py-16 lg:py-20 px-3 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 text-center mb-2 sm:mb-3 md:mb-4">
          {language === 'es' ? 'Canales Soportados' : 'Supported Channels'}
        </h2>
        <p className="text-gray-600 text-xs sm:text-base md:text-lg text-center mb-8 sm:mb-12 md:mb-16">
          {language === 'es' ? 'Conecta todos tus canales favoritos en minutos' : 'Connect all your favorite channels in minutes'}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {channels.map((channel, idx) => {
            const Icon = channel.icon;
            return (
              <div key={idx} className={`${channel.bg} p-4 sm:p-6 md:p-8 rounded-xl border border-gray-200 hover:border-gray-300 transition`}>
                <Icon size={32} className={`${channel.color} mb-3 sm:mb-4 sm:w-10 sm:h-10`} />
                <h3 className="text-base sm:text-xl font-semibold text-gray-900">{channel.name}</h3>
                <p className="text-gray-600 text-xs sm:text-sm mt-2">
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
