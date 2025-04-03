'use client';

import { Header } from '@/components/global/Header';
import { colors } from "@/styles/colors";
import { useRouter } from 'next/router';
import { useAuth } from '@/hooks/useAuth';

export default function SearchTrip() {
  const router = useRouter();
  const { isAuthenticated, loading: authLoading } = useAuth();

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-4 text-gray-600">Chargement...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    router.push('/login');
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col p-4 pb-20" style={{ backgroundColor: colors.background.page }}>
      <div className="w-full max-w-md mx-auto space-y-8">
        <Header 
          texteNormal="Recherche d'un"
          texteGras="trajet"
        />
        
        {/* Contenu de la page de recherche à venir */}
        <div className="space-y-4">
          
        </div>
      </div>
    </div>
  );
} 