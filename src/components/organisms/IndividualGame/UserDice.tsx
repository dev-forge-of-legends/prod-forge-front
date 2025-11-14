import { DiceImages } from "@app-types/types";
import { getValidImageUrl } from "@app-utils/stringUtils";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

interface UserDiceProps {
  value: number;
  rollTimestamp: number; // Timestamp of when roll occurred
  nowMoving?: boolean;
  onClick: () => void;
}

const UserDice: React.FC<UserDiceProps> = ({
  value,
  rollTimestamp,
  nowMoving = false,
  onClick,
}) => {
  const [isRolling, setIsRolling] = useState(false);
  const [displayValue, setDisplayValue] = useState(value > 0 ? value : 0); // Default to 0 if invalid
  const lastTimestampRef = useRef<number>(0);

  useEffect(() => {
    // Skip if no timestamp (initial state)
    if (rollTimestamp === 0) {
      if (value >= 0 && value <= 6) {
        setDisplayValue(value);
      }
      return;
    }

    // Skip if same timestamp (no new roll)
    if (rollTimestamp === lastTimestampRef.current) {
      return;
    }

    // Skip invalid values
    if (value < 0 || value > 6) {
      return;
    }

    // New roll detected! (timestamp changed)
    lastTimestampRef.current = rollTimestamp;

    setIsRolling(true);

    // Simulate rolling animation by changing numbers quickly
    let rollCount = 0;
    const rollInterval = setInterval(() => {
      const randomValue = Math.floor(Math.random() * 6) + 1;
      setDisplayValue(randomValue);
      rollCount++;

      if (rollCount >= 10) {
        clearInterval(rollInterval);
        setDisplayValue(value);
        setIsRolling(false);
      }
    }, 80);

    return () => clearInterval(rollInterval);
  }, [rollTimestamp, value]); // Trigger when timestamp or value changes

  const handleClick = () => {
    if (nowMoving) onClick();
  };

  return (
    <div
      className={`flex flex-col items-center justify-center gap-2 ${
        nowMoving ? "cursor-pointer" : ""
      }`}
      onClick={handleClick}
    >
      <motion.div
        className={`flex items-center justify-center p-2 rounded-md ${
          nowMoving ? "border-yellow border-2 rounded-md" : ""
        }`}
        animate={
          nowMoving
            ? {
                boxShadow: [
                  "0 0 0px rgba(234, 179, 8, 0)",
                  "0 0 20px rgba(234, 179, 8, 0.6)",
                  "0 0 0px rgba(234, 179, 8, 0)",
                ],
              }
            : {}
        }
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        <AnimatePresence mode="wait">
          <motion.img
            key={`dice-${displayValue}`}
            src={(() => {
              const imageUrl = getValidImageUrl(DiceImages[displayValue]);
              return imageUrl;
            })()}
            alt="Dice"
            className="w-6 h-6"
            initial={
              isRolling
                ? {
                    rotateX: 0,
                    scale: 1,
                  }
                : {
                    scale: 0.8,
                    opacity: 0,
                  }
            }
            animate={
              isRolling
                ? {
                    rotateX: [0, 360, 720, 1080],
                    scale: [1, 1.15, 1.15, 1],
                  }
                : {
                    rotateX: 0,
                    scale: 1,
                    opacity: 1,
                  }
            }
            exit={{
              rotateX: 180,
              scale: 0.8,
              opacity: 0,
            }}
            transition={
              isRolling
                ? {
                    duration: 0.8,
                    ease: "easeInOut",
                  }
                : {
                    type: "spring",
                    stiffness: 500,
                    damping: 25,
                  }
            }
            whileHover={nowMoving ? { scale: 1.1 } : {}}
            whileTap={nowMoving ? { scale: 0.95 } : {}}
          />
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default UserDice;
