import { getValidImageUrl } from "@app-utils/stringUtils";
import { LoaderCircle } from "lucide-react";
import { ButtonHTMLAttributes, useEffect, useState } from "react";

interface ButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "onClick"> {
  onClick: () => void;
  className?: string;
  size?: string;
  loading?: boolean;
  disabled?: boolean;
  children?: React.ReactNode;
  scale?: number;
}

const FLButton = ({
  onClick,
  className,
  loading = false,
  size = "sm",
  disabled = false,
  scale = 0.8,
  children,
  ...props
}: ButtonProps) => {
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
    } else if (size === "authentication") {
      return getValidImageUrl(
        "/assets/images/buttons/button_bg_authentication.webp"
      );
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
        width: imageDimensions
          ? `${imageDimensions.width * scale}px`
          : undefined,
        height: imageDimensions
          ? `${imageDimensions.height * scale}px`
          : undefined,
        minWidth: imageDimensions
          ? `${imageDimensions.width * scale}px`
          : undefined,
        minHeight: imageDimensions
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

export default FLButton;
