interface ProgressBarProps {
  rate: number;
  bgColor?: string;
  areaColor?: string;
}
export const ProgressBar = ({ rate, bgColor, areaColor }: ProgressBarProps) => {
  return (
    <div className={`border-2 border-yellow-400 rounded-full w-full h-2.5 ${bgColor || "bg-gray-200"}`}>
      <div className={`${areaColor || "bg-yellow-400"} h-1.5 rounded-full`} style={{ width: `${rate}%` }}></div>
    </div>
  );
};