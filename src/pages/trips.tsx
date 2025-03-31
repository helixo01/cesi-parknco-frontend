'use client';

import { Header } from '@/components/global/Header';
import { NavBar } from '@/components/global/NavBar';
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
          {/* Le contenu des trajets sera ajouté ici */}
        </div>
      </div>
      <NavBar activePage="trips" />
    </div>
  );
} 