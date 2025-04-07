import React, { useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/router';
import { DesktopHeader } from '@/components/admin/DesktopHeader';
import { colors } from '@/styles/colors';
import { Montserrat } from 'next/font/google';

const montserrat = Montserrat({ subsets: ['latin'] });

const Statistics: React.FC = () => {
  const { user, loading, isAuthenticated } = useAuth();
  const router = useRouter();

  const navigationItems = [
    { label: 'Statistiques', path: '/admin/statistiques' },
    { label: 'Gamification', path: '/admin/gamification' },
    { 
      label: 'Parking IoT',
      path: 'https://parknco.grafana.net/public-dashboards/4c57922c82824de7b252ecd35bb5cfc8',
      isExternal: true
    },
    { label: 'Utilisateurs', path: '/admin/users' }
  ];

  useEffect(() => {
    if (!loading) {
      if (!isAuthenticated) {
        router.replace('/login');
      } else if (user && user.role !== 'admin_user') {
        router.replace('/');
      }
    }
  }, [loading, isAuthenticated, user, router]);

  if (loading) {
    return (
      <div className={`flex min-h-screen items-center justify-center ${montserrat.className}`} style={{ backgroundColor: colors.background.page }}>
        <p className="text-white text-2xl font-semibold">Chargement...</p>
      </div>
    );
  }

  if (!isAuthenticated || (user && user.role !== 'admin_user')) {
    return null;
  }

  return (
    <div className={`min-h-screen ${montserrat.className}`} style={{ backgroundColor: colors.background.page }}>
      <DesktopHeader items={navigationItems} />
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          {/* Contenu de la page de statistiques sera ajouté ici */}
        </div>
      </main>
    </div>
  );
};

export default Statistics; 