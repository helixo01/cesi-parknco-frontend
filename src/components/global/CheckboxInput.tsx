import React from "react";
import { colors } from "@/styles/colors";

interface CheckboxInputProps {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  required?: boolean;
  error?: string;
  disabled?: boolean;
  className?: string;
  linkText?: string;
  linkHref?: string;
}

export const CheckboxInput: React.FC<CheckboxInputProps> = ({
  label,
  checked,
  onChange,
  required = false,
  error,
  disabled = false,
  className = "",
  linkText,
  linkHref
}) => {
  return (
    <div className={`flex flex-col ${className}`}>
      <label className="flex items-start space-x-3 cursor-pointer">
        <div className="relative flex items-center">
          <input
            type="checkbox"
            checked={checked}
            onChange={(e) => onChange(e.target.checked)}
            required={required}
            disabled={disabled}
            className="hidden"
          />
          <div
            className={`
              w-5 h-5 border-2 rounded
              transition-all duration-200 ease-in-out
              flex items-center justify-center
              ${checked ? 'bg-primary-main border-primary-main' : 'bg-white border-gray-300'}
              ${error ? 'border-error-main' : ''}
              ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:border-primary-main'}
            `}
          >
            {checked && (
              <svg
                className="w-3 h-3 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="3"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            )}
          </div>
        </div>
        <div className="flex-1 text-sm text-primary">
          <span>
            {label}
          </span>
          {linkText && linkHref && (
            <>
              {" "}
              <a
                href={linkHref}
                target="_blank"
                rel="noopener noreferrer"
                className="underline font-medium text-primary-main hover:opacity-80 transition-opacity duration-200"
              >
                {linkText}
              </a>
            </>
          )}
          {required && (
            <span className="ml-1 text-error-dark font-medium">
              *
            </span>
          )}
        </div>
      </label>
      {error && (
        <p className="mt-1 text-sm text-error-main">
          {error}
        </p>
      )}
    </div>
  );
}; 