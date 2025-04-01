import React from "react";
import { colors } from "@/styles/colors";

interface HelpTextProps {
  text: string;
  linkText: string;
  linkHref: string;
  textColor?: string;
  linkColor?: string;
  isBold?: boolean;
  className?: string;
}

export const HelpText: React.FC<HelpTextProps> = ({
  text,
  linkText,
  linkHref,
  textColor = "#FFFFFF",
  linkColor = "#B3EBFF",
  isBold = false,
  className = "",
}) => {
  return (
    <p 
      className={`text-sm ${isBold ? "font-bold" : ""} ${className}`}
      style={{ 
        color: textColor,
        fontSize: "14px"
      }}
    >
      {text}{" "}
      <a
        href={linkHref}
        className="hover:underline"
        style={{ 
          color: linkColor,
          textDecoration: "underline",
          fontSize: "14px"
        }}
      >
        {linkText}
      </a>
    </p>
  );
}; 