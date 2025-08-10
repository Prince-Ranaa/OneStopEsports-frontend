// components/InputField.tsx
"use client";

import React from "react";

interface InputFieldProps {
  label?: string;
  name?: string;
  type?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  error?: boolean;
  required?: boolean;
  disabled?: boolean;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  name,
  type = "text",
  value,
  onChange,
  placeholder = "",
  error = false,
  required = false,
  disabled = false,
}) => {
  return (
    <div className="flex flex-col gap-1 w-full mb-2">
      {label && (
        <label
          htmlFor={name}
          className={`text-sm font-medium ${
            disabled ? "text-gray-400" : "text-gray-700"
          }`}
        >
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`px-4 py-2 border ${
          error ? "border-red-500" : "border-gray-300"
        } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 
        ${disabled ? "bg-gray-100 text-gray-500 cursor-not-allowed" : ""}`}
        disabled={disabled}
      />
      {/* {error && <p className="text-xs text-red-500">{error}</p>} */}
    </div>
  );
};

export default InputField;
