import React from "react";
import Image from "next/image";

interface LogoProps {
  width?: number;
  height?: number;
  className?: string;
  shape?: "rectangle" | "circle";
}

export const Logo: React.FC<LogoProps> = ({
  width = 150,
  height = 50,
  className = "",
  shape = "rectangle",
}) => {
  return (
    <div 
      className={`
        ${shape === "circle" ? "rounded-full overflow-hidden aspect-square" : ""} 
        ${className}
      `}
      style={shape === "circle" ? { width: width, height: width } : undefined}
    >
      <Image
        src="/logo.jpg"
        alt="ParknCo Logo"
        width={width}
        height={shape === "circle" ? width : height}
        priority
        className={shape === "circle" ? "object-cover w-full h-full" : ""}
      />
    </div>
  );
}; 