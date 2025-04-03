'use client';

import { useEffect, useState } from 'react';
import { Header } from '@/components/global/Header';
import { NavBar } from '@/components/global/NavBar';
import { colors } from "@/styles/colors";
import { Trip } from '@/types/trip';
import { tripService } from '@/services/tripService';
import TrajetItem from '@/components/global/TrajetItem';
import { useRouter } from 'next/router';
import { useAuth } from '@/hooks/useAuth';

export default function Trips() {
  const [currentTrips, setCurrentTrips] = useState<Trip[]>([]);
  const [historicTrips, setHistoricTrips] = useState<Trip[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { isAuthenticated, loading: authLoading } = useAuth();

  useEffect(() => {
    if (authLoading) return;

    if (!isAuthenticated) {
      router.push('/login');
      return;
    }

    const fetchTrips = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await tripService.getMyTrips();
        
        // Tri des trajets par date (plus récent en premier)
        const sortByDate = (trips: Trip[]) => {
          return trips.sort((a, b) => {
            const dateA = new Date(a.date + " " + a.time);
            const dateB = new Date(b.date + " " + b.time);
            return dateB.getTime() - dateA.getTime();
          });
        };

        setCurrentTrips(sortByDate(response.currentTrips));
        setHistoricTrips(sortByDate(response.historicTrips));
      } catch (err) {
        if (err instanceof Error) {
          if (err.message === 'Session expirée') {
            localStorage.removeItem('token');
            router.push('/login');
          } else {
            setError(err.message);
          }
        }
      } finally {
        setLoading(false);
      }
    };

    fetchTrips();
  }, [isAuthenticated, authLoading, router]);

  if (loading || authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-4 text-gray-600">Chargement...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Réessayer
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col p-4 pb-20" style={{ backgroundColor: colors.background.page }}>
      <div className="w-full max-w-md mx-auto space-y-8">
        <Header 
          texteNormal="Mes"
          texteGras="Trajets"
        />
        
        <div className="space-y-8">
          {/* Trajets actuels */}
          <section>
            {currentTrips.length === 0 ? (
              <p style={{ color: colors.components.titre.text.highlight }}>Aucun trajet à venir</p>
            ) : (
              <div className="space-y-4">
                {currentTrips.map((trip) => (
                  <TrajetItem key={trip.id} trip={trip} />
                ))}
              </div>
            )}
          </section>

        </div>
      </div>
      <NavBar activePage="trips" />
    </div>
  );
}