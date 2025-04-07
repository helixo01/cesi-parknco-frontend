import React, { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/router';
import { DesktopHeader } from '@/components/admin/DesktopHeader';
import { colors } from '@/styles/colors';
import { toast } from 'react-hot-toast';
import { getGamificationConfig, updateGamificationConfig, GamificationConfig } from '@/services/gamificationService';

const Gamification: React.FC = () => {
  const { user, loading, isAuthenticated } = useAuth();
  const router = useRouter();
  const [config, setConfig] = useState<GamificationConfig | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

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

  // Charger les configurations depuis l'API
  useEffect(() => {
    const loadConfig = async () => {
      setIsLoading(true);
      try {
        const data = await getGamificationConfig();
        setConfig(data);
      } catch (error) {
        console.error('Erreur lors du chargement de la configuration:', error);
        toast.error('Erreur lors du chargement de la configuration');
      } finally {
        setIsLoading(false);
      }
    };

    if (isAuthenticated && user?.role === 'admin_user') {
      loadConfig();
    }
  }, [isAuthenticated, user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!config) return;
    
    const { name, value, type, checked } = e.target;
    setConfig(prev => {
      if (!prev) return prev;
      
      // Traitement spécial pour le pourcentage
      if (name === 'bonusWeeklyPercentage') {
        // Convertir la valeur en pourcentage (0-100) en décimal (0-1) pour le stockage
        return {
          ...prev,
          [name]: Number(value) / 100
        };
      }
      
      return {
        ...prev,
        [name]: type === 'checkbox' ? checked : Number(value)
      };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!config) return;
    
    setIsSaving(true);
    try {
      await updateGamificationConfig(config);
      toast.success('Configuration sauvegardée avec succès !');
    } catch (error) {
      console.error('Erreur lors de la sauvegarde:', error);
      toast.error('Erreur lors de la sauvegarde de la configuration');
    } finally {
      setIsSaving(false);
    }
  };

  if (loading || isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center" style={{ backgroundColor: colors.background.page }}>
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 border-t-4 border-b-4 border-blue-500 rounded-full animate-spin"></div>
          <p className="text-white mt-4 text-lg">Chargement de la configuration...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated || (user && user.role !== 'admin_user') || !config) {
    return null;
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: colors.background.page }}>
      <DesktopHeader items={navigationItems} />
      <main className="max-w-7xl mx-auto py-8 sm:px-6 lg:px-8 animate-fadeIn">
        <div className="px-4 py-6 sm:px-0">
          <div className="mb-10 animate-fadeInUp">
            <h1 className="text-4xl font-bold text-white tracking-tight">Configuration de Gamification</h1>
            <p className="text-blue-300 mt-3 text-xl">Définissez les points et bonus pour motiver les utilisateurs à utiliser l'application.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-10">
            {/* Points de base */}
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-2xl shadow-xl border border-gray-700 hover:border-blue-500 transition-all duration-300 animate-fadeInUp animation-delay-200">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                <span className="bg-blue-600 p-2 rounded-lg mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </span>
                Points de base
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="group">
                  <label htmlFor="pointsPerKm" className="block text-base font-medium text-gray-300 mb-2 group-hover:text-blue-300 transition-colors">Points par km</label>
                  <div className="relative rounded-lg shadow-sm">
                    <input
                      type="number"
                      name="pointsPerKm"
                      id="pointsPerKm"
                      className="block w-full pl-4 pr-12 py-3 text-base border-gray-700 bg-gray-800 rounded-lg text-white focus:ring-blue-500 focus:border-blue-500 transition-all hover:border-blue-400"
                      value={config.pointsPerKm}
                      onChange={handleChange}
                      min="0"
                    />
                    <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                      <span className="text-gray-400 text-base">pts</span>
                    </div>
                  </div>
                </div>

                <div className="group">
                  <label htmlFor="pointsProposedTrip" className="block text-base font-medium text-gray-300 mb-2 group-hover:text-blue-300 transition-colors">Points pour proposer un trajet</label>
                  <div className="relative rounded-lg shadow-sm">
                    <input
                      type="number"
                      name="pointsProposedTrip"
                      id="pointsProposedTrip"
                      className="block w-full pl-4 pr-12 py-3 text-base border-gray-700 bg-gray-800 rounded-lg text-white focus:ring-blue-500 focus:border-blue-500 transition-all hover:border-blue-400"
                      value={config.pointsProposedTrip}
                      onChange={handleChange}
                      min="0"
                    />
                    <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                      <span className="text-gray-400 text-base">pts</span>
                    </div>
                  </div>
                </div>

                <div className="group">
                  <label htmlFor="pointsJoinTrip" className="block text-base font-medium text-gray-300 mb-2 group-hover:text-blue-300 transition-colors">Points pour rejoindre un trajet</label>
                  <div className="relative rounded-lg shadow-sm">
                    <input
                      type="number"
                      name="pointsJoinTrip"
                      id="pointsJoinTrip"
                      className="block w-full pl-4 pr-12 py-3 text-base border-gray-700 bg-gray-800 rounded-lg text-white focus:ring-blue-500 focus:border-blue-500 transition-all hover:border-blue-400"
                      value={config.pointsJoinTrip}
                      onChange={handleChange}
                      min="0"
                    />
                    <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                      <span className="text-gray-400 text-base">pts</span>
                    </div>
                  </div>
                </div>

                <div className="group">
                  <label htmlFor="pointsRating" className="block text-base font-medium text-gray-300 mb-2 group-hover:text-blue-300 transition-colors">Points pour la notation d'un trajet</label>
                  <div className="relative rounded-lg shadow-sm">
                    <input
                      type="number"
                      name="pointsRating"
                      id="pointsRating"
                      className="block w-full pl-4 pr-12 py-3 text-base border-gray-700 bg-gray-800 rounded-lg text-white focus:ring-blue-500 focus:border-blue-500 transition-all hover:border-blue-400"
                      value={config.pointsRating}
                      onChange={handleChange}
                      min="0"
                    />
                    <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                      <span className="text-gray-400 text-base">pts</span>
                    </div>
                  </div>
                </div>

                <div className="group">
                  <label htmlFor="pointsGoodRating" className="block text-base font-medium text-gray-300 mb-2 group-hover:text-blue-300 transition-colors">Points pour une bonne note (≥ 4)</label>
                  <div className="relative rounded-lg shadow-sm">
                    <input
                      type="number"
                      name="pointsGoodRating"
                      id="pointsGoodRating"
                      className="block w-full pl-4 pr-12 py-3 text-base border-gray-700 bg-gray-800 rounded-lg text-white focus:ring-blue-500 focus:border-blue-500 transition-all hover:border-blue-400"
                      value={config.pointsGoodRating}
                      onChange={handleChange}
                      min="0"
                    />
                    <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                      <span className="text-gray-400 text-base">pts</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Bonus */}
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-2xl shadow-xl border border-gray-700 hover:border-blue-500 transition-all duration-300 animate-fadeInUp animation-delay-400">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                <span className="bg-blue-600 p-2 rounded-lg mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
                  </svg>
                </span>
                Bonus et multiplicateurs
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="group">
                  <label htmlFor="bonusFullCar" className="block text-base font-medium text-gray-300 mb-2 group-hover:text-blue-300 transition-colors">Multiplicateur voiture pleine (4 passagers)</label>
                  <div className="relative rounded-lg shadow-sm">
                    <input
                      type="number"
                      name="bonusFullCar"
                      id="bonusFullCar"
                      className="block w-full pl-4 pr-12 py-3 text-base border-gray-700 bg-gray-800 rounded-lg text-white focus:ring-blue-500 focus:border-blue-500 transition-all hover:border-blue-400"
                      value={config.bonusFullCar}
                      onChange={handleChange}
                      min="1"
                      step="0.1"
                    />
                    <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                      <span className="text-gray-400 text-base">x</span>
                    </div>
                  </div>
                  <p className="mt-2 text-base text-gray-400 group-hover:text-gray-300 transition-colors">Multiplicateur appliqué aux points quand la voiture est pleine</p>
                </div>

                <div className="group">
                  <label htmlFor="bonusElectricCar" className="block text-base font-medium text-gray-300 mb-2 group-hover:text-blue-300 transition-colors">Bonus voiture électrique</label>
                  <div className="relative rounded-lg shadow-sm">
                    <input
                      type="number"
                      name="bonusElectricCar"
                      id="bonusElectricCar"
                      className="block w-full pl-4 pr-12 py-3 text-base border-gray-700 bg-gray-800 rounded-lg text-white focus:ring-blue-500 focus:border-blue-500 transition-all hover:border-blue-400"
                      value={config.bonusElectricCar}
                      onChange={handleChange}
                      min="0"
                    />
                    <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                      <span className="text-gray-400 text-base">pts</span>
                    </div>
                  </div>
                  <p className="mt-2 text-base text-gray-400 group-hover:text-gray-300 transition-colors">Points supplémentaires par trajet en voiture électrique</p>
                </div>

                <div className="md:col-span-2 bg-gray-900 p-6 rounded-xl border border-gray-700">
                  <div className="flex items-start">
                    <div className="flex items-center h-6">
                      <input
                        id="bonusWeeklyActive"
                        name="bonusWeeklyActive"
                        type="checkbox"
                        className="h-5 w-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500 cursor-pointer"
                        checked={config.bonusWeeklyActive}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="ml-3 text-base">
                      <label htmlFor="bonusWeeklyActive" className="font-medium text-blue-300 cursor-pointer">Activer le bonus hebdomadaire</label>
                      <p className="text-gray-400">Bonus de points pour les utilisateurs actifs chaque semaine</p>
                    </div>
                  </div>

                  {config.bonusWeeklyActive && (
                    <div className="mt-6 grid grid-cols-1 gap-6 animate-fadeIn">
                      <div className="group">
                        <label htmlFor="bonusWeeklyPercentage" className="block text-base font-medium text-gray-300 mb-2 group-hover:text-blue-300 transition-colors">Pourcentage du bonus</label>
                        <div className="relative rounded-lg shadow-sm">
                          <input
                            type="number"
                            name="bonusWeeklyPercentage"
                            id="bonusWeeklyPercentage"
                            className="block w-full pl-4 pr-12 py-3 text-base border-gray-700 bg-gray-800 rounded-lg text-white focus:ring-blue-500 focus:border-blue-500 transition-all hover:border-blue-400"
                            value={Math.round(config.bonusWeeklyPercentage * 100)}
                            onChange={handleChange}
                            min="0"
                            max="100"
                            step="1"
                          />
                          <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                            <span className="text-gray-400 text-base">%</span>
                          </div>
                        </div>
                        <p className="mt-2 text-base text-gray-400 group-hover:text-gray-300 transition-colors">Pourcentage appliqué aux points hebdomadaires</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="flex justify-end animate-fadeInUp animation-delay-600">
              <button
                type="submit"
                disabled={isSaving}
                className={`inline-flex justify-center items-center py-3 px-8 border border-transparent shadow-lg text-base font-medium rounded-lg text-white bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300 ${isSaving ? 'opacity-70 cursor-not-allowed' : ''}`}
              >
                {isSaving ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Sauvegarde...
                  </>
                ) : (
                  'Sauvegarder'
                )}
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default Gamification; 