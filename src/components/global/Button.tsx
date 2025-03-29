import React from "react";
import { colors } from "@/styles/colors";

interface ButtonProps {
  text: string;
  variant?: "primary" | "secondary" | "error";
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  text,
  variant = "primary",
  onClick,
  className = "",
  disabled = false,
}) => {
  const getColors = () => {
    switch (variant) {
      case "secondary":
        return {
          backgroundColor: colors.text.secondary,
          textColor: "#FFFFFF",
        };
      case "error":
        return {
          backgroundColor: colors.state.error,
          textColor: "#FFFFFF",
        };
      default:
        return {
          backgroundColor: colors.primary.main,
          textColor: "#FFFFFF",
        };
    }
  };

  const { backgroundColor, textColor } = getColors();

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        w-full py-2 px-4 rounded-lg font-medium
        transition-colors duration-200
        focus:outline-none focus:ring-2 focus:ring-offset-2
        disabled:opacity-50 disabled:cursor-not-allowed
        ${className}
      `}
      style={{
        backgroundColor: disabled ? colors.text.placeholder : backgroundColor,
        color: textColor,
        fontSize: "16px"
      }}
    >
      {text}
    </button>
  );
}; 