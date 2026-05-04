'use client';

import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import LoadingSpinner from './LoadingSpinner';
import { useEffect } from 'react';

export default function ProtectedRoute({
  children,
  requireAdmin = false,
}: {
  children: React.ReactNode;
  requireAdmin?: boolean;
}) {
  const { user, loading, isAdmin } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (!user) router.push('/login');
      else if (requireAdmin && !isAdmin) router.push('/');
    }
  }, [user, loading, isAdmin, requireAdmin, router]);

  if (loading) return <LoadingSpinner />;
  if (!user) return null;
  if (requireAdmin && !isAdmin) return null;

  return <>{children}</>;
}
