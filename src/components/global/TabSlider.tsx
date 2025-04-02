import React from "react";
import { IconType } from "react-icons";
import { colors } from "@/styles/colors";

interface TabOption {
  key: string;
  label: string;
  icon: IconType;
}

interface TabSliderProps {
  options: TabOption[];
  activeKey: string;
  onChange: (key: string) => void;
}

export const TabSlider: React.FC<TabSliderProps> = ({
  options,
  activeKey,
  onChange,
}) => {
  const activeIndex = options.findIndex((option) => option.key === activeKey);

  return (
    <div className="relative">
      <div className="grid grid-cols-2 gap-2">
        {options.map((option) => {
          const Icon = option.icon;
          const isActive = option.key === activeKey;
          return (
            <button
              key={option.key}
              className={`p-4 rounded-lg flex items-center justify-center space-x-2 transition-all ${
                isActive ? "bg-opacity-90" : "bg-opacity-20 hover:bg-opacity-30"
              }`}
              style={{ backgroundColor: colors.primary.main }}
              onClick={() => onChange(option.key)}
            >
              <Icon className="w-5 h-5" style={{ color: colors.text.white }} />
              <span style={{ color: colors.text.white }}>{option.label}</span>
            </button>
          );
        })}
      </div>
      <div
        className="absolute bottom-0 h-0.5 transition-all duration-300 ease-in-out"
        style={{
          backgroundColor: colors.primary.light,
          width: `${100 / options.length}%`,
          left: `${(activeIndex * 100) / options.length}%`,
        }}
      />
    </div>
  );
};
