import type { Metadata } from 'next';
import '@/src/styles/globals.css';

export const metadata: Metadata = {
  title: 'Storefront - Multi-Tenant eCommerce',
  description: 'Multi-tenant ecommerce platform',
};

export default function StorefrontLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // TODO: Aquí se puede envolver con TenantProvider cuando esté listo
  return <>{children}</>;
}
