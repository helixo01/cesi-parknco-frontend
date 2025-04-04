import React from 'react';
import { colors } from "@/styles/colors";

interface ParkingStatsProps {
  occupancyRate: number;
  availableSpots: number;
  peakHours: string;
  className?: string;
}

export const ParkingStats: React.FC<ParkingStatsProps> = ({
  occupancyRate,
  availableSpots,
  peakHours,
  className = ""
}) => {
  return (
    <div className={`bg-opacity-5 bg-white p-4 rounded-lg ${className}`}>
      <h3 className="text-lg font-semibold mb-2" style={{ color: colors.text.white }}>
        Utilisation du parking
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="flex flex-col">
          <span className="text-sm font-medium" style={{ color: colors.text.white }}>Taux d'occupation actuel</span>
          <span className="text-2xl font-bold" style={{ color: colors.primary.light }}>{occupancyRate}%</span>
          {/* Barre de progression */}
          <div className="w-full h-2 bg-gray-700 rounded-full mt-2 overflow-hidden">
            <div 
              className="h-full rounded-full" 
              style={{ 
                width: `${occupancyRate}%`,
                backgroundColor: occupancyRate > 90 
                  ? colors.state.error 
                  : occupancyRate > 70 
                    ? '#FFC107' // Jaune
                    : colors.state.success
              }}
            ></div>
          </div>
        </div>
        <div className="flex flex-col">
          <span className="text-sm font-medium" style={{ color: colors.text.white }}>Places disponibles</span>
          <span className="text-2xl font-bold" style={{ color: colors.primary.light }}>{availableSpots}</span>
        </div>
        <div className="flex flex-col">
          <span className="text-sm font-medium" style={{ color: colors.text.white }}>Heure de pointe</span>
          <span className="text-2xl font-bold" style={{ color: colors.primary.light }}>{peakHours}</span>
        </div>
      </div>
    </div>
  );
}; 