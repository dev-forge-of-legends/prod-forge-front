import React from "react";

export const SoftBadge: React.FC<React.PropsWithChildren<{ className?: string }>> = ({ className, children }) => {
  return <span className={`rounded-full px-2 py-0.5 font-semibold ${className || ""}`}>{children}</span>;
};
