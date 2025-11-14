import { DEFAULT_AVATAR_URL } from "@app-types/constants";
import { PAWN_COLORS } from "@app-types/types";
import {
  calculateSteps,
  canPawnMove,
  getCoords,
  getMovementPath,
  getPositionAfterMove,
  Pawn,
  PawnColor,
  PawnImages,
  Player
} from "@app-utils/gamePlayUtils";
import { getValidImageUrl } from "@app-utils/stringUtils";
import { Image } from "@components/atoms/Image";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import AnimatedPawn from "./AnimatedPawn";
import UserDice from "./UserDice";

interface BoardProps {
  players: Player[];
  pawns: Pawn[];
  movingPlayerColor: string;
  rolledNumber: number;
  nowMoving: boolean;
  onMovePawn: (pawnId: string) => void;
  rollDice: () => void;
  timeLimit: number;
  leftTime: number;
}

const killingEffectVariants = {
  initial: { scale: 0, opacity: 0 },
  animate: {
    scale: [0, 1.5, 2],
    opacity: [0.8, 0.5, 0],
    transition: { duration: 0.6 }
  }
};

const hintPawnVariants = {
  initial: { scale: 0, opacity: 0 },
  animate: {
    scale: 1,
    opacity: 0.6,
    transition: { type: "spring" as const, stiffness: 300 }
  },
  exit: { scale: 0, opacity: 0 }
};

const BASE_BOARD_SIZE = 456;
const COMPACT_BOARD_SIZE = 360;
const COMPACT_BREAKPOINT = 768;
const BASE_PAWN_OFFSET_Y = 10;
const BASE_HINT_PAWN_WIDTH = 30;
const BASE_HINT_PAWN_HEIGHT = 40;
const BASE_KILLING_EFFECT_SIZE = 40;
const BASE_PATH_DOT_OFFSET = 10;
const BASE_PATH_DOT_SIZE = 10;

const Board: React.FC<BoardProps> = (props) => {
  const {
    players,
    pawns,
    movingPlayerColor,
    rolledNumber,
    nowMoving,
    onMovePawn,
    rollDice,
    timeLimit,
    leftTime,
  } = props;

  const currentPlayer = players.find(p => p.color === movingPlayerColor) || players[0];

  const [hintPawn, setHintPawn] = useState<Pawn | null>(null);
  const [movingPawnId, setMovingPawnId] = useState<string | null>(null);
  const [movementPath, setMovementPath] = useState<number[]>([]);
  const [pathDots, setPathDots] = useState<Array<{ position: number; color: string; index: number }>>([]);
  const [killedPawnId, setKilledPawnId] = useState<string | null>(null);
  const [killedPawnPosition, setKilledPawnPosition] = useState<{ [key: string]: number }>({});
  const [killingEffect, setKillingEffect] = useState<{ x: number, y: number } | null>(null);
  const [respawningPawnId, setRespawningPawnId] = useState<string | null>(null);
  const [previousPawns, setPreviousPawns] = useState<Pawn[]>([]);
  const [animatedMoves, setAnimatedMoves] = useState<Set<string>>(new Set());
  const [isCompactBoard, setIsCompactBoard] = useState<boolean>(false);

  // Local countdown timer for progress bar
  const [timePercentage, setTimePercentage] = useState((leftTime / timeLimit) * 100);
  const timeRef = useRef(leftTime);

  // Countdown timer
  useEffect(() => {
    const interval = setInterval(() => {
      if (timeRef.current <= 0) {
        clearInterval(interval);
        return;
      }
      timeRef.current = timeRef.current - 0.1;
      setTimePercentage((timeRef.current / timeLimit) * 100);
    }, 100);

    return () => clearInterval(interval);
  }, [timeLimit, leftTime, nowMoving]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const updateBoardSize = () => {
      setIsCompactBoard(window.innerWidth < COMPACT_BREAKPOINT);
    };
    updateBoardSize();
    window.addEventListener("resize", updateBoardSize);
    return () => window.removeEventListener("resize", updateBoardSize);
  }, []);

  const boardSize = isCompactBoard ? COMPACT_BOARD_SIZE : BASE_BOARD_SIZE;
  const scaleFactor = boardSize / BASE_BOARD_SIZE;

  const handlePawnClick = (pawn: Pawn) => {
    if (!canPawnMove(pawn, rolledNumber)) return;

    // Calculate the movement path
    const path = getMovementPath(pawn, rolledNumber);
    setMovementPath(path);

    // Trigger moving animation
    setMovingPawnId(pawn.id);

    // Mark this move as animated to prevent double animation
    const moveKey = `${pawn.id}-${getPositionAfterMove(pawn, rolledNumber)}`;
    setAnimatedMoves(prev => new Set(prev).add(moveKey));

    // Get pawn color for dots
    const getPawnColorHex = (color: string) => {
      switch (color) {
      case PAWN_COLORS.Green: return '#22c55e';
      case PAWN_COLORS.Red: return '#ef4444';
      case PAWN_COLORS.Blue: return '#3b82f6';
      case PAWN_COLORS.Yellow: return '#eab308';
      default: return '#ffffff';
      }
    };

    // Show dots one by one as pawn moves
    path.forEach((position, index) => {
      setTimeout(() => {
        setPathDots(prev => [...prev, { position, color: getPawnColorHex(pawn.color), index }]);
      }, index * 150);
    });

    // Check if this move will kill another pawn
    const targetPosition = getPositionAfterMove(pawn, rolledNumber);
    const targetPawn = pawns.find(p =>
      p.position === targetPosition &&
      p.color !== pawn.color &&
      p.id !== pawn.id
    );

    const animationDuration = path.length * 150;

    if (targetPawn) {
      setTimeout(() => {
        const { x, y } = getCoords(targetPosition);
        setKillingEffect({ x: x + 15, y: y + 15 });
        setKilledPawnId(targetPawn.id);

        // Clear killing effect after animation
        setTimeout(() => {
          setKillingEffect(null);
          setKilledPawnId(null);
        }, 600);
      }, animationDuration);
    }

    // Call the actual move function
    setTimeout(() => {
      onMovePawn(pawn.id);
      setMovingPawnId(null);
      setMovementPath([]);
      // Clear path dots after move completes
      setTimeout(() => {
        setPathDots([]);
        // Clear the animated move key after a delay
        setTimeout(() => {
          setAnimatedMoves(prev => {
            const newSet = new Set(prev);
            newSet.delete(moveKey);
            return newSet;
          });
        }, 1000);
      }, 300);
    }, animationDuration);

    setHintPawn(null);
  };

  const handleHoverStart = (pawn: Pawn) => {
    if (!nowMoving || !rolledNumber) return;
    if (!canPawnMove(pawn, rolledNumber)) return;
    if (currentPlayer.color !== pawn.color) return;

    const pawnPosition = getPositionAfterMove(pawn, rolledNumber);
    if (pawnPosition !== pawn.position) {
      setHintPawn({
        id: `hint-${pawn.id}`,
        position: pawnPosition,
        color: PAWN_COLORS.None,
        basePos: pawn.basePos
      });
    }
  };

  const handleHoverEnd = () => {
    setHintPawn(null);
  };

  // Detect when any pawn position changes (for animations from other players)
  useEffect(() => {
    if (previousPawns.length === 0) {
      setPreviousPawns(pawns);
      return;
    }

    // Check for any pawn position changes
    pawns.forEach((currentPawn) => {
      const prevPawn = previousPawns.find(p => p.id === currentPawn.id);

      if (prevPawn && prevPawn.position !== currentPawn.position) {
        // Check if pawn returned to base position (respawn/killed)
        if (currentPawn.position === currentPawn.basePos && prevPawn.position !== prevPawn.basePos) {
          // Pawn was killed and respawned
          const respawnMoveKey = `${currentPawn.id}-respawn-${Date.now()}`;

          // Don't trigger respawn if already animating
          if (!animatedMoves.has(respawnMoveKey)) {
            setAnimatedMoves(prev => new Set(prev).add(respawnMoveKey));

            // Store the killed pawn's position before it respawns
            setKilledPawnPosition(prev => ({
              ...prev,
              [currentPawn.id]: prevPawn.position
            }));

            // First mark as killed (if not already)
            if (killedPawnId !== currentPawn.id) {
              setKilledPawnId(currentPawn.id);

              // Show killing effect at the previous position
              const { x, y } = getCoords(prevPawn.position);
              setKillingEffect({ x: x + 15, y: y + 15 });

              // Clear killing effect
              setTimeout(() => {
                setKillingEffect(null);
                setKilledPawnId(null);
              }, 600);
            }

            // Then trigger respawn animation after killed animation
            setTimeout(() => {
              setRespawningPawnId(currentPawn.id);

              // Clear respawn animation after it completes
              setTimeout(() => {
                setRespawningPawnId(null);
                // Clear killed pawn position
                setKilledPawnPosition(prev => {
                  const newPos = { ...prev };
                  delete newPos[currentPawn.id];
                  return newPos;
                });
                setAnimatedMoves(prev => {
                  const newSet = new Set(prev);
                  newSet.delete(respawnMoveKey);
                  return newSet;
                });
              }, 500);
            }, 650); // Slightly after the killed animation ends
          }
        } else if (currentPawn.position !== currentPawn.basePos) {
          // Normal pawn movement (not a respawn)
          const moveKey = `${currentPawn.id}-${currentPawn.position}`;

          // Only animate if this move hasn't been animated already (prevent double animation)
          if (!animatedMoves.has(moveKey)) {
            // Calculate how many steps the pawn moved
            const steps = calculateSteps(prevPawn, currentPawn.position);

            // Get the movement path
            const path = getMovementPath(prevPawn, steps);

            setMovingPawnId(currentPawn.id);
            setMovementPath(path);

            // Mark this move as animated
            setAnimatedMoves(prev => new Set(prev).add(moveKey));

            // Get pawn color for dots
            const getPawnColorHex = (color: string) => {
              switch (color) {
              case PAWN_COLORS.Green: return '#22c55e';
              case PAWN_COLORS.Red: return '#ef4444';
              case PAWN_COLORS.Blue: return '#3b82f6';
              case PAWN_COLORS.Yellow: return '#eab308';
              default: return '#ffffff';
              }
            };

            // Show dots one by one as pawn moves
            path.forEach((position, index) => {
              setTimeout(() => {
                setPathDots(prev => [...prev, { position, color: getPawnColorHex(currentPawn.color), index }]);
              }, index * 150);
            });

            // Check if this move killed another pawn
            const targetPawn = previousPawns.find(p =>
              p.position === currentPawn.position &&
              p.color !== currentPawn.color &&
              p.id !== currentPawn.id
            );

            const animationDuration = path.length * 150;

            if (targetPawn) {
              setTimeout(() => {
                const { x, y } = getCoords(currentPawn.position);
                setKillingEffect({ x: x + 15, y: y + 15 });
                setKilledPawnId(targetPawn.id);

                // Clear killing effect after animation
                setTimeout(() => {
                  setKillingEffect(null);
                  setKilledPawnId(null);
                }, 600);
              }, animationDuration);
            }

            // Clear animation states after movement completes
            setTimeout(() => {
              setMovingPawnId(null);
              setMovementPath([]);
              setTimeout(() => {
                setPathDots([]);
                // Clear the animated move key after a delay
                setTimeout(() => {
                  setAnimatedMoves(prev => {
                    const newSet = new Set(prev);
                    newSet.delete(moveKey);
                    return newSet;
                  });
                }, 1000);
              }, 300);
            }, animationDuration);
          }
        }
      }
    });

    setPreviousPawns(pawns);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pawns]);

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="w-full flex flex-col gap-2">
        {/* Player info - Top */}
        <div className="flex justify-between">
          <div className="flex items-center gap-2">
            <motion.div
              className="relative overflow-hidden flex items-center justify-between gap-2 border-green-500 border-2 rounded-full p-1 pr-2"
              animate={movingPlayerColor === players[0].color ? {
                boxShadow: ['0 0 0px rgba(34, 197, 94, 0.5)', '0 0 20px rgba(34, 197, 94, 0.8)', '0 0 0px rgba(34, 197, 94, 0.5)']
              } : {}}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              {/* Progress bar background */}
              {movingPlayerColor === players[0].color && (
                <motion.div
                  className="absolute inset-0 bg-green-500/30"
                  initial={{ width: '100%' }}
                  animate={{ width: `${timePercentage}%` }}
                  transition={{ duration: timeLimit }}
                />
              )}
              <Image
                src={players[0].user.avatar || DEFAULT_AVATAR_URL}
                alt={"User"}
                className="w-8 h-8 rounded-full border-1 border-white relative z-10"
              />
              <div className="relative z-10">
                <p className="text-white text-xs font-semibold">{players[0].user.userName}</p>
                <p className="text-white text-xs">Level: {players[0].user.level}</p>
              </div>
            </motion.div>
            {movingPlayerColor === players[0].color && (
              <UserDice value={rolledNumber | 0} rollTimestamp={0} nowMoving={nowMoving} onClick={rollDice} />
            )}
          </div>
          <div className="flex items-center gap-2">
            {movingPlayerColor === players[3].color && (
              <UserDice value={rolledNumber | 0} rollTimestamp={0} nowMoving={nowMoving} onClick={rollDice} />
            )}
            <motion.div
              className="relative overflow-hidden flex items-center justify-between gap-2 border-yellow-500 border-2 rounded-full p-1 pl-2"
              animate={movingPlayerColor === players[3].color ? {
                boxShadow: ['0 0 0px rgba(234, 179, 8, 0.5)', '0 0 20px rgba(234, 179, 8, 0.8)', '0 0 0px rgba(234, 179, 8, 0.5)']
              } : {}}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              {/* Progress bar background */}
              {movingPlayerColor === players[3].color && (
                <motion.div
                  className="absolute inset-0 bg-yellow-500/30"
                  initial={{ width: '100%' }}
                  animate={{ width: `${timePercentage}%` }}
                  transition={{ duration: timeLimit }}
                />
              )}
              <div className="relative z-10">
                <p className="text-white text-xs font-semibold text-right">{players[3].user.userName}</p>
                <p className="text-white text-xs text-right">Level: {players[3].user.level}</p>
              </div>
              <Image
                src={players[3].user.avatar || DEFAULT_AVATAR_URL}
                alt={"User"}
                className="w-8 h-8 rounded-full relative z-10"
              />
            </motion.div>
          </div>
        </div>

        {/* Game Board */}
        <div className="relative" style={{ width: boardSize, height: boardSize }}>
          {/* Board background */}
          <img
            src="https://forge-dev-assets.sfo3.digitaloceanspaces.com/assets/images/play/Board_Empty.webp"
            alt="Game Board"
            className="absolute inset-0 w-full h-full select-none"
            draggable={false}
          />

          {/* Path Dots */}
          <AnimatePresence>
            {pathDots.map((dot, idx) => {
              const { x, y } = getCoords(dot.position);
              return (
                <motion.div
                  key={`dot-${dot.position}-${dot.index}-${idx}`}
                  className="absolute pointer-events-none"
                  style={{
                    left: (x + BASE_PATH_DOT_OFFSET) * scaleFactor,
                    top: (y + BASE_PATH_DOT_OFFSET) * scaleFactor,
                    width: BASE_PATH_DOT_SIZE * scaleFactor,
                    height: BASE_PATH_DOT_SIZE * scaleFactor,
                    backgroundColor: dot.color,
                    borderRadius: '50%',
                    boxShadow: `0 0 10px ${dot.color}`,
                  }}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{
                    scale: [0, 1.2, 0.8, 1],
                    opacity: [0, 1, 1, 0.7]
                  }}
                  exit={{
                    scale: 0,
                    opacity: 0,
                    transition: { duration: 0.3 }
                  }}
                  transition={{
                    duration: 0.4,
                    ease: "easeOut"
                  }}
                />
              );
            })}
          </AnimatePresence>

          {/* Pawns */}
          <AnimatePresence mode="popLayout">
            {pawns.map((pawn) => {
              const isMovable = canPawnMove(pawn, rolledNumber) &&
                currentPlayer.color === pawn.color &&
                nowMoving;

              return (
                <AnimatedPawn
                  key={pawn.id}
                  pawn={pawn}
                  isMovable={isMovable}
                  isHovered={hintPawn?.id === `hint-${pawn.id}`}
                  isMoving={movingPawnId === pawn.id}
                  movementPath={movingPawnId === pawn.id ? movementPath : []}
                  isBeingKilled={killedPawnId === pawn.id}
                  killedAtPosition={killedPawnPosition[pawn.id]}
                  isRespawning={respawningPawnId === pawn.id}
                  onClick={() => handlePawnClick(pawn)}
                  onHoverStart={() => handleHoverStart(pawn)}
                  onHoverEnd={handleHoverEnd}
                  scaleFactor={scaleFactor}
                />
              );
            })}

            {/* Hint Pawn (Preview) */}
            {hintPawn && (
              <motion.div
                key={hintPawn.id}
                className="absolute pointer-events-none"
                style={{
                  left: getCoords(hintPawn.position).x * scaleFactor,
                  top: getCoords(hintPawn.position).y * scaleFactor - BASE_PAWN_OFFSET_Y * scaleFactor,
                  width: BASE_HINT_PAWN_WIDTH * scaleFactor,
                  height: BASE_HINT_PAWN_HEIGHT * scaleFactor
                }}
                variants={hintPawnVariants}
                initial="initial"
                animate="animate"
                exit="exit"
              >
                <img
                  src={getValidImageUrl(PawnImages[
                    pawns.find(p => hintPawn.id === `hint-${p.id}`)?.color as unknown as PawnColor
                  ])}
                  alt="hint"
                  className="w-full h-full opacity-60"
                />
              </motion.div>
            )}

            {/* Killing Effect */}
            {killingEffect && (
              <motion.div
                key="killing-effect"
                className="absolute pointer-events-none"
                style={{
                  left: killingEffect.x * scaleFactor - (BASE_KILLING_EFFECT_SIZE * scaleFactor) / 2,
                  top: killingEffect.y * scaleFactor - (BASE_KILLING_EFFECT_SIZE * scaleFactor) / 2,
                  width: BASE_KILLING_EFFECT_SIZE * scaleFactor,
                  height: BASE_KILLING_EFFECT_SIZE * scaleFactor
                }}
                variants={killingEffectVariants}
                initial="initial"
                animate="animate"
              >
                <div className="w-full h-full rounded-full bg-red-500 opacity-50" />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Player info - Bottom */}
        <div className="flex justify-between">
          <div className="flex items-center gap-2">
            <motion.div
              className="relative overflow-hidden flex items-center justify-between gap-2 border-red-500 border-2 rounded-full p-1 pr-2"
              animate={movingPlayerColor === players[1].color ? {
                boxShadow: ['0 0 0px rgba(239, 68, 68, 0.5)', '0 0 20px rgba(239, 68, 68, 0.8)', '0 0 0px rgba(239, 68, 68, 0.5)']
              } : {}}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              {/* Progress bar background */}
              {movingPlayerColor === players[1].color && (
                <motion.div
                  className="absolute inset-0 bg-red-500/30"
                  initial={{ width: '100%' }}
                  animate={{ width: `${timePercentage}%` }}
                  transition={{ duration: timeLimit }}
                />
              )}
              <Image
                src={players[1].user.avatar || DEFAULT_AVATAR_URL}
                alt={"User"}
                className="w-8 h-8 rounded-full relative z-10"
              />
              <div className="relative z-10">
                <p className="text-white text-xs font-semibold">{players[1].user.userName}</p>
                <p className="text-white text-xs">Level: {players[1].user.level}</p>
              </div>
            </motion.div>
            {movingPlayerColor === players[1].color && (
              <UserDice value={rolledNumber | 0} rollTimestamp={0} nowMoving={nowMoving} onClick={rollDice} />
            )}
          </div>
          <div className="flex items-center gap-2">
            {movingPlayerColor === players[2].color && (
              <UserDice value={rolledNumber | 0} rollTimestamp={0} nowMoving={nowMoving} onClick={rollDice} />
            )}
            <motion.div
              className="relative overflow-hidden flex items-center justify-between gap-2 border-blue-500 border-2 rounded-full p-1 pl-2"
              animate={movingPlayerColor === players[2].color ? {
                boxShadow: ['0 0 0px rgba(59, 130, 246, 0.5)', '0 0 20px rgba(59, 130, 246, 0.8)', '0 0 0px rgba(59, 130, 246, 0.5)']
              } : {}}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              {/* Progress bar background */}
              {movingPlayerColor === players[2].color && (
                <motion.div
                  className="absolute inset-0 bg-blue-500/30"
                  initial={{ width: '100%' }}
                  animate={{ width: `${timePercentage}%` }}
                  transition={{ duration: 0.5 }}
                />
              )}
              <div className="relative z-10">
                <p className="text-white text-xs font-semibold text-right">{players[2].user.userName}</p>
                <p className="text-white text-xs text-right">Level: {players[2].user.level}</p>
              </div>
              <Image
                src={players[2].user.avatar || DEFAULT_AVATAR_URL}
                alt={"User"}
                className="w-8 h-8 rounded-full relative z-10"
              />
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Board;

