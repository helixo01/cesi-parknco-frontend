import React, { useState, useEffect } from 'react';
import { colors } from '@/styles/colors';
import { Division } from '@/components/global/Division';
import { AdminHeader } from '@/components/admin/adminheader';
import { FilterGroup } from '@/components/admin/FilterGroup';
import { StatCard } from '@/components/admin/StatCard';
import { ParkingStats } from '@/components/admin/ParkingStats';

interface StatsData {
  kmParcourus: number;
  co2Economise: number;
  trajetsEffectues: number;
  utilisateursActifs: number;
}

export default function StatsPage() {
  const [activeTab, setActiveTab] = useState('stats');
  
  // Filtres basés sur info-perso
  const [typePromotion, setTypePromotion] = useState('');
  const [specialite, setSpecialite] = useState('');
  const [annee, setAnnee] = useState('');
  
  // Données fictives pour la démo
  const [statsData, setStatsData] = useState<StatsData>({
    kmParcourus: 15420,
    co2Economise: 2313,
    trajetsEffectues: 387,
    utilisateursActifs: 124
  });

  useEffect(() => {
    // Simuler un changement de données basé sur les filtres sélectionnés
    // Facteur de base
    let baseFactor = 1.0;
    
    // Modifier le facteur en fonction du type de promotion
    if (typePromotion === 'personnel') baseFactor *= 0.6;
    else if (typePromotion === 'master') baseFactor *= 1.1;
    else if (typePromotion === 'cpi') baseFactor *= 0.8;
    else if (typePromotion === 'fise') baseFactor *= 1.2;
    else if (typePromotion === 'fisa') baseFactor *= 0.9;
    
    // Modifier le facteur en fonction de la spécialité
    if (specialite === 'informatique') baseFactor *= 1.3;
    else if (specialite === 'btp') baseFactor *= 0.7;
    else if (specialite === 'generaliste') baseFactor *= 1.0;
    
    // Modifier le facteur en fonction de l'année
    if (annee === '1') baseFactor *= 0.6;
    else if (annee === '2') baseFactor *= 0.8;
    else if (annee === '3') baseFactor *= 1.0;
    else if (annee === '4') baseFactor *= 1.2;
    else if (annee === '5') baseFactor *= 1.4;
    
    // Si tous les filtres sont vides, utiliser les valeurs par défaut
    if (!typePromotion && !specialite && !annee) {
      setStatsData({
        kmParcourus: 15420,
        co2Economise: 2313,
        trajetsEffectues: 387,
        utilisateursActifs: 124
      });
    } else {
      // Appliquer le facteur combiné
      setStatsData({
        kmParcourus: Math.round(15420 * baseFactor),
        co2Economise: Math.round(2313 * baseFactor),
        trajetsEffectues: Math.round(387 * baseFactor),
        utilisateursActifs: Math.round(124 * baseFactor)
      });
    }
  }, [typePromotion, specialite, annee]);

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: colors.background.page }}>
      <AdminHeader 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
      />
      
      <main className="flex-grow p-6">
        <Division variant="default" className="p-6">
          <h2 className="text-2xl font-bold mb-4" style={{ color: colors.text.white }}>
            Statistiques de l'Application
          </h2>
          <p className="mb-8" style={{ color: colors.text.white }}>
            Consultez les performances et l'utilisation de la plateforme par catégorie d'utilisateurs.
          </p>
          
          {/* Filtres */}
          <FilterGroup 
            typePromotion={typePromotion}
            setTypePromotion={setTypePromotion}
            specialite={specialite}
            setSpecialite={setSpecialite}
            annee={annee}
            setAnnee={setAnnee}
          />
          
          {/* Statistiques principales */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatCard 
              title="Kilomètres parcourus" 
              value={`${statsData.kmParcourus.toLocaleString()} km`}
              icon="🚗"
              color={colors.primary.main}
            />
            <StatCard 
              title="CO2 économisé" 
              value={`${statsData.co2Economise.toLocaleString()} kg`}
              icon="🌿"
              color={colors.state.success}
            />
            <StatCard 
              title="Trajets effectués" 
              value={statsData.trajetsEffectues.toLocaleString()}
              icon="🛣️"
              color={colors.primary.light}
            />
            <StatCard 
              title="Utilisateurs actifs" 
              value={statsData.utilisateursActifs.toLocaleString()}
              icon="👥"
              color="#5E72E4"
            />
          </div>
          
          {/* Informations supplémentaires */}
          <div className="bg-opacity-10 bg-white p-4 rounded-lg mb-6">
            <h3 className="text-lg font-semibold mb-2" style={{ color: colors.text.white }}>
              Filtrage des données
            </h3>
            <p style={{ color: colors.text.white }}>
              Ces statistiques sont filtrées par :
              {typePromotion ? <span className="font-semibold"> Type: {typePromotion}</span> : " Tous les types"}
              {specialite ? <span className="font-semibold">, Spécialité: {specialite}</span> : ""}
              {annee ? <span className="font-semibold">, Année: {annee}</span> : ""}
            </p>
          </div>
          
          {/* Statistiques d'usage du parking */}
          <ParkingStats 
            occupancyRate={78}
            availableSpots={24}
            peakHours="8h30 - 9h00"
          />
        </Division>
      </main>
    </div>
  );
} 