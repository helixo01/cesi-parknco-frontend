import React, { useState } from "react";
import { colors } from "@/styles/colors";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

interface Option {
  value: string;
  label: string;
  disabled?: boolean;
}

interface TextInputProps {
  label: string;
  type?: "text" | "password" | "email" | "number" | "date" | "time" | "select";
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  required?: boolean;
  className?: string;
  disabled?: boolean;
  // Variantes de style
  variant?: "default" | "light" | "error";
  // Options pour le type select
  options?: Option[];
  "data-cy"?: string;
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
  disabled = false,
  variant = "default",
  options = [],
  "data-cy": dataCy,
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
          backgroundColor: colors.background.input,
          textColor: colors.text.primary,
          labelColor: colors.text.label,
          placeholderColor: colors.text.placeholder,
        };
      default:
        return {
          backgroundColor: colors.background.input,
          textColor: colors.text.primary,
          labelColor: colors.text.label,
          placeholderColor: colors.text.placeholder,
        };
    }
  };

  const { backgroundColor, textColor, labelColor, placeholderColor } = getColors();

  const renderInput = () => {
    if (type === "select") {
      return (
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          required={required}
          disabled={disabled}
          style={{
            backgroundColor,
            color: textColor,
            fontSize: "14px",
            height: "50px",
            paddingRight: "16px",
            appearance: "none",
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%236B7280'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "right 1rem center",
            backgroundSize: "1.5em 1.5em",
          }}
          className={`
            w-full px-4 rounded-lg border
            focus:outline-none focus:ring-2 focus:ring-${colors.primary.main}
            ${error ? `border-${colors.state.error}` : "border-gray-300"}
            ${error ? `focus:ring-${colors.state.error}` : `focus:border-${colors.primary.main}`}
            ${disabled ? "opacity-50 cursor-not-allowed" : ""}
          `}
        >
          <option value="">{placeholder || "Sélectionnez une option"}</option>
          {options.map((option) => (
            <option
              key={option.value}
              value={option.value}
              disabled={option.disabled}
            >
              {option.label}
            </option>
          ))}
        </select>
      );
    }

    return (
      <input
        type={type === "password" && showPassword ? "text" : type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        data-cy={dataCy}
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
          ${disabled ? "opacity-50 cursor-not-allowed" : ""}
        `}
      />
    );
  };

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
        <span>{label}</span>
        {required && (
          <span className="ml-1 font-medium" style={{ color: colors.state.error }}>
            *
          </span>
        )}
      </label>
      <div className="relative">
        {renderInput()}
        {type === "password" && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 transform -translate-y-1/2"
          >
            {showPassword ? (
              <AiOutlineEyeInvisible size={20} color={colors.text.secondary} />
            ) : (
              <AiOutlineEye size={20} color={colors.text.secondary} />
            )}
          </button>
        )}
      </div>
      {error && (
        <p 
          className="mt-1 text-sm"
          style={{ color: colors.state.error }}
        >
          {error}
        </p>
      )}
    </div>
  );
}; 