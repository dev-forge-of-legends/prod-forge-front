import { LoaderCircle } from "lucide-react";

export const CustomSpinner = ({ size = 20 }: { size?: number }) => {
  return (
    <div className="text-center" style={{ width: size, height: size }}>
      <div className="animate-spin">
        <LoaderCircle />
      </div>
    </div>
  );
};