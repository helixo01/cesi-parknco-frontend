import React, { useState } from "react";
import { colors } from "@/styles/colors";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { FiEdit2 } from "react-icons/fi";

interface Option {
  value: string;
  label: string;
  disabled?: boolean;
}

interface FormInputProps {
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
  // Props spécifiques pour le type number
  min?: number | string;
  max?: number | string;
  // Props pour l'édition
  editable?: boolean;
  isEditing?: boolean;
  onEditClick?: () => void;
}

export const FormInput: React.FC<FormInputProps> = ({
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
  min,
  max,
  editable = false,
  isEditing = false,
  onEditClick,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const getColors = () => {
    switch (variant) {
      case "light":
        return {
          backgroundColor: colors.background.input,
          textColor: colors.text.primary,
          borderColor: "transparent",
        };
      case "error":
        return {
          backgroundColor: colors.background.error,
          textColor: colors.text.primary,
          borderColor: colors.state.error,
        };
      default:
        return {
          backgroundColor: colors.background.default,
          textColor: colors.text.white,
          borderColor: "transparent",
        };
    }
  };

  const { backgroundColor, textColor, borderColor } = getColors();

  const inputStyles = `
    w-full px-4 py-2 rounded-lg
    focus:outline-none focus:ring-2 focus:ring-primary-light
    disabled:opacity-50 disabled:cursor-not-allowed
    transition-colors duration-200
  `;

  const renderEditButton = () => {
    if (!editable) return null;

    return (
      <button
        type="button"
        onClick={onEditClick}
        className={`
          absolute right-3 top-1/2 -translate-y-1/2
          p-2 rounded-full
          transition-all duration-200
          ${isEditing 
            ? 'text-primary-light bg-primary-light bg-opacity-10' 
            : 'text-white hover:text-primary-light hover:bg-primary-light hover:bg-opacity-10'
          }
        `}
      >
        <FiEdit2 
          size={20}
          className="stroke-[1.5]"
        />
      </button>
    );
  };

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    // Vérifie si la valeur est un nombre valide
    if (newValue === "" || /^\d+$/.test(newValue)) {
      const numValue = parseInt(newValue);
      if (newValue === "" || 
        (min === undefined || (typeof min === 'number' && numValue >= min)) && 
        (max === undefined || (typeof max === 'number' && numValue <= max))) {
        onChange(newValue);
      }
    }
  };

  return (
    <div className={`space-y-1 ${className}`}>
      <label className="block text-sm font-medium" style={{ color: colors.text.label }}>
        <span>{label}</span>
        {required && (
          <span className="ml-1 font-medium" style={{ color: colors.state.error }}>
            *
          </span>
        )}
      </label>

      <div className="relative">
        {type === "select" ? (
          <div className="relative">
            <select
              value={value}
              onChange={(e) => onChange(e.target.value)}
              disabled={disabled || (!isEditing && editable)}
              className={`${inputStyles} appearance-none pr-12`}
              style={{
                backgroundColor,
                color: textColor,
                borderColor,
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23000000'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M6 9l6 6 6-6'%3E%3C/path%3E%3C/svg%3E")`,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "right 2.5rem center",
                backgroundSize: "1.5em 1.5em",
              }}
            >
              <option value="">Sélectionner une option</option>
              {options.map((option) => (
                <option key={option.value} value={option.value} disabled={option.disabled}>
                  {option.label}
                </option>
              ))}
            </select>
            {renderEditButton()}
          </div>
        ) : (
          <div className="relative">
            <input
              type={type === "password" ? (showPassword ? "text" : "password") : type}
              value={value}
              onChange={type === "number" ? handleNumberChange : (e) => onChange(e.target.value)}
              placeholder={placeholder}
              disabled={disabled || (!isEditing && editable)}
              min={min}
              max={max}
              className={inputStyles}
              style={{
                backgroundColor,
                color: textColor,
                borderColor,
              }}
            />
            {type === "password" && (
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
              >
                {showPassword ? (
                  <AiOutlineEyeInvisible size={20} />
                ) : (
                  <AiOutlineEye size={20} />
                )}
              </button>
            )}
            {renderEditButton()}
          </div>
        )}
        {error && (
          <p className="mt-1 text-sm text-red-500">{error}</p>
        )}
      </div>
    </div>
  );
};