import React from "react";

interface Props {
  name: string;
  src?: string;
  className?: string;
}

export const Avatar: React.FC<Props> = ({ name, src, className = "" }) => {
  const initials = name
    .split(" ")
    .map((n) => n[0]?.toUpperCase())
    .slice(0, 2)
    .join("");

  const base = `rounded-full object-cover shrink-0 ${className}`;

  return src ? (
    <img
      src={src}
      loading="lazy"
      decoding="async"
      className={`h-[42px] w-[42px] ${base}`}
      alt={`${name} avatar`}
    />
  ) : (
    <div
      className={`flex items-center justify-center bg-neutral-700 text-white h-[42px] w-[42px] ${base}`}
      aria-label={`${name} avatar placeholder`}
    >
      {initials}
    </div>
  );
};
