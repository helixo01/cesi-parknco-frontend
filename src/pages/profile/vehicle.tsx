import React from "react";
import { Header } from "../../components/global/Header";
import { Division } from "../../components/global/Division";
import { colors } from "../../styles/colors";

export default function Vehicle() {
  return (
    <div className="min-h-screen flex flex-col p-4 pb-20" style={{ backgroundColor: colors.background.page }}>
      <div className="w-full max-w-md mx-auto space-y-8">
        <Header 
          texteNormal="Mon" 
          texteGras="véhicule" 
        />

        <Division>
          <div className="space-y-4">
            {/* Contenu de la page du véhicule */}
          </div>
        </Division>
      </div>
    </div>
  );
}