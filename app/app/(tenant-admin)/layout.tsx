import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Admin Dashboard - Tenant Management',
  description: 'Manage your store products, orders, and customers',
};

export default function TenantAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
