import { Zap } from 'lucide-react';

interface FeaturesProps {
  language: 'es' | 'en';
}

export function Features({ language }: FeaturesProps) {
  const features =
    language === 'es'
      ? [
          { title: 'Omnicanal', desc: 'Gestiona todos tus canales desde un único panel' },
          { title: 'Inteligencia Artificial', desc: 'Respuestas automáticas y clasificación de mensajes' },
          { title: 'Reportes Avanzados', desc: 'Analítica detallada de cada canal y conversación' },
          { title: 'Automatización', desc: 'Flujos automáticos para respuestas y distribución' },
          { title: 'Equipo Colaborativo', desc: 'Asigna conversaciones y colabora en equipo' },
          { title: 'Sin Baneos', desc: 'Certificado Meta - tu cuenta está segura' },
        ]
      : [
          { title: 'Omnichannel', desc: 'Manage all your channels from a single dashboard' },
          { title: 'Artificial Intelligence', desc: 'Automatic responses and message classification' },
          { title: 'Advanced Reports', desc: 'Detailed analytics for each channel and conversation' },
          { title: 'Automation', desc: 'Automatic flows for responses and distribution' },
          { title: 'Team Collaboration', desc: 'Assign conversations and collaborate with your team' },
          { title: 'No Bans', desc: 'Meta Certified - your account is safe' },
        ];

  return (
    <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 text-center mb-16">
          {language === 'es' ? 'Por Qué Elegir Barmentech CRM' : 'Why Choose Barmentech CRM'}
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((item, idx) => (
            <div key={idx} className="bg-white p-8 rounded-xl shadow-sm hover:shadow-lg">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center mb-4">
                <Zap size={24} className="text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h3>
              <p className="text-gray-600 text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
