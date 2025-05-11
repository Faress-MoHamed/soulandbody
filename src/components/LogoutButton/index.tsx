// components/LogoutButton.tsx
'use client';

import React, { useTransition } from 'react';
import { LogOut } from 'lucide-react';
import { logout } from '@/app/actions/logout';

export default function LogoutButton() {
  const [isPending, startTransition] = useTransition();

  const handleLogout = () => {
    startTransition(() => {
      logout();
    });
  };

  return (
    <button onClick={handleLogout} disabled={isPending}>
      <LogOut size={24} className="font-bold" />
      {isPending && <span>Logging out...</span>}
    </button>
  );
}
