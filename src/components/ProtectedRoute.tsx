'use client';

import { ReactNode } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

interface ProtectedRouteProps {
  children: ReactNode;
  requireAdmin?: boolean;
}

export default function ProtectedRoute({ children, requireAdmin = false }: ProtectedRouteProps) {
  const { user, loading, isAdmin } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (!user) router.push('/login');
      else if (requireAdmin && !isAdmin) router.push('/');
    }
  }, [user, loading, isAdmin, requireAdmin, router]);

  if (loading) {
    return (
      <div className="py-20 text-center">
        <div className="w-16 h-16 border-4 border-neon-green border-t-transparent rounded-full animate-spin mx-auto" />
      </div>
    );
  }

  if (!user) return null;
  if (requireAdmin && !isAdmin) return null;

  return <>{children}</>;
}
