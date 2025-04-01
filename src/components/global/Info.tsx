import React from "react";
import { colors } from "@/styles/colors";

interface InfoProps {
  message: string;
  type?: "info" | "error" | "success";
  className?: string;
  backgroundColor?: string;
  textColor?: string;
  borderColor?: string;
  show?: boolean;
}

export const Info: React.FC<InfoProps> = ({
  message,
  type = "info",
  className = "",
  backgroundColor,
  textColor,
  borderColor,
  show = false,
}) => {
  if (!show) return null;

  const getColors = () => {
    switch (type) {
      case "error":
        return {
          bg: backgroundColor || colors.state.error,
          text: textColor || "#FFFFFF",
          border: borderColor || colors.state.error,
        };
      case "success":
        return {
          bg: backgroundColor || colors.state.success + "10",
          text: textColor || colors.state.success,
          border: borderColor || colors.state.success + "20",
        };
      default:
        return {
          bg: backgroundColor || colors.primary.main + "10",
          text: textColor || colors.primary.main,
          border: borderColor || colors.primary.main + "20",
        };
    }
  };

  const { bg, text, border } = getColors();

  return (
    <div
      className={`p-4 rounded-lg border ${className}`}
      style={{
        backgroundColor: bg,
        color: text,
        borderColor: border,
      }}
    >
      {message}
    </div>
  );
}; 