import React from "react";
import { colors } from "@/styles/colors";

interface TitreProps {
  texteNormal: string;
  texteGras: string;
  className?: string;
}

export const Titre: React.FC<TitreProps> = ({ texteNormal, texteGras, className = "" }) => {
  return (
    <div className={`flex flex-col items-center ${className}`}>
      <h1 className="text-2xl font-medium" style={{ color: colors.components.titre.text.normal }}>
        {texteNormal}{" "}
        <span style={{ color: colors.components.titre.text.highlight, fontWeight: "bold" }}>
          {texteGras.split(",")[0]}
        </span>
        {texteGras.split(",")[1]}
      </h1>
      <div 
        className="w-32 h-0.5 mt-2" 
        style={{ backgroundColor: colors.components.titre.line }} 
      />
    </div>
  );
}; 