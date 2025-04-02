import React from "react";
import { IconType } from "react-icons";
import { colors } from "@/styles/colors";

interface SettingsItemProps {
  icon: IconType;
  label: string;
  onClick?: () => void;
  className?: string;
  description?: string;
  subtitle?: string;
  prefix?: string;
  progress?: number;
  style?: React.CSSProperties;
}

export const SettingsItem: React.FC<SettingsItemProps> = ({
  icon: Icon,
  label,
  onClick,
  className = "",
  description,
  subtitle,
  prefix,
  progress,
  style,
}) => {
  return (
    <button
      onClick={onClick}
      className={`w-full px-4 py-3 flex items-center justify-between text-left transition-all duration-200 ${className}`}
      style={{
        ...style,
        borderRadius: "0.75rem",
        backgroundColor: style?.backgroundColor || colors.background.navbar,
      }}
    >
      <div className="flex items-center space-x-4">
        <div style={{ color: colors.primary.light }}>
          <Icon className="w-6 h-6" />
        </div>
        <div className="flex-grow">
          <div className="flex items-center">
            {prefix && (
              <span 
                className="mr-2 font-medium" 
                style={{ color: colors.primary.light }}
              >
                {prefix}
              </span>
            )}
            <span 
              className="font-semibold text-base" 
              style={{ color: colors.text.label }}
            >
              {label}
            </span>
          </div>
          {(description || subtitle) && (
            <p 
              className="text-sm mt-1" 
              style={{ color: colors.text.white }}
            >
              {description || subtitle}
            </p>
          )}
          {progress !== undefined && (
            <div className="mt-2">
              <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{ 
                    width: `${progress}%`,
                    backgroundColor: colors.primary.light
                  }}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </button>
  );
};