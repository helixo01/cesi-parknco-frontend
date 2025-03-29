import React from "react";
import { colors } from "@/styles/colors";

interface DivisionProps {
  children: React.ReactNode;
  variant?: "default" | "light" | "error";
  className?: string;
}

export const Division: React.FC<DivisionProps> = ({
  children,
  variant = "default",
  className = "",
}) => {
  const getColors = () => {
    switch (variant) {
      case "light":
        return {
          backgroundColor: colors.background.input,
          textColor: colors.text.primary,
        };
      case "error":
        return {
          backgroundColor: colors.background.error,
          textColor: colors.text.primary,
        };
      default:
        return {
          backgroundColor: colors.background.default,
          textColor: "#FFFFFF",
        };
    }
  };

  const { backgroundColor, textColor } = getColors();

  return (
    <div
      className={`rounded-lg p-6 shadow-lg ${className}`}
      style={{ 
        backgroundColor,
        color: textColor,
      }}
    >
      {children}
    </div>
  );
}; 