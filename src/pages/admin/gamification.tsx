import React, { useState } from 'react';
import { colors } from '@/styles/colors';
import { Division } from '@/components/global/Division';
import { AdminHeader } from '@/components/admin/adminheader';
import { FormInput } from '@/components/global/TextInput';
import { Button } from '@/components/global/Button';

export default function GamificationPage() {
  const [activeTab, setActiveTab] = useState('gamification');
  
  // Paramètres de gamification
  const [pointsPerKm, setPointsPerKm] = useState('5');
  const [pointsPerMinute, setPointsPerMinute] = useState('2');
  const [pointsPerTrip, setPointsPerTrip] = useState('10');
  const [pointsPerWeek, setPointsPerWeek] = useState('50');
  
  // Points bonus
  const [electricVehicleBonus, setElectricVehicleBonus] = useState('15');
  const [fullCarBonus, setFullCarBonus] = useState('20');
  const [peakHoursBonus, setPeakHoursBonus] = useState('25');
  
  // Statut du parking
  const [parkingFullBonus, setParkingFullBonus] = useState('30');

  const handleSave = () => {
    alert('Paramètres de gamification sauvegardés avec succès!');
  };

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: colors.background.page }}>
      <AdminHeader 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
      />
      
      <main className="flex-grow p-6">
        <Division variant="default" className="p-6">
          <h2 className="text-2xl font-bold mb-4" style={{ color: colors.text.white }}>
            Configuration de la Gamification
          </h2>
          <p className="mb-8" style={{ color: colors.text.white }}>
            Définissez les paramètres de récompense pour encourager les utilisateurs à utiliser l'application.
          </p>
          
          {/* Points de base */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4" style={{ color: colors.primary.light }}>
              Points de base
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormInput
                label="Définir le nombre de points par km"
                type="number"
                value={pointsPerKm}
                onChange={setPointsPerKm}
                min={1}
                max={100}
                variant="light"
              />
              
              <FormInput
                label="Définir le nombre de points par minute de covoiturage"
                type="number"
                value={pointsPerMinute}
                onChange={setPointsPerMinute}
                min={1}
                max={50}
                variant="light"
              />
              
              <FormInput
                label="Définir le nombre de points par trajet complété"
                type="number"
                value={pointsPerTrip}
                onChange={setPointsPerTrip}
                min={1}
                max={100}
                variant="light"
              />
              
              <FormInput
                label="Définir le bonus hebdomadaire de fidélité"
                type="number"
                value={pointsPerWeek}
                onChange={setPointsPerWeek}
                min={10}
                max={500}
                variant="light"
              />
            </div>
          </div>
          
          {/* Points bonus */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4" style={{ color: colors.primary.light }}>
              Points bonus
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormInput
                label="Bonus pour véhicule électrique (%)"
                type="number"
                value={electricVehicleBonus}
                onChange={setElectricVehicleBonus}
                min={0}
                max={100}
                variant="light"
              />
              
              <FormInput
                label="Bonus pour voiture complète (%)"
                type="number"
                value={fullCarBonus}
                onChange={setFullCarBonus}
                min={0}
                max={100}
                variant="light"
              />
              
              <FormInput
                label="Bonus aux heures de pointe (%)"
                type="number"
                value={peakHoursBonus}
                onChange={setPeakHoursBonus}
                min={0}
                max={100}
                variant="light"
              />
              
              <FormInput
                label="Bonus quand le parking est presque plein (%)"
                type="number"
                value={parkingFullBonus}
                onChange={setParkingFullBonus}
                min={0}
                max={100}
                variant="light"
              />
            </div>
          </div>
          
          {/* Informations supplémentaires */}
          <div className="bg-opacity-10 bg-white p-4 rounded-lg mb-6">
            <h3 className="text-lg font-semibold mb-2" style={{ color: colors.text.white }}>
              Comment fonctionne la gamification ?
            </h3>
            <p className="mb-2" style={{ color: colors.text.white }}>
              Les points sont calculés automatiquement pour chaque trajet en fonction des paramètres ci-dessus.
              Les utilisateurs peuvent gagner des badges et des récompenses en fonction de leur nombre de points.
            </p>
            <p style={{ color: colors.text.white }}>
              Les bonus sont cumulatifs. Par exemple, un utilisateur avec un véhicule électrique complet 
              aux heures de pointe recevra tous les bonus applicables.
            </p>
          </div>
          
          {/* Boutons d'action */}
          <div className="flex justify-end space-x-4">
            <Button
              text="Réinitialiser"
              variant="secondary"
              onClick={() => {
                setPointsPerKm('5');
                setPointsPerMinute('2');
                setPointsPerTrip('10');
                setPointsPerWeek('50');
                setElectricVehicleBonus('15');
                setFullCarBonus('20');
                setPeakHoursBonus('25');
                setParkingFullBonus('30');
              }}
              className="w-auto px-6"
            />
            <Button
              text="Enregistrer les paramètres"
              variant="primary"
              onClick={handleSave}
              className="w-auto px-6"
            />
          </div>
        </Division>
      </main>
    </div>
  );
} 