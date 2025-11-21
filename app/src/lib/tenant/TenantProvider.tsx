'use client';

import { createContext, useContext, ReactNode } from 'react';
import { TenantInfo } from './resolveTenant';

interface TenantContextType {
  tenant: TenantInfo | null;
  theme: 'tactika-x' | 'farmacia' | 'zapateria' | 'barmentech' | 'store';
}

const TenantContext = createContext<TenantContextType | undefined>(undefined);

interface TenantProviderProps {
  tenant: TenantInfo | null;
  children: ReactNode;
}

export function TenantProvider({ tenant, children }: TenantProviderProps) {
  const theme = tenant?.theme || 'tactika-x';

  return (
    <TenantContext.Provider value={{ tenant, theme }}>
      {children}
    </TenantContext.Provider>
  );
}

export function useTenant() {
  const context = useContext(TenantContext);
  if (context === undefined) {
    throw new Error('useTenant must be used within a TenantProvider');
  }
  return context;
}
