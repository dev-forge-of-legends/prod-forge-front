interface IAnimatePingProps {
  bgcolor: string;
  textcolor: string;
  size: string;
}

export const AnimatePing = ({ textcolor, bgcolor, size }: IAnimatePingProps) => {
  // Define a size class based on the size prop
  const sizeClass = size === "small" ? "h-2.5 w-2.5" : size === "medium" ? "h-4 w-4" : "h-6 w-6";

  return (
    <span className={`relative flex ${sizeClass}`}>
      <span className={`absolute inline-flex ${sizeClass} animate-ping rounded-full ${bgcolor} opacity-75`}></span>
      <span className={`relative inline-flex ${sizeClass} rounded-full ${bgcolor} ${textcolor}`}></span>
    </span>
  );
};
