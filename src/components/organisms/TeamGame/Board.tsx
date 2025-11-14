import { DEFAULT_AVATAR_URL } from "@app-types/constants";
import { PAWN_COLORS } from "@app-types/types";
import {
  canPawnMove,
  getCoords,
  getPositionAfterMove,
  Pawn,
  PawnColor,
  PawnImages,
  PlayerAsTeam
} from "@app-utils/gamePlayUtils";
import { getValidImageUrl } from "@app-utils/stringUtils";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Image } from "../../atoms/Image";
import AnimatedPawn from "../IndividualGame/AnimatedPawn";

const BASE_BOARD_SIZE = 456;
const COMPACT_BOARD_SIZE = 360;
const COMPACT_BREAKPOINT = 768;
const BASE_PAWN_OFFSET_Y = 10;
const BASE_HINT_PAWN_WIDTH = 30;
const BASE_HINT_PAWN_HEIGHT = 40;
const BASE_KILLING_EFFECT_SIZE = 40;

interface BoardProps {
  players: PlayerAsTeam[];
  pawns: Pawn[];
  movingPlayerColor: string;
  rolledNumber: number;
  nowMoving: boolean;
  onVotePawn: (pawnId: string) => void;
  selectedPawnId: string | null;
  hoveredPawnId: string | null;
  onHoverPawn: (pawnId: string | null) => void;
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

export const Board: React.FC<BoardProps> = (props) => {
  const {
    players,
    pawns,
    movingPlayerColor,
    rolledNumber,
    nowMoving,
    onVotePawn,
    selectedPawnId,
    hoveredPawnId,
    onHoverPawn,
  } = props;

  const currentPlayer = players.find(p => p.color === movingPlayerColor) || players[0];

  const [hintPawn, setHintPawn] = useState<Pawn | null>(null);
  const [movingPawnId, setMovingPawnId] = useState<string | null>(null);
  const [killedPawnId, setKilledPawnId] = useState<string | null>(null);
  const [killingEffect, setKillingEffect] = useState<{ x: number, y: number } | null>(null);
  const [respawningPawnId, setRespawningPawnId] = useState<string | null>(null);
  const [previousPawns, setPreviousPawns] = useState<Pawn[]>([]);
  const [isCompactBoard, setIsCompactBoard] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const updateBoardSize = () => {
      setIsCompactBoard(window.innerWidth < COMPACT_BREAKPOINT);
    };
    updateBoardSize();
    window.addEventListener("resize", updateBoardSize);
    return () => {
      window.removeEventListener("resize", updateBoardSize);
    };
  }, []);

  const boardSize = isCompactBoard ? COMPACT_BOARD_SIZE : BASE_BOARD_SIZE;
  const scaleFactor = boardSize / BASE_BOARD_SIZE;

  const handlePawnClick = (pawn: Pawn) => {
    if (!canPawnMove(pawn, rolledNumber)) return;

    // Trigger moving animation
    setMovingPawnId(pawn.id);

    // Check if this move will kill another pawn
    const targetPosition = getPositionAfterMove(pawn, rolledNumber);
    const targetPawn = pawns.find(p =>
      p.position === targetPosition &&
      p.color !== pawn.color &&
      p.id !== pawn.id
    );

    if (targetPawn) {
      const { x, y } = getCoords(targetPosition);
      setKillingEffect({ x: x + 15, y: y + 15 });
      setKilledPawnId(targetPawn.id);

      // Clear killing effect after animation
      setTimeout(() => {
        setKillingEffect(null);
        setKilledPawnId(null);
      }, 600);
    }

    // Call the actual move function
    setTimeout(() => {
      onVotePawn(pawn.id);
      setMovingPawnId(null);
    }, 300);

    setHintPawn(null);
  };

  const handleHoverStart = (pawn: Pawn) => {
    onHoverPawn(pawn.id);
  };

  const handleHoverEnd = () => {
    onHoverPawn(null);
  };

  // Compute hint pawn based on hoveredPawnId
  useEffect(() => {
    if (!hoveredPawnId || !nowMoving || !rolledNumber) {
      setHintPawn(null);
      return;
    }

    const pawn = pawns.find(p => p.id === hoveredPawnId);
    if (!pawn) {
      setHintPawn(null);
      return;
    }

    if (!canPawnMove(pawn, rolledNumber)) {
      setHintPawn(null);
      return;
    }

    if (currentPlayer.color !== pawn.color) {
      setHintPawn(null);
      return;
    }

    const pawnPosition = getPositionAfterMove(pawn, rolledNumber);
    if (pawnPosition !== pawn.position) {
      setHintPawn({
        id: `hint-${pawn.id}`,
        position: pawnPosition,
        color: PAWN_COLORS.None,
        basePos: pawn.basePos
      });
    } else {
      setHintPawn(null);
    }
  }, [hoveredPawnId, nowMoving, rolledNumber, pawns, currentPlayer.color]);

  // Detect when a pawn respawns (position changes to basePos)
  useEffect(() => {
    if (previousPawns.length === 0) {
      setPreviousPawns(pawns);
      return;
    }

    // Check for respawned pawns (killed pawns returning to base)
    pawns.forEach((currentPawn) => {
      const prevPawn = previousPawns.find(p => p.id === currentPawn.id);

      if (prevPawn && prevPawn.position !== currentPawn.position) {
        // Check if pawn returned to base position
        if (currentPawn.position === currentPawn.basePos && prevPawn.position !== prevPawn.basePos) {
          // Pawn was killed and respawned
          setRespawningPawnId(currentPawn.id);

          // Clear respawn animation after it completes
          setTimeout(() => {
            setRespawningPawnId(null);
          }, 600);
        }
      }
    });

    setPreviousPawns(pawns);
  }, [pawns]);

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="w-full flex flex-col gap-2">
        {/* Player info - Top */}
        <div className="flex justify-between">
          <motion.div
            className="flex items-center justify-between gap-2 border-green-500 border-2 rounded-full p-1 pr-2"
            animate={movingPlayerColor === players[0].color ? {
              boxShadow: ['0 0 0px rgba(34, 197, 94, 0.5)', '0 0 20px rgba(34, 197, 94, 0.8)', '0 0 0px rgba(34, 197, 94, 0.5)']
            } : {}}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <Image
              src={players[0].team.avatar || DEFAULT_AVATAR_URL}
              alt={"User"}
              className="w-6 h-6 rounded-full"
            />
            <p className="text-white text-sm">{players[0].team.name}</p>
          </motion.div>
          <motion.div
            className="flex items-center justify-between gap-2 border-yellow-500 border-2 rounded-full p-1 pl-2"
            animate={movingPlayerColor === players[3].color ? {
              boxShadow: ['0 0 0px rgba(234, 179, 8, 0.5)', '0 0 20px rgba(234, 179, 8, 0.8)', '0 0 0px rgba(234, 179, 8, 0.5)']
            } : {}}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <p className="text-white text-sm">{players[3].team.name}</p>
            <Image
              src={players[3].team.avatar || DEFAULT_AVATAR_URL}
              alt={"User"}
              className="w-6 h-6 rounded-full"
            />
          </motion.div>
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
                  isBeingKilled={killedPawnId === pawn.id}
                  isRespawning={respawningPawnId === pawn.id}
                  isSelected={selectedPawnId === pawn.id}
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
          <motion.div
            className="flex items-center justify-between gap-2 border-red-500 border-2 rounded-full p-1 pr-2"
            animate={movingPlayerColor === players[1].color ? {
              boxShadow: ['0 0 0px rgba(239, 68, 68, 0.5)', '0 0 20px rgba(239, 68, 68, 0.8)', '0 0 0px rgba(239, 68, 68, 0.5)']
            } : {}}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <Image
              src={players[1].team.avatar || DEFAULT_AVATAR_URL}
              alt={"User"}
              className="w-6 h-6 rounded-full"
            />
            <p className="text-white text-sm">{players[1].team.name}</p>
          </motion.div>
          <motion.div
            className="flex items-center justify-between gap-2 border-blue-500 border-2 rounded-full p-1 pl-2"
            animate={movingPlayerColor === players[2].color ? {
              boxShadow: ['0 0 0px rgba(59, 130, 246, 0.5)', '0 0 20px rgba(59, 130, 246, 0.8)', '0 0 0px rgba(59, 130, 246, 0.5)']
            } : {}}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <p className="text-white text-sm">{players[2].team.name}</p>
            <Image
              src={players[2].team.avatar || DEFAULT_AVATAR_URL}
              alt={"User"}
              className="w-6 h-6 rounded-full"
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
};


