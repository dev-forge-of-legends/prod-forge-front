export const positionMapCoords = [
  // Green base
  {x: 2.35, y: 1.45}, // 0
  {x: 1.4, y: 2.3},
  {x: 3.3, y: 2.3},
  {x: 2.35, y: 3.25},
  // Red base
  {x: 2.3, y: 10.05},
  {x: 1.4, y: 10.9},
  {x: 3.2, y: 10.9},
  {x: 2.3, y: 11.85},
  // Blue base
  {x: 11.5, y: 10.15},
  {x: 10.6, y: 11.05},
  {x: 12.4, y: 11.05}, // 10
  {x: 11.5, y: 12},
  // Yellow base
  {x: 11.55, y: 1.45},
  {x: 10.65, y: 2.3},
  {x: 12.5, y: 2.3},
  {x: 11.55, y: 3.25},
  // Map - starting from Green field
  {x: 1, y: 6},
  {x: 2, y: 6},
  {x: 3, y: 6},
  {x: 4, y: 6},
  {x: 5, y: 6}, // 20

  {x: 6, y: 5},
  {x: 6, y: 4},
  {x: 6, y: 3},
  {x: 6, y: 2},
  {x: 6, y: 1},
  {x: 6, y: 0},
  // Top 
  {x: 7, y: 0},
  {x: 8, y: 0},
  {x: 8, y: 1},
  {x: 8, y: 2}, // 30
  {x: 8, y: 3},
  {x: 8, y: 4},
  {x: 8, y: 5},

  {x: 9, y: 6},
  {x: 10, y: 6},
  {x: 11, y: 6},
  {x: 12, y: 6},
  {x: 13, y: 6},
  {x: 14, y: 6},
  // Right
  {x: 14, y: 7}, // 40

  {x: 14, y: 8},
  {x: 13, y: 8},
  {x: 12, y: 8},
  {x: 11, y: 8},
  {x: 10, y: 8},
  {x: 9, y: 8},

  {x: 8, y: 9},
  {x: 8, y: 10},
  {x: 8, y: 11},
  {x: 8, y: 12}, // 50
  {x: 8, y: 13},
  {x: 8, y: 14}, 
  // Bottom
  {x: 7, y: 14},

  {x: 6, y: 14},
  {x: 6, y: 13},
  {x: 6, y: 12},
  {x: 6, y: 11},
  {x: 6, y: 10},
  {x: 6, y: 9},
 
  {x: 5, y: 8}, // 60
  {x: 4, y: 8},
  {x: 3, y: 8},
  {x: 2, y: 8},
  {x: 1, y: 8},

  {x: 0, y: 8},
  // Left 
  {x: 0, y: 7}, // 66
  // One behind green base
  {x: 0, y: 6}, //67
  // green end
  {x: 1, y: 7}, // 68
  {x: 2, y: 7},
  {x: 3, y: 7},
  {x: 4, y: 7},
  {x: 5, y: 7},
  {x: 6, y: 7}, // 73
  // red end
  {x: 7, y: 13}, // 74
  {x: 7, y: 12},
  {x: 7, y: 11}, 
  {x: 7, y: 10},
  {x: 7, y: 9},   
  {x: 7, y: 8}, // 79
  // blue end
  {x: 13, y: 7}, // 80
  {x: 12, y: 7},
  {x: 11, y: 7},
  {x: 10, y: 7},
  {x: 9, y: 7},
  {x: 8, y: 7}, // 85
  // Yellow base
  {x: 7, y: 1}, // 86
  {x: 7, y: 2}, 
  {x: 7, y: 3},
  {x: 7, y: 4},
  {x: 7, y: 5},
  {x: 7, y: 6}, // 91
];

export const offSetCoords = {
  x: 0.63,
  y: 0.63
}

export const MapScale = 28;

export const getCoords = (position: number) => {
  return {
    x: (offSetCoords.x + positionMapCoords[position].x) * MapScale,
    y: (offSetCoords.y + positionMapCoords[position].y) * MapScale,
  }
}

import { PAWN_COLORS } from "@app-types/types";

export enum PawnColor {
  Red = 'red',
  Blue = 'blue',
  Green = 'green',
  Yellow = 'yellow',
}

export const PawnImages = {
  [PawnColor.Red]: '/assets/images/play/Pawn_Red.webp',
  [PawnColor.Blue]: '/assets/images/play/Pawn_Blue.webp',
  [PawnColor.Green]: '/assets/images/play/Pawn_Green.webp',
  [PawnColor.Yellow]: '/assets/images/play/Pawn_Yellow.webp',
}

export interface Player {
  userId: string;
  status: string;
  invited: boolean;
  color: PAWN_COLORS;
  nowMoving: boolean;
  user: {
      userName: string;
      avatar: string;
      level: number;
  };
}

export interface PlayerAsTeam {
  teamId: string;
  status: string;
  invited: boolean;
  color: PAWN_COLORS;
  nowMoving: boolean;
  team: {
      name: string;
      avatar: string;
      level: number;
  };
}

export interface Pawn {
  id: string;
  color: string;
  basePos: number;
  position: number;
  touchableArea?: Path2D; // For canvas interaction
}

export interface MatchData {
  id: string;
  name: string;
  mode: string;
  avatar: string;
  createrId: string;
  isPublic: boolean;
  betCoins: number;
  startTime: string; // You can use Date if you prefer to handle dates
  timeLimit: number;
  endTime: string; // You can use Date if you prefer to handle dates
  players: Player[];
  pawns: Pawn[];
  status: string;
  winnerId: string;
  rolledNumber?: number;
  nextMoveTime?: number;
  winner?: number;
}

export interface TeamMatchData {
  id: string;
  name: string;
  mode: string;
  avatar: string;
  createrId: string;
  isPublic: boolean;
  betCoins: number;
  startTime: string; // You can use Date if you prefer to handle dates
  timeLimit: number;
  endTime: string; // You can use Date if you prefer to handle dates
  teams: PlayerAsTeam[];
  pawns: Pawn[];
  status: string;
  winnerId: string;
  rolledNumber?: number;
  nextMoveTime?: number;
  winner?: number;
}

export const canPawnMove = (pawn: Pawn, rolledNumber: number): boolean => {
  if (pawn.position === pawn.basePos && (rolledNumber === 6 || rolledNumber === 1)) {
    return true;
  }
  if (pawn.position !== getPositionAfterMove(pawn, rolledNumber) && pawn.position !== pawn.basePos) {
    return true;
  }
  return false;
};

export const getPositionAfterMove = (pawn: Pawn, rolledNumber: number): number => {
  const { position, color } = pawn;
  switch (color) {
    case PAWN_COLORS.Green: {
      if (position + rolledNumber <= 73) {
        if (position >= 0 && position <= 3) {
          return 16;
        } else if (position <= 66 && position + rolledNumber >= 67) {
          return position + rolledNumber + 1;
        } else {
          return position + rolledNumber;
        }
      } else {
        return position;
      }
    }
    case PAWN_COLORS.Red: {
      if (position + rolledNumber <= 79) {
        if (position >= 4 && position <= 7) {
          return 55;
        } else if (position <= 67 && position + rolledNumber > 67) {
          return position + rolledNumber - 52;
        } else if (position <= 53 && position + rolledNumber >= 54) {
          return position + rolledNumber + 20;
        } else {
          return position + rolledNumber;
        }
      } else {
        return position;
      }
    }
    case PAWN_COLORS.Blue: {
      if (position + rolledNumber <= 85) {
        if (position >= 8 && position <= 11) {
          return 42;
        } else if (position <= 67 && position + rolledNumber > 67) {
          return position + rolledNumber - 52;
        } else if (position <= 40 && position + rolledNumber >= 41) {
          return position + rolledNumber + 39;
        } else {
          return position + rolledNumber;
        }
      } else {
        return position;
      }
    }
    case PAWN_COLORS.Yellow: {
      if (position + rolledNumber <= 85) {
        if (position >= 12 && position <= 15) {
          return 29;
        } else if (position <= 67 && position + rolledNumber > 67) {
          return position + rolledNumber - 52;
        } else if (position <= 27 && position + rolledNumber >= 28) {
          return position + rolledNumber + 58;
        } else {
          return position + rolledNumber;
        }
      } else {
        return position;
      }
    }
    default: {
      return position;
    }
  }
};

// Get the full path from start to end position by calculating each step
export const getMovementPath = (pawn: Pawn, rolledNumber: number): number[] => {
  const path: number[] = [];
  
  // Build a temporary pawn object for each step
  let currentPawn = { ...pawn };
  
  if (currentPawn.position === currentPawn.basePos) {
    path.push(currentPawn.basePos);
  } else {
    for (let step = 1; step <= rolledNumber; step++) {
      const nextPos = getPositionAfterMove(currentPawn, 1);
      if (nextPos !== currentPawn.position) {
        path.push(nextPos);
        currentPawn = { ...currentPawn, position: nextPos };
      } else {
        break; // Can't move further
      }
    }
  }
  
  return path;
};

// Calculate the number of steps needed to get from startPos to endPos
export const calculateSteps = (pawn: Pawn, endPosition: number): number => {
  // Try each possible dice roll (1-6) to see which one results in the end position
  for (let steps = 1; steps <= 6; steps++) {
    const resultPosition = getPositionAfterMove(pawn, steps);
    if (resultPosition === endPosition) {
      return steps;
    }
  }
  
  // If no single roll works, the pawn might have moved from base (which can happen with 1 or 6)
  // In that case, return the difference if reasonable
  if (pawn.position === pawn.basePos) {
    return 1; // Moved out of base
  }
  
  // Fallback: estimate based on position difference
  return Math.min(6, Math.abs(endPosition - pawn.position));
};