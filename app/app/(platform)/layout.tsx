import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'TactikaX Platform - Multi-Tenant eCommerce SaaS',
  description: 'Launch your online store in minutes with our multi-tenant eCommerce platform',
};

export default function PlatformLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="platform-wrapper">{children}</div>;
}
