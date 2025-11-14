import { Eye, EyeOff } from "lucide-react";
import type { InputHTMLAttributes } from "react";
import React, { useState } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  id?: string;
  label?: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  className?: string;
  type?: string;
  autoFocus?: boolean;
}

export const Input: React.FC<InputProps> = ({
  id,
  label,
  type = "text",
  autoFocus = false,
  placeholder = "",
  value,
  onChange,
  error,
  className = "",
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";

  const toggleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className="w-full my-2 relative">
      {label && (
        <label htmlFor={id} className="block text-sm text-center text-gray-300 mb-2">
          {label}
        </label>
      )}
      <input
        id={id}
        type={isPassword && showPassword ? "text" : type}
        value={value}
        autoComplete="off"
        autoFocus={autoFocus}
        onChange={onChange}
        placeholder={placeholder}
        className={`${className} ${isPassword ? "pr-10" : ""}`}
        {...props}
      />
      {isPassword && (
        <span
          className={`absolute right-3 transform -translate-y-1/2 cursor-pointer text-gray-400 ${label ? 'top-[68%]' : 'top-1/2'}`}
          onClick={toggleShowPassword}
        >
          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
        </span>
      )}
      {error && <p className="text-sm text-center text-red-500 mt-1">{error}</p>}
    </div>
  );
};

