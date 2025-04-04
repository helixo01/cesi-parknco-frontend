import React from 'react';
import { colors } from "@/styles/colors";

interface StatCardProps {
  title: string;
  value: string;
  icon: string;
  color: string;
  className?: string;
}

export const StatCard: React.FC<StatCardProps> = ({ 
  title, 
  value, 
  icon, 
  color,
  className = "" 
}) => {
  return (
    <div 
      className={`rounded-lg p-4 shadow-sm border border-opacity-20 ${className}`}
      style={{ 
        backgroundColor: colors.background.default,
        borderColor: color,
      }}
    >
      <div className="flex items-center mb-3">
        <div 
          className="w-10 h-10 rounded-full flex items-center justify-center mr-3"
          style={{ backgroundColor: `${color}20` }}
        >
          <span style={{ fontSize: '1.2rem' }}>{icon}</span>
        </div>
        <h3 className="text-sm font-semibold" style={{ color: colors.text.white }}>{title}</h3>
      </div>
      <p className="text-2xl font-bold" style={{ color }}>{value}</p>
    </div>
  );
}; 