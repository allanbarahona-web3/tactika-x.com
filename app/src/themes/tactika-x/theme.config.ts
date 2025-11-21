/**
 * THEME CONFIG: TACTIKA-X / TACTICAL
 * Configuración visual y de marca para la tienda de equipamiento táctico
 */

export const tactikaXThemeConfig = {
  // Identificación
  id: 'tactika-x',
  name: 'TACTIKA-X',
  tagline: 'Equipamiento Profesional',
  
  // Branding
  logo: {
    text: 'TX',
    className: 'logo',
  },
  
  // Colores principales (CSS variables)
  colors: {
    primary: '#ff6b35',
    primaryDark: '#e55a2b',
    secondary: '#2d3436',
    accent: '#fdcb6e',
    background: '#0a0e27',
    surface: '#1a1f3a',
    text: '#ffffff',
    textSecondary: 'rgba(255, 255, 255, 0.7)',
  },
  
  // Tipografía
  fonts: {
    heading: 'Rajdhani, sans-serif',
    body: 'Inter, sans-serif',
  },
  
  // Hero section
  hero: {
    badge: '🔥 PRODUCTOS CERTIFICADOS Y LEGALES',
    title: 'Equipamiento <span>Táctico</span> y<br/>Defensa Personal Profesional',
    subtitle: 'Equípate con lo mejor en defensa no letal, equipamiento táctico y accesorios outdoor. Calidad certificada, envíos rápidos y asesoría especializada.',
    ctaPrimary: {
      text: 'Ver Catálogo',
      icon: 'fas fa-shopping-bag',
      href: '#products',
    },
    ctaSecondary: {
      text: 'Asesoría WhatsApp',
      icon: 'fab fa-whatsapp',
      href: 'https://wa.me/50612345678',
    },
  },
  
  // Features (ventajas competitivas)
  features: [
    {
      icon: '🚚',
      title: 'Envíos a Todo el País',
      description: 'Entrega rápida y segura. Recibe tu pedido en 48-72 horas.',
    },
    {
      icon: '✅',
      title: 'Productos Certificados',
      description: 'Todo nuestro inventario cumple con normativas legales y de calidad.',
    },
    {
      icon: '🔒',
      title: 'Compra Segura',
      description: 'Pasarelas de pago verificadas. Tu información está protegida.',
    },
    {
      icon: '💬',
      title: 'Asesoría Experta',
      description: 'Nuestro equipo te ayuda a elegir el equipo ideal para ti.',
    },
  ],
  
  // Contacto
  contact: {
    phone: '+506 1234-5678',
    email: 'info@tactikax.com',
    whatsapp: '+50612345678',
    address: 'San José, Costa Rica',
  },
  
  // Redes sociales
  social: {
    facebook: '#',
    instagram: '#',
    whatsapp: 'https://wa.me/50612345678',
    tiktok: '#',
  },
  
  // Footer
  footer: {
    description: 'Tu tienda de confianza para equipamiento táctico y defensa personal. Calidad garantizada y servicio profesional.',
    copyright: '© 2025 TACTIKA-X. Todos los derechos reservados. | Barmentech Web Developer',
  },
} as const;

export type TactikaXThemeConfig = typeof tactikaXThemeConfig;
