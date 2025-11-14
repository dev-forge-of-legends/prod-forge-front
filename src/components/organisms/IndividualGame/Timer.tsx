import { formatTimeInMSWithColon } from "@app-utils/timeUtils";
import { TimerIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface TimerProps {
  leftTime: number;
}
const Timer: React.FC<TimerProps> = ({ leftTime }) => {
  const timeRef = useRef(leftTime);
  const [time, setTime] = useState(leftTime);
  useEffect(() => {
    // Initialize ref with the prop value
    timeRef.current = leftTime;

    const interval = setInterval(() => {
      if (timeRef.current <= 0) {
        clearInterval(interval);
        return;
      }
      timeRef.current = timeRef.current - 1;
      setTime(timeRef.current);
    }, 1000);

    return () => clearInterval(interval);
  }, []); // Empty deps - component will remount via key change

  return (
    <div className="flex items-center justify-center gap-2 py-1 px-4 border-yellow-500/50 border-1 rounded-full mb-4">
      <TimerIcon className="w-4 h-4 text-yellow" />
      <p className="text-white text-md font-bold">{formatTimeInMSWithColon(time)}</p>
    </div>
  )
}

export default Timer;