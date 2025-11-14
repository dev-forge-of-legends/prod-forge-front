import React from "react";
import { Image } from "../../atoms/Image";
interface Props {
  children: React.ReactNode;
  src?: string;
  fallbackSrc?: string;
}

export const BackgroundWrapper: React.FC<Props> = ({
  children,
  src = "/assets/images/logback.webp",
  fallbackSrc = "/assets/images/backgrounds/default.webp",
}) => {
  return (
    <div className="relative min-h-screen w-full">
      <Image
        src={src}
        fallbackSrc={fallbackSrc}
        className="absolute inset-0 w-full h-full object-cover -z-10" />
      <div className="relative z-10">{children}</div>
    </div>
  );
};
