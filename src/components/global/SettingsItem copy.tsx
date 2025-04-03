import React from "react";
import { IconType } from "react-icons";
import { colors } from "@/styles/colors";

interface SettingsItemProps {
  icon: IconType;
  label: string;
  onClick?: () => void;
  className?: string;
}

export const SettingsItem: React.FC<SettingsItemProps> = ({
  icon: Icon,
  label,
  onClick,
  className = "",
}) => {
  return (
    <button
      onClick={onClick}
      className={`
        w-full flex items-center rounded-xl
        transition-colors duration-200
        ${className}
      `}
      style={{
        backgroundColor: colors.components.settingsItem.background,
      }}
    >
      <div 
        className="flex items-center justify-center rounded-l-xl mr-4"
        style={{
          width: "60px",
          height: "60px",
          backgroundColor: colors.components.settingsItem.icon.background,
        }}
      >
        <Icon 
          size={28} 
          color={colors.components.settingsItem.icon.color}
        />
      </div>
      <span 
        className="text-base font-medium"
        style={{ color: colors.components.settingsItem.text }}
      >
        {label}
      </span>
    </button>
  );
}; 