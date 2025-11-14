import { getCoords, Pawn, PawnColor, PawnImages } from "@app-utils/gamePlayUtils";
import { getValidImageUrl } from "@app-utils/stringUtils";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface AnimatedPawnProps {
  pawn: Pawn;
  isMovable: boolean;
  isHovered: boolean;
  isMoving: boolean;
  isBeingKilled: boolean;
  isRespawning: boolean;
  isSelected?: boolean;
  movementPath?: number[];
  killedAtPosition?: number;
  onClick: () => void;
  onHoverStart: () => void;
  onHoverEnd: () => void;
  scaleFactor?: number;
}

const pawnVariants = {
  idle: { scale: 1, rotate: 0 },
  hover: {
    scale: 1.15,
    y: -5,
    transition: {
      type: "spring" as const,
      stiffness: 400,
      damping: 10
    }
  },
  moving: {
    scale: [1, 1.2, 1],
    rotate: [0, 10, -10, 0],
    transition: {
      duration: 0.5,
      ease: "easeInOut" as const
    }
  },
  killed: {
    scale: [1, 1.5, 0],
    rotate: [0, 180, 360],
    opacity: [1, 1, 0],
    transition: { duration: 0.6 }
  },
  respawn: {
    scale: [0, 1.2, 1],
    rotate: [0, 360],
    opacity: [0, 1],
    transition: { duration: 0.5 }
  }
};

const AnimatedPawn: React.FC<AnimatedPawnProps> = ({
  pawn,
  isMovable,
  isHovered,
  isMoving,
  isBeingKilled,
  isRespawning,
  isSelected = false,
  movementPath = [],
  killedAtPosition,
  onClick,
  onHoverStart,
  onHoverEnd,
  scaleFactor = 1
}) => {
  const [animatingPosition, setAnimatingPosition] = useState<number>(pawn.position);
  const BASE_PAWN_WIDTH = 30;
  const BASE_PAWN_HEIGHT = 40;
  const BASE_PAWN_OFFSET_Y = 10;
  const pawnWidth = BASE_PAWN_WIDTH * scaleFactor;
  const pawnHeight = BASE_PAWN_HEIGHT * scaleFactor;
  const pawnOffsetY = BASE_PAWN_OFFSET_Y * scaleFactor;

  // Handle path-based animation
  useEffect(() => {
    if (isMoving && movementPath.length > 0) {
      // Animate through each position in the path
      movementPath.forEach((position, index) => {
        setTimeout(() => {
          setAnimatingPosition(position);
        }, index * 150); // 150ms per step
      });
    } else if (isBeingKilled && killedAtPosition !== undefined) {
      // When being killed, stay at the position where it was killed
      setAnimatingPosition(killedAtPosition);
    } else if (isRespawning) {
      // When respawning, ensure pawn is at its base position
      setAnimatingPosition(pawn.position);
    } else if (!isBeingKilled) {
      // Update position normally (but not when being killed)
      setAnimatingPosition(pawn.position); // don't need to update, already is in the next position
    }
  }, [isMoving, movementPath, pawn.position, isRespawning, isBeingKilled, killedAtPosition]);

  const { x, y } = getCoords(animatingPosition);

  const getAnimation = () => {
    if (isBeingKilled) return "killed";
    if (isRespawning) return "respawn";
    if (isMoving) return "moving";
    if (isHovered && isMovable) return "hover";
    return "idle";
  };

  return (
    <motion.div
      key={pawn.id}
      className="absolute cursor-pointer"
      style={{
        left: x * scaleFactor,
        top: y * scaleFactor - pawnOffsetY,
        width: pawnWidth,
        height: pawnHeight
      }}
      variants={pawnVariants}
      initial={false}
      animate={{
        ...pawnVariants[getAnimation() as keyof typeof pawnVariants],
        x: 0,
        y: 0
      }}
      exit="killed"
      onClick={onClick}
      onHoverStart={onHoverStart}
      onHoverEnd={onHoverEnd}
      whileTap={isMovable ? { scale: 0.9 } : {}}
      transition={{
        duration: 0.15,
        ease: "easeInOut"
      }}
    >
      <img
        src={getValidImageUrl(PawnImages[pawn.color as unknown as PawnColor])}
        alt={`${pawn.color} pawn`}
        className="w-full h-full pointer-events-none select-none"
        draggable={false}
      />

      {/* Glow effect for movable pawns */}
      {isMovable && (
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{
            boxShadow: '0 0 15px rgba(248, 159, 23, 0.8)',
            filter: 'blur(4px)'
          }}
          animate={{
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      )}

      {/* Selected pawn indicator */}
      {isSelected && (
        <motion.div
          className="absolute inset-0 rounded-full border-4 border-white"
          style={{
            boxShadow: '0 0 20px rgba(255, 255, 255, 0.9)',
          }}
          animate={{
            opacity: [0.7, 1, 0.7],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      )}
    </motion.div>
  );
};

export default AnimatedPawn;