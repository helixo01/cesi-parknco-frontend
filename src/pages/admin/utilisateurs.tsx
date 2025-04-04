import React, { useState } from 'react';
import { colors } from '@/styles/colors';
import { Division } from '@/components/global/Division';
import { AdminHeader } from '@/components/admin/adminheader';

export default function UtilisateursPage() {
  const [activeTab, setActiveTab] = useState('utilisateurs');

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: colors.background.page }}>
      <AdminHeader 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
      />
      
      <main className="flex-grow p-6">
        <Division variant="default" className="p-6">
          <div className="flex flex-col items-center justify-center py-16">
            <h2 className="text-2xl font-bold mb-4" style={{ color: colors.text.white }}>
              Gestion des Utilisateurs
            </h2>
            <p className="text-xl mb-2" style={{ color: colors.text.white }}>
              Fonctionnalité à venir
            </p>
            <p className="text-sm opacity-70" style={{ color: colors.text.white }}>
              Cette section sera bientôt disponible
            </p>
          </div>
        </Division>
      </main>
    </div>
  );
} 