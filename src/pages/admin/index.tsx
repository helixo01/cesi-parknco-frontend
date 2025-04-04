import React, { useState } from 'react';
import { colors } from '@/styles/colors';
import { Division } from '@/components/global/Division';
import { AdminHeader } from '@/components/admin/adminheader';
import { StatCard } from '@/components/admin/StatCard';

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState('');

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: colors.background.page }}>
      <AdminHeader 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
      />
      
      <main className="flex-grow p-6">
        <Division variant="default" className="p-6">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-3" style={{ color: colors.text.white }}>
              Bienvenue dans le centre d'administration Park'nCo
            </h1>
            <p className="text-lg" style={{ color: colors.text.white, opacity: 0.9 }}>
              Espace réservé à l'animateur vie de campus et au service technique
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="p-6 rounded-lg border border-opacity-20" style={{ 
              backgroundColor: colors.background.default,
              borderColor: colors.primary.light
            }}>
              <h2 className="text-xl font-bold mb-4" style={{ color: colors.text.white }}>
                Animateur vie de Campus
              </h2>
              <p className="mb-4" style={{ color: colors.text.white }}>
                Accédez aux statistiques globales, gérez la gamification et suivez l'utilisation de la plateforme.
              </p>
              <div className="flex space-x-3">
                <AdminActionButton 
                  text="Voir les statistiques" 
                  onClick={() => {
                    setActiveTab('stats');
                    window.location.href = '/admin/stats';
                  }}
                />
                <AdminActionButton 
                  text="Gérer la gamification" 
                  onClick={() => {
                    setActiveTab('gamification');
                    window.location.href = '/admin/gamification';
                  }}
                />
              </div>
            </div>
            
            <div className="p-6 rounded-lg border border-opacity-20" style={{ 
              backgroundColor: colors.background.default,
              borderColor: colors.primary.light
            }}>
              <h2 className="text-xl font-bold mb-4" style={{ color: colors.text.white }}>
                Service technique
              </h2>
              <p className="mb-4" style={{ color: colors.text.white }}>
                Consultez l'état du parking en temps réel, surveillez les capteurs et gérez l'intégration IoT.
              </p>
              <div className="flex space-x-3">
                <AdminActionButton 
                  text="Dashboard Grafana" 
                  onClick={() => {
                    window.open('https://grafana.com/auth/sign-in/', '_blank');
                  }}
                />
                <AdminActionButton 
                  text="État du parking" 
                  onClick={() => {
                    setActiveTab('stats');
                    window.location.href = '/admin/stats';
                  }}
                />
              </div>
            </div>
          </div>
          
          <div className="bg-opacity-10 bg-white p-6 rounded-lg">
            <h2 className="text-2xl font-bold mb-4" style={{ color: colors.text.white }}>
              Aperçu rapide
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatCard 
                title="Utilisateurs actifs" 
                value="124"
                icon="👥"
                color={colors.primary.light}
              />
              <StatCard 
                title="Trajets aujourd'hui" 
                value="48"
                icon="🚗"
                color={colors.primary.main}
              />
              <StatCard 
                title="Occupation parking" 
                value="78%"
                icon="🅿️"
                color="#FFC107"
              />
              <StatCard 
                title="CO2 économisé" 
                value="2.3 tonnes"
                icon="🌿"
                color={colors.state.success}
              />
            </div>
          </div>
        </Division>
      </main>
    </div>
  );
}

// Composant bouton pour les actions d'administration
const AdminActionButton: React.FC<{
  text: string;
  onClick: () => void;
}> = ({ text, onClick }) => {
  return (
    <button
      className="px-4 py-2 rounded font-medium text-sm transition-all hover:bg-opacity-90"
      style={{ backgroundColor: colors.primary.main, color: '#FFFFFF' }}
      onClick={onClick}
    >
      {text}
    </button>
  );
}; 