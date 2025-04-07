import React, { useEffect, useState } from 'react';
import { NavBar } from '@/components/global/NavBar';
import UserPoints from '@/components/stats/UserPoints';
import { authService } from '@/services/auth';
import { useRouter } from 'next/router';
import { colors } from '@/styles/colors';
import { Header } from "@/components/global/Header";
import { Division } from "@/components/global/Division";

export default function Stats() {
  const router = useRouter();
  const [userId, setUserId] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const userData = await authService.getCurrentUser();
        if (userData && userData.id) {
          setUserId(userData.id);
        } else {
          router.push('/login');
        }
      } catch (error) {
        console.error('Erreur d\'authentification:', error);
        router.push('/login');
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [router]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen" style={{ backgroundColor: colors.background.page }}>
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col p-4 pb-20" style={{ backgroundColor: colors.background.page }}>
      <div className="w-full max-w-md mx-auto space-y-8">
        <Header 
          texteNormal="Points et" 
          texteGras="statistiques" 
        />
        
        {userId && (
          <Division className="mt-8">
            <UserPoints userId={userId} />
          </Division>
        )}
      </div>
      <NavBar activePage="profile" />
    </div>
  );
} 