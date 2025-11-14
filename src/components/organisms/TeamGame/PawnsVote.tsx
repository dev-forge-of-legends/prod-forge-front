import { canPawnMove, Pawn } from "@app-utils/gamePlayUtils";
import { motion } from "framer-motion";

interface PawnsVoteProps {
  pawns: Pawn[];
  teamColor: string;
  selectedPawnId: string | null;
  onVotePawn: (pawnId: string) => void;
  onHoverPawn: (pawnId: string | null) => void;
  rolledNumber: number;
  nowMoving: boolean;
}

export const PawnsVote: React.FC<PawnsVoteProps> = (props) => {
  const {
    pawns,
    teamColor,
    selectedPawnId,
    onVotePawn,
    onHoverPawn,
    rolledNumber,
    nowMoving,
  } = props;
  // Filter pawns to show only the current team's pawns
  const teamPawns = pawns.filter((pawn) => pawn.color === teamColor);

  const handlePawnClick = (pawn: Pawn) => {
    // Only allow voting if the pawn can move
    if (!canPawnMove(pawn, rolledNumber) || !nowMoving) return;
    onVotePawn(pawn.id);
  };

  const getPawnNumber = (pawnId: string) => {
    // Extract pawn number from ID (e.g., "green-0" -> "1")
    const parts = pawnId.split("-");
    return parts.length > 1 ? parseInt(parts[1]) + 1 : 1;
  };

  return (
    <div className="flex w-full flex-row justify-between gap-2 px-1">
      {teamPawns.map((pawn) => {
        const isSelected = selectedPawnId === pawn.id;
        const isMoveable = canPawnMove(pawn, rolledNumber) && nowMoving;

        return (
          <motion.div
            key={pawn.id}
            className={`w-[23%] min-w-[70px] max-w-[110px] flex flex-col items-center justify-center gap-2 border-2 rounded-lg p-2 sm:p-3 transition-all ${
              !isMoveable
                ? "border-gray-600 bg-gray-800/30 cursor-not-allowed opacity-50"
                : isSelected
                ? "border-white bg-yellow-500/30 shadow-lg shadow-yellow-500/50 cursor-pointer"
                : "border-yellow-500 bg-transparent hover:bg-yellow-500/10 cursor-pointer"
            }`}
            onClick={() => handlePawnClick(pawn)}
            onMouseEnter={() => isMoveable && onHoverPawn(pawn.id)}
            onMouseLeave={() => onHoverPawn(null)}
            whileHover={isMoveable && !isSelected ? { scale: 1.05 } : {}}
            whileTap={isMoveable ? { scale: 0.95 } : {}}
            animate={
              isSelected
                ? {
                    boxShadow: [
                      "0 0 0px rgba(255, 255, 255, 0.5)",
                      "0 0 20px rgba(255, 255, 255, 0.8)",
                      "0 0 0px rgba(255, 255, 255, 0.5)",
                    ],
                  }
                : {
                    boxShadow: "0 0 0px rgba(255, 255, 255, 0)",
                    scale: 1,
                  }
            }
            transition={{
              duration: isSelected ? 1.5 : 0.2,
              repeat: isSelected ? Infinity : 0,
              repeatType: "loop",
            }}
          >
            <p
              className={`text-sm font-semibold ${
                isMoveable ? "text-white" : "text-gray-500"
              }`}
            >
              Pawn {getPawnNumber(pawn.id)}
            </p>
            <p className="text-gray-400 text-xs">
              {!isMoveable
                ? "Cannot move"
                : isSelected
                ? "✓ Voted"
                : "Click to vote"}
            </p>
          </motion.div>
        );
      })}
    </div>
  );
};
