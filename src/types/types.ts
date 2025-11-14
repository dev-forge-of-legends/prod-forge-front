export const DiceImages = [
  '/assets/images/play/hand.webp',
  '/assets/images/play/Dice1.webp',
  '/assets/images/play/Dice2.webp',
  '/assets/images/play/Dice3.webp',
  '/assets/images/play/Dice4.webp',
  '/assets/images/play/Dice5.webp',
  '/assets/images/play/Dice6.webp',
];

export enum PAWN_COLORS {
  None = "none",
  Red = "red",
  Blue = "blue",
  Green = "green",
  Yellow = "yellow",
}

export interface PawnEntity {
  id: string;
  color: PAWN_COLORS;
  basePos: number;
  position: number;
  _id?: string; // For compatibility with existing code
  touchableArea?: Path2D; // For canvas interaction
}

export type PawnImages = {
  [PAWN_COLORS.Red]: '/assets/images/play/Pawn_Red.webp',
  [PAWN_COLORS.Blue]: '/assets/images/play/Pawn_Blue.webp',
  [PAWN_COLORS.Green]: '/assets/images/play/Pawn_Green.webp',
  [PAWN_COLORS.Yellow]: '/assets/images/play/Pawn_Yellow.webp',
}

// Legacy alias for backward compatibility
export enum PawnColor {
  Red = 'red',
  Blue = 'blue',
  Green = 'green',
  Yellow = 'yellow',
}
