import React, { useState } from "react";
import { colors } from "@/styles/colors";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

interface TextInputProps {
  label: string;
  type?: "text" | "password" | "email" | "number";
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  required?: boolean;
  className?: string;
  // Variantes de style
  variant?: "default" | "light" | "error";
}

export const TextInput: React.FC<TextInputProps> = ({
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  error,
  required = false,
  className = "",
  variant = "default",
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const getColors = () => {
    switch (variant) {
      case "light":
        return {
          backgroundColor: colors.background.input,
          textColor: colors.text.primary,
          labelColor: colors.text.label,
          placeholderColor: colors.text.placeholder,
        };
      case "error":
        return {
          backgroundColor: colors.background.error,
          textColor: colors.text.primary,
          labelColor: colors.state.error,
          placeholderColor: colors.text.placeholder,
        };
      default:
        return {
          backgroundColor: "#FFFFFF",
          textColor: colors.text.primary,
          labelColor: colors.text.label,
          placeholderColor: colors.text.placeholder,
        };
    }
  };

  const { backgroundColor, textColor, labelColor, placeholderColor } = getColors();

  return (
    <div className={`w-full ${className}`}>
      <style jsx>{`
        input::placeholder {
          color: ${placeholderColor};
          font-size: 14px;
        }
      `}</style>
      <label 
        className="block font-medium mb-2"
        style={{ 
          color: labelColor,
          fontSize: "14px"
        }}
      >
        {label}
      </label>
      <div className="relative">
        <input
          type={type === "password" && showPassword ? "text" : type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          required={required}
          style={{
            backgroundColor,
            color: textColor,
            fontSize: "14px",
            height: "50px",
            paddingRight: type === "password" ? "50px" : "16px"
          }}
          className={`
            w-full px-4 rounded-lg border
            focus:outline-none focus:ring-2 focus:ring-${colors.primary.main}
            ${error ? `border-${colors.state.error}` : "border-gray-300"}
            ${error ? `focus:ring-${colors.state.error}` : `focus:border-${colors.primary.main}`}
          `}
        />
        {type === "password" && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
          >
            {showPassword ? (
              <AiOutlineEyeInvisible size={30} />
            ) : (
              <AiOutlineEye size={30} />
            )}
          </button>
        )}
      </div>
      {error && (
        <p className="mt-2" style={{ color: colors.state.error, fontSize: "14px" }}>{error}</p>
      )}
    </div>
  );
}; 