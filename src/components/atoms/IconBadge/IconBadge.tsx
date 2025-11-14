import { Image } from "../Image";

interface IconBadgeProps {
  icon?: "coin" | "timer";
  iconSrc?: string;
  text: string;
}

export const IconBadge = ({ icon, iconSrc, text }: IconBadgeProps) => {
  const iconImageSrc = icon ? `/assets/images/icons/${icon}.svg` : iconSrc || "";
  return (
    <div className="flex flex-row items-center justify-center gap-1 px-2 py-1 bg-[#9A724B] rounded-full">
      {iconImageSrc && <Image src={iconImageSrc} alt="icon" className="w-3 h-3" />}
      <span className="font-vastagoMedium text-[#573D11] text-xs text-nowrap">{text}</span>
    </div>
  );
};
