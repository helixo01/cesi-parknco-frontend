import React from "react";
import { colors } from "@/styles/colors";

interface NumberInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  error?: string;
  required?: boolean;
  className?: string;
  disabled?: boolean;
  min?: number;
  max?: number;
}

export const NumberInput: React.FC<NumberInputProps> = ({
  label,
  value,
  onChange,
  placeholder,
  error,
  required = false,
  className = "",
  disabled = false,
  min,
  max,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    // Vérifie si la valeur est un nombre valide
    if (newValue === "" || /^\d+$/.test(newValue)) {
      const numValue = parseInt(newValue);
      if (newValue === "" || (min === undefined || numValue >= min) && (max === undefined || numValue <= max)) {
        onChange(newValue);
      }
    }
  };

  return (
    <div className={`w-full ${className}`}>
      <label 
        className="block font-medium mb-2"
        style={{ 
          color: error ? colors.state.error : colors.text.label,
          fontSize: "14px"
        }}
      >
        {label}
      </label>
      <input
        type="number"
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        min={min}
        max={max}
        style={{
          backgroundColor: "#FFFFFF",
          color: colors.text.primary,
          fontSize: "14px",
          height: "50px",
          paddingRight: "16px"
        }}
        className={`
          w-full px-4 rounded-lg border
          focus:outline-none focus:ring-2 focus:ring-${colors.primary.main}
          ${error ? `border-${colors.state.error}` : "border-gray-300"}
          ${error ? `focus:ring-${colors.state.error}` : `focus:border-${colors.primary.main}`}
          ${disabled ? "opacity-50 cursor-not-allowed" : ""}
        `}
      />
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