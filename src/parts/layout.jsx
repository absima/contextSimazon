import React from 'react';
import { Outlet } from 'react-router-dom';
import { AuthProvider } from '../auth/useAuth';
import HeaderPart from './headerPart';
import FooterPart from './footerPart';

export default function AuthLayout() {
  return (
    <AuthProvider>
      <HeaderPart />
      <Outlet />
      <FooterPart />
    </AuthProvider>
  );
}
