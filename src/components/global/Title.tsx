import React from "react";
import { colors } from "@/styles/colors";

interface TitleProps {
  texteNormal: string;
  texteGras: string;
  texteNormal2?: string;
  className?: string;
}

export const Title: React.FC<TitleProps> = ({ 
  texteNormal, 
  texteGras, 
  texteNormal2 = "",
  className = "" 
}) => {
  return (
    <div className={`flex flex-col items-center ${className}`}>
      <h1 className="text-2xl font-medium" style={{ color: colors.components.titre.text.normal }}>
        {texteNormal}{" "}
        <span style={{ color: colors.components.titre.text.highlight, fontWeight: "bold" }}>
          {texteGras}
        </span>
        {texteNormal2}
      </h1>
      <div 
        className="w-32 h-0.5 mt-2" 
        style={{ backgroundColor: colors.components.titre.line }} 
      />
    </div>
  );
}; 