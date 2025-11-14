import { getValidImageUrl } from "@app-utils/stringUtils";
import { LoaderCircle } from "lucide-react";
import { ButtonHTMLAttributes, useEffect, useState } from "react";

interface BgButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "onClick"> {
  onClick: () => void;
  className?: string;
  loading?: boolean;
  defaultColor?: string;
  size?:
  | "sm"
  | "md"
  | "lg"
  | "off"
  | "on"
  | "cards"
  | "dashboard"
  | "authentication"
  | "onboarding"
  | "invite"
  | "tabs";
  disabled?: boolean;
  children?: React.ReactNode;
  scale?: number;
}

export const BgButton = ({
  onClick,
  className,
  loading = false,
  // defaultColor = "primary",
  disabled = false,
  size = "sm",
  children,
  scale,
  ...props
}: BgButtonProps) => {
  const [imageDimensions, setImageDimensions] = useState<{
    width: number;
    height: number;
  } | null>(null);

  const getBackgroundImageUrl = () => {
    if (size === "sm") {
      return getValidImageUrl("/assets/images/buttons/button_bg_sm.webp");
    } else if (size === "md") {
      return getValidImageUrl("/assets/images/buttons/button_bg_md.webp");
    } else if (size === "lg") {
      return getValidImageUrl("/assets/images/buttons/button_bg_lg.webp");
    } else if (size === "off") {
      return getValidImageUrl("/assets/images/buttons/button_bg_off.webp");
    } else if (size === "on") {
      return getValidImageUrl("/assets/images/buttons/button_bg_on.webp");
    } else if (size === "cards") {
      return getValidImageUrl("/assets/images/buttons/button_bg_cards.webp");
    } else if (size === "authentication") {
      return getValidImageUrl(
        "/assets/images/buttons/button_bg_authentication.webp"
      );
    } else if (size === "dashboard") {
      return getValidImageUrl(
        "/assets/images/buttons/button_bg_dashboard.webp"
      );
    } else if (size === "invite") {
      return getValidImageUrl("/assets/images/buttons/button_bg_invited.webp");
    } else if (size === "onboarding") {
      return getValidImageUrl(
        "/assets/images/buttons/button_bg_onboarding.webp"
      );
    } else if (size === "tabs") {
      return getValidImageUrl("/assets/images/buttons/button_bg_tabs.webp");
    }
    return "";
  };

  const backgroundImageUrl = getBackgroundImageUrl();

  useEffect(() => {
    if (!backgroundImageUrl) return;

    const img = new Image();
    img.onload = () => {
      setImageDimensions({
        width: img.naturalWidth,
        height: img.naturalHeight,
      });
    };
    img.onerror = () => {
      // If image fails to load, don't set dimensions
      setImageDimensions(null);
    };
    img.src = backgroundImageUrl;
  }, [backgroundImageUrl]);

  // Only apply image-based dimensions if scale is explicitly set and not 1
  // If scale is 1 (default), let className height/width take precedence
  const shouldUseImageDimensions = imageDimensions && scale;

  return (
    <button
      onClick={disabled ? undefined : onClick}
      style={{
        backgroundImage: backgroundImageUrl
          ? `url('${backgroundImageUrl}')`
          : undefined,
        backgroundSize: imageDimensions ? "100% 100%" : "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        width: shouldUseImageDimensions
          ? `${imageDimensions.width * scale}px`
          : undefined,
        height: shouldUseImageDimensions
          ? `${imageDimensions.height * scale}px`
          : undefined,
        minWidth: shouldUseImageDimensions
          ? `${imageDimensions.width * scale}px`
          : undefined,
        minHeight: shouldUseImageDimensions
          ? `${imageDimensions.height * scale}px`
          : undefined,
      }}
      className={`
        ${className} 
        ${!imageDimensions ? "px-6 py-2" : ""}
        flex items-center justify-center 
        ${disabled ? "opacity-50 cursor-not-allowed" : ""}
        text-yellow 
      `}
      {...props}
    >
      {loading ? (
        <div className="animate-spin">
          <LoaderCircle />
        </div>
      ) : (
        children
      )}
    </button>
  );
};
