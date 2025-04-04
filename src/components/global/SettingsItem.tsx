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
      className={`
        w-full flex items-center rounded-xl
        transition-all duration-300 ease-in-out
        transform hover:scale-[1.02]
        ${className}
      `}
      style={{
        ...style,
        backgroundColor: style?.backgroundColor || colors.components.settingsItem.background,
      }}
    >
      <div 
        className="flex items-center justify-center rounded-l-xl mr-4"
        style={{
          width: "64px",
          height: "64px",
          backgroundColor: colors.components.settingsItem.icon.background,
        }}
      >
        <Icon 
          className="transition-transform duration-300 group-hover:scale-110"
          size={28} 
          color={colors.components.settingsItem.icon.color}
        />
      </div>

      <div className="flex-grow py-3 pr-4">
        <div className="flex items-center">
          {prefix && (
            <span 
              className="mr-2 font-medium" 
              style={{ color: colors.text.white }}
            >
              {prefix}
            </span>
          )}
          <span 
            className="font-semibold text-base"
            style={{ color: colors.text.white }}
          >
            {label}
          </span>
        </div>

        {(description || subtitle) && (
          <p 
            className="text-sm mt-1 opacity-90"
            style={{ color: colors.text.white }}
          >
            {description || subtitle}
          </p>
        )}

        {progress !== undefined && (
          <div className="mt-3">
            <div 
              className="h-2 rounded-full overflow-hidden"
              style={{ backgroundColor: `${colors.primary.light}20` }}
            >
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
    </button>
  );
};