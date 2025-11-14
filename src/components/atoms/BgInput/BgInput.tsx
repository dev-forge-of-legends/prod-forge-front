import { CircleUserRound, Eye, EyeOff, LockKeyhole, Mail } from "lucide-react";
import type { InputHTMLAttributes } from "react";
import React, { useState } from "react";
import { Image } from "../Image";

interface BgInputProps extends InputHTMLAttributes<HTMLInputElement> {
  id?: string;
  label?: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  className?: string;
  type?: string;
  autoFocus?: boolean;
}

export const BgInput: React.FC<BgInputProps> = ({
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
  const isEmail = type === "email";
  const isName = type === "name";

  const toggleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const inputId = id || `bg-input-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <div className={`w-full relative ${className}`}>
      <style>{`
        #${inputId}:-webkit-autofill,
        #${inputId}:-webkit-autofill:hover,
        #${inputId}:-webkit-autofill:focus,
        #${inputId}:-webkit-autofill:active {
          -webkit-box-shadow: 0 0 0 1000px transparent inset !important;
          box-shadow: 0 0 0 1000px transparent inset !important;
          background-color: transparent !important;
          -webkit-text-fill-color: inherit !important;
          transition: background-color 5000s ease-in-out 0s !important;
        }
        #${inputId} {
          background-color: transparent !important;
        }
      `}</style>
      {label && (
        <label
          htmlFor={inputId}
          className="block text-sm text-left text-gray-300 mb-2"
        >
          {label}
        </label>
      )}
      <Image
        src="/assets/images/buttons/input_bg.webp"
        alt="input-bg"
        className="absolute z-0 w-full h-full" // Cover the entire container
      />
      <div className="flex flex-row justify-between items-center w-full relative px-4">
        {isPassword && (
          <span className=" text-gray-400 mr-2 z-10">
            <LockKeyhole size={18} />
          </span>
        )}
        {isEmail && (
          <span className=" text-gray-400 mr-2 z-10">
            <Mail size={18} />
          </span>
        )}
        {isName && (
          <span className=" text-gray-400 mr-2 z-10">
            <CircleUserRound size={18} />
          </span>
        )}

        {/* Input field */}
        <input
          id={inputId}
          type={isPassword && showPassword ? "text" : type}
          value={value}
          autoComplete="off"
          autoFocus={autoFocus}
          onChange={onChange}
          placeholder={placeholder}
          className={`${className} font-vastagoMedium bg-transparent relative z-10 py-3 text-left items-center justify-center text-brown text-black-700 placeholder-black-700 focus:outline-none focus:border-gray-500 w-full`}
          style={{
            backgroundColor: 'transparent',
            transition: 'background-color 5000s ease-in-out 0s'
          }}
          {...props}
        />

        {/* Right eye icon */}
        {isPassword && (
          <span
            className="cursor-pointer text-gray-400 z-10"
            onClick={toggleShowPassword}
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </span>
        )}
      </div>
      {error && (
        <p className="text-sm text-center text-red-500 mt-1">{error}</p>
      )}
    </div>
  );
};
