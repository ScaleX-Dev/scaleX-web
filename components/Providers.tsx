"use client"
import React, { ReactNode } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { AuthProvider } from '@/lib/AuthContext';

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <HelmetProvider>
      <AuthProvider>{children}</AuthProvider>
    </HelmetProvider>
  );
}
