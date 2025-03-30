import React from "react";
import Image from "next/image";
import { colors } from "@/styles/colors";

interface LogoProps {
  width?: number;
  height?: number;
  shape?: "circle" | "rectangle" | "square";
}

export const Logo: React.FC<LogoProps> = ({
  width = 150,
  height = 150,
  shape = "circle",
}) => {
  const getBorderRadius = () => {
    switch (shape) {
      case "circle":
        return "rounded-full";
      case "square":
        return "rounded-lg";
      case "rectangle":
        return "rounded-xl";
      default:
        return "rounded-full";
    }
  };

  return (
    <div
      className={`relative overflow-hidden ${getBorderRadius()}`}
      style={{
        width: `${width}px`,
        height: `${height}px`,
        backgroundColor: colors.components.logo.background,
      }}
    >
      <Image
        src="/logo.jpg"
        alt="Logo ParknCo"
        fill
        style={{ objectFit: "contain" }}
        priority
      />
    </div>
  );
}; 