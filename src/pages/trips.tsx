'use client';

import { Header } from '@/components/global/Header';
import { NavBar } from '@/components/global/NavBar';
import TrajetItem from '@/components/global/TrajetItem';
import { colors } from "@/styles/colors";

export default function Trips() {
  return (
    <div className="min-h-screen flex flex-col p-4 pb-20" style={{ backgroundColor: colors.background.page }}>
      <div className="w-full max-w-md mx-auto space-y-8">
        <Header 
          texteNormal="Mes"
          texteGras="Trajets"
        />
        <div className="space-y-4">
          <TrajetItem departure="Paris" arrival="Lyon" date={new Date()} ETA={new Date()} ETD={new Date()} status="En attente" />
          <TrajetItem departure="Saint-Remy-en-Bouzemont-Saint-Genest-et-Isson" arrival="CESI ARRAS" date={new Date()} ETA={new Date()} ETD={new Date()} status="Terminé" />
          <TrajetItem departure="Crèvecoeur-sur-l'escaut" arrival="CESI ARRAS" date={new Date()} ETA={new Date()} ETD={new Date()} status="confirmé" />
        </div>
      </div>
      <NavBar activePage="trips" />
    </div>
  );
} 