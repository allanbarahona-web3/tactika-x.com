'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

// Importar componentes dinámicamente
const TactikaXPage = dynamic(() => import('@/src/themes/tactika-x/page'), {
  loading: () => <div>Loading...</div>,
});

const BarmentechPage = dynamic(() => import('@/src/themes/barmentech'), {
  loading: () => <div>Loading...</div>,
});

export default function StorefrontPage() {
  const [tenantTheme, setTenantTheme] = useState<string | null>(null);

  useEffect(() => {
    // Obtener el tenant del hostname
    const hostname = typeof window !== 'undefined' ? window.location.hostname : 'localhost';
    
    if (hostname.includes('commerce.barmentech.com') || hostname.includes('barmentech')) {
      setTenantTheme('barmentech');
    } else if (hostname.includes('store.barmentech.com')) {
      setTenantTheme('store');
    } else {
      setTenantTheme('tactika-x'); // Default
    }
  }, []);

  if (!tenantTheme) {
    return <div>Loading...</div>;
  }

  // Renderizar el componente del tenant correspondiente
  if (tenantTheme === 'barmentech') {
    return <BarmentechPage />;
  }

  if (tenantTheme === 'store') {
    return <div>Store tenant coming soon...</div>;
  }

  // Default: TACTIKA-X
  return <TactikaXPage />;
}
