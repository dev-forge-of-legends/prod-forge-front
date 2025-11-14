import { DEFAULT_AVATAR_URL } from "@app-types/constants";
import { PAWN_COLORS } from "@app-types/types";
import {
  canPawnMove,
  getCoords,
  getPositionAfterMove,
  Pawn,
  PawnColor,
  PawnImages,
  Player,
} from "@app-utils/gamePlayUtils";
import { getValidImageUrl } from "@app-utils/stringUtils";
import { Image } from "@components/atoms/Image";
import { useEffect, useRef, useState } from "react";

interface BoardProps {
  players: Player[];
  pawns: Pawn[];
  movingPlayerColor: string;
  rolledNumber: number;
  nowMoving: boolean;
  onMovePawn: (pawnId: string) => void;
}
const Board: React.FC<BoardProps> = (props) => {
  const {
    players,
    pawns,
    movingPlayerColor,
    rolledNumber,
    nowMoving,
    onMovePawn,
  } = props;

  // Get current player (you would get this from your state management)
  const currentPlayer =
    players.find((p) => p.color === movingPlayerColor) || players[0];

  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [hintPawn, setHintPawn] = useState<Pawn | null>(null);

  const paintPawn = (context: CanvasRenderingContext2D, pawn: Pawn): Path2D => {
    const { x, y } = getCoords(pawn.position);
    const touchableArea = new Path2D();
    touchableArea.arc(x + 14, y + 14, 14, 0, 2 * Math.PI);
    const image = new window.Image();
    image.src = getValidImageUrl(
      PawnImages[pawn.color as unknown as PawnColor]
    );
    image.onload = function () {
      context.drawImage(image, x, y - 10, 30, 40);
    };
    return touchableArea;
  };

  const handleCanvasClick = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const cursorX = event.clientX - rect.left;
    const cursorY = event.clientY - rect.top;

    for (const pawn of pawns) {
      if (
        pawn.touchableArea &&
        ctx.isPointInPath(pawn.touchableArea, cursorX, cursorY)
      ) {
        if (canPawnMove(pawn, rolledNumber)) {
          onMovePawn(pawn.id);
        }
      }
    }
    setHintPawn(null);
  };

  const handleMouseMove = (event: React.MouseEvent<HTMLCanvasElement>) => {
    if (!nowMoving || !rolledNumber) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    let foundHoverablePawn = false;
    let newHintPawn: Pawn | null = null;

    for (const pawn of pawns) {
      if (
        pawn.touchableArea &&
        ctx.isPointInPath(pawn.touchableArea, x, y) &&
        currentPlayer.color === pawn.color &&
        canPawnMove(pawn, rolledNumber)
      ) {
        const pawnPosition = getPositionAfterMove(pawn, rolledNumber);
        if (pawnPosition !== pawn.position) {
          foundHoverablePawn = true;
          if (hintPawn && hintPawn.id === pawn.id) return;
          newHintPawn = {
            id: pawn.id || "",
            position: pawnPosition,
            color: PAWN_COLORS.None,
            basePos: pawn.basePos,
          };
          break;
        }
      }
    }

    // Only update cursor when it actually changes
    const newCursor = foundHoverablePawn ? "pointer" : "default";
    if (canvas.style.cursor !== newCursor) {
      canvas.style.cursor = newCursor;
    }

    // Only update hint pawn when it actually changes
    if (newHintPawn && (!hintPawn || hintPawn.id !== newHintPawn.id)) {
      setHintPawn(newHintPawn);
    } else if (!foundHoverablePawn && hintPawn) {
      setHintPawn(null);
    }
  };

  useEffect(() => {
    const rerenderCanvas = (pawns: Pawn[]) => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const canvasSize = 456;
      canvas.width = canvasSize;
      canvas.height = canvasSize;

      const image = new window.Image();
      image.src =
        "https://forge-dev-assets.sfo3.digitaloceanspaces.com/assets/images/play/Board_Empty.webp";
      image.onload = function () {
        // Clear canvas
        ctx.clearRect(0, 0, canvasSize, canvasSize);

        // Draw the board image scaled to fit the canvas
        ctx.drawImage(image, 0, 0, canvasSize, canvasSize);

        pawns.forEach((pawn, index) => {
          if (pawns[index]) {
            pawns[index].touchableArea = paintPawn(ctx, pawn);
          }
        });
        if (hintPawn) {
          paintPawn(ctx, hintPawn);
        }
      };
    };
    rerenderCanvas(pawns);
  }, [hintPawn, pawns]);

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="w-full flex flex-col gap-2">
        <div className="flex justify-between">
          <div className="flex items-center justify-between gap-2 border-green-500 border-2 rounded-full p-1 pr-2">
            <Image
              src={players[0].user.avatar || DEFAULT_AVATAR_URL}
              alt={"User"}
              className="w-6 h-6 rounded-full"
            />
            <p className="text-white text-sm">{players[0].user.userName}</p>
          </div>
          <div className="flex items-center justify-between gap-2 border-yellow-500 border-2 rounded-full p-1 pl-2">
            <p className="text-white text-sm">{players[3].user.userName}</p>
            <Image
              src={players[3].user.avatar || DEFAULT_AVATAR_URL}
              alt={"User"}
              className="w-6 h-6 rounded-full"
            />
          </div>
        </div>
        <div>
          <canvas
            className="canvas-container"
            width={456}
            height={456}
            ref={canvasRef}
            onClick={handleCanvasClick}
            onMouseMove={handleMouseMove}
          />
        </div>
        <div className="flex justify-between">
          <div className="flex items-center justify-between gap-2 border-red-500 border-2 rounded-full p-1 pr-2">
            <Image
              src={players[1].user.avatar || DEFAULT_AVATAR_URL}
              alt={"User"}
              className="w-6 h-6 rounded-full"
            />
            <p className="text-white text-sm">{players[1].user.userName}</p>
          </div>
          <div className="flex items-center justify-between gap-2 border-blue-500 border-2 rounded-full p-1 pl-2">
            <p className="text-white text-sm">{players[2].user.userName}</p>
            <Image
              src={players[2].user.avatar || DEFAULT_AVATAR_URL}
              alt={"User"}
              className="w-6 h-6 rounded-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Board;
