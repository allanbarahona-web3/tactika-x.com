import type { Metadata } from 'next';
import { ReactNode } from 'react';
import '../src/styles/tailwind.css';
import '../src/styles/globals.css';

export const metadata: Metadata = {
  title: 'Táctica-X | SaaS Multi-Tenant eCommerce',
  description: 'Platform para gestionar múltiples tiendas virtuales con dominios personalizados',
  manifest: '/manifest.json',
  themeColor: '#D4FF00',
};

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="es">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#D4FF00" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Rajdhani:wght@400;500;600;700&family=Inter:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
        />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
