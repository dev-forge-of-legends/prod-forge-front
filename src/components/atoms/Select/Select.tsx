import type { SelectHTMLAttributes } from "react";
import React from "react";

interface Option {
  label: string;
  value: string;
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  id?: string;
  label?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: Option[];
  error?: string;
  className?: string;
  placeholder?: string;
}

export const Select: React.FC<SelectProps> = ({
  id,
  label,
  value,
  onChange,
  options,
  error,
  className = "",
  placeholder = "Select an option",
  ...props
}) => {
  return (
    <div className="w-full my-2">
      {label && (
        <label htmlFor={id} className="block text-sm text-center text-gray-300 mb-2">
          {label}
        </label>
      )}
      <select
        id={id}
        value={value}
        onChange={onChange}
        className={className}
        {...props}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error && <p className="text-sm text-red-500 text-center mt-1">{error}</p>}
    </div>
  );
};

