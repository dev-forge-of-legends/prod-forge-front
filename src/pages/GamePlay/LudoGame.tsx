import { AnimatePresence, motion } from 'framer-motion';
import { Clock, Dice1, Dice2, Dice3, Dice4, Dice5, Dice6, Home, RotateCcw, Trophy, Users } from 'lucide-react';
import React, { useCallback, useState } from 'react';
import { Link } from 'react-router-dom';

interface Player {
  id: number;
  name: string;
  color: string;
  pieces: Piece[];
  isActive: boolean;
  hasWon: boolean;
}

interface Piece {
  id: number;
  position: number; // -1 means in home, 0-51 means on board, 52+ means in safe zone
  isInSafeZone: boolean;
  isInHome: boolean;
}

interface GameState {
  players: Player[];
  currentPlayer: number;
  diceValue: number;
  gameStatus: 'waiting' | 'playing' | 'finished';
  winner: Player | null;
  moves: number;
  canRollDice: boolean;
  selectedPiece: number | null;
}

const LudoGame: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>({
    players: [
      {
        id: 0,
        name: 'Player 1',
        color: 'red',
        pieces: Array.from({ length: 4 }, (_, i) => ({
          id: i,
          position: -1,
          isInSafeZone: false,
          isInHome: true
        })),
        isActive: true,
        hasWon: false
      },
      {
        id: 1,
        name: 'Player 2',
        color: 'blue',
        pieces: Array.from({ length: 4 }, (_, i) => ({
          id: i,
          position: -1,
          isInSafeZone: false,
          isInHome: true
        })),
        isActive: false,
        hasWon: false
      },
      {
        id: 2,
        name: 'Player 3',
        color: 'green',
        pieces: Array.from({ length: 4 }, (_, i) => ({
          id: i,
          position: -1,
          isInSafeZone: false,
          isInHome: true
        })),
        isActive: false,
        hasWon: false
      },
      {
        id: 3,
        name: 'Player 4',
        color: 'yellow',
        pieces: Array.from({ length: 4 }, (_, i) => ({
          id: i,
          position: -1,
          isInSafeZone: false,
          isInHome: true
        })),
        isActive: false,
        hasWon: false
      }
    ],
    currentPlayer: 0,
    diceValue: 0,
    gameStatus: 'waiting',
    winner: null,
    moves: 0,
    canRollDice: true,
    selectedPiece: null
  });

  const [isRolling, setIsRolling] = useState(false);
  const [showDice, setShowDice] = useState(false);

  // Board positions for each player's starting positions
  const startingPositions = [0, 13, 26, 39];
  const safeZoneStarts = [51, 12, 25, 38];

  const rollDice = useCallback(() => {
    if (!gameState.canRollDice || isRolling) return;

    setIsRolling(true);
    setShowDice(true);

    // Simulate dice rolling animation
    const rollInterval = setInterval(() => {
      setGameState(prev => ({
        ...prev,
        diceValue: Math.floor(Math.random() * 6) + 1
      }));
    }, 100);

    setTimeout(() => {
      clearInterval(rollInterval);
      const finalValue = Math.floor(Math.random() * 6) + 1;
      setGameState(prev => ({
        ...prev,
        diceValue: finalValue,
        canRollDice: false,
        gameStatus: 'playing'
      }));
      setIsRolling(false);
    }, 1500);
  }, [gameState.canRollDice, isRolling]);

  const movePiece = useCallback((pieceId: number) => {
    if (gameState.diceValue === 0 || gameState.selectedPiece !== null) return;

    const currentPlayer = gameState.players[gameState.currentPlayer];
    const piece = currentPlayer.pieces[pieceId];

    if (piece.isInHome && gameState.diceValue === 6) {
      // Move piece out of home
      setGameState(prev => ({
        ...prev,
        players: prev.players.map((player, playerIndex) => {
          if (playerIndex === prev.currentPlayer) {
            return {
              ...player,
              pieces: player.pieces.map((p, pIndex) =>
                pIndex === pieceId
                  ? { ...p, position: startingPositions[playerIndex], isInHome: false }
                  : p
              )
            };
          }
          return player;
        }),
        canRollDice: true
      }));
    } else if (!piece.isInHome && !piece.isInSafeZone) {
      // Move piece on board
      const newPosition = (piece.position + gameState.diceValue) % 52;
      const isInSafeZone = newPosition >= safeZoneStarts[gameState.currentPlayer] &&
        newPosition < safeZoneStarts[gameState.currentPlayer] + 6;

      setGameState(prev => ({
        ...prev,
        players: prev.players.map((player, playerIndex) => {
          if (playerIndex === prev.currentPlayer) {
            return {
              ...player,
              pieces: player.pieces.map((p, pIndex) =>
                pIndex === pieceId
                  ? {
                    ...p,
                    position: newPosition,
                    isInSafeZone: isInSafeZone || p.isInSafeZone
                  }
                  : p
              )
            };
          }
          return player;
        }),
        canRollDice: gameState.diceValue === 6,
        currentPlayer: gameState.diceValue === 6 ? prev.currentPlayer : (prev.currentPlayer + 1) % 4,
        diceValue: 0,
        moves: prev.moves + 1
      }));
    } else if (piece.isInSafeZone) {
      // Move piece in safe zone
      const safeZonePosition = piece.position - safeZoneStarts[gameState.currentPlayer];
      const newSafeZonePosition = safeZonePosition + gameState.diceValue;

      if (newSafeZonePosition >= 6) {
        // Piece reaches home
        setGameState(prev => ({
          ...prev,
          players: prev.players.map((player, playerIndex) => {
            if (playerIndex === prev.currentPlayer) {
              const updatedPieces = player.pieces.map((p, pIndex) =>
                pIndex === pieceId
                  ? { ...p, position: 100, isInSafeZone: false, isInHome: true }
                  : p
              );

              // Check if player has won
              const hasWon = updatedPieces.every(p => p.isInHome && p.position === 100);

              return {
                ...player,
                pieces: updatedPieces,
                hasWon
              };
            }
            return player;
          }),
          canRollDice: gameState.diceValue === 6,
          currentPlayer: gameState.diceValue === 6 ? prev.currentPlayer : (prev.currentPlayer + 1) % 4,
          diceValue: 0,
          moves: prev.moves + 1
        }));
      } else {
        setGameState(prev => ({
          ...prev,
          players: prev.players.map((player, playerIndex) => {
            if (playerIndex === prev.currentPlayer) {
              return {
                ...player,
                pieces: player.pieces.map((p, pIndex) =>
                  pIndex === pieceId
                    ? { ...p, position: safeZoneStarts[playerIndex] + newSafeZonePosition }
                    : p
                )
              };
            }
            return player;
          }),
          canRollDice: gameState.diceValue === 6,
          currentPlayer: gameState.diceValue === 6 ? prev.currentPlayer : (prev.currentPlayer + 1) % 4,
          diceValue: 0,
          moves: prev.moves + 1
        }));
      }
    }
  }, [gameState]);

  const resetGame = () => {
    setGameState({
      players: [
        {
          id: 0,
          name: 'Player 1',
          color: 'red',
          pieces: Array.from({ length: 4 }, (_, i) => ({
            id: i,
            position: -1,
            isInSafeZone: false,
            isInHome: true
          })),
          isActive: true,
          hasWon: false
        },
        {
          id: 1,
          name: 'Player 2',
          color: 'blue',
          pieces: Array.from({ length: 4 }, (_, i) => ({
            id: i,
            position: -1,
            isInSafeZone: false,
            isInHome: true
          })),
          isActive: false,
          hasWon: false
        },
        {
          id: 2,
          name: 'Player 3',
          color: 'green',
          pieces: Array.from({ length: 4 }, (_, i) => ({
            id: i,
            position: -1,
            isInSafeZone: false,
            isInHome: true
          })),
          isActive: false,
          hasWon: false
        },
        {
          id: 3,
          name: 'Player 4',
          color: 'yellow',
          pieces: Array.from({ length: 4 }, (_, i) => ({
            id: i,
            position: -1,
            isInSafeZone: false,
            isInHome: true
          })),
          isActive: false,
          hasWon: false
        }
      ],
      currentPlayer: 0,
      diceValue: 0,
      gameStatus: 'waiting',
      winner: null,
      moves: 0,
      canRollDice: true,
      selectedPiece: null
    });
    setShowDice(false);
  };

  const getDiceIcon = () => {
    const diceIcons = [Dice1, Dice2, Dice3, Dice4, Dice5, Dice6];
    const DiceIcon = diceIcons[gameState.diceValue - 1] || Dice1;
    return <DiceIcon className="w-16 h-16" />;
  };

  const getPieceColor = (color: string) => {
    const colors = {
      red: 'bg-red-500',
      blue: 'bg-blue-500',
      green: 'bg-green-500',
      yellow: 'bg-yellow-500'
    };
    return colors[color as keyof typeof colors] || 'bg-gray-500';
  };

  const getPlayerColor = (color: string) => {
    const colors = {
      red: 'border-red-500 bg-red-500/20',
      blue: 'border-blue-500 bg-blue-500/20',
      green: 'border-green-500 bg-green-500/20',
      yellow: 'border-yellow-500 bg-yellow-500/20'
    };
    return colors[color as keyof typeof colors] || 'border-gray-500 bg-gray-500/20';
  };

  return (
    <div className="quicksand-font min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white p-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-8"
      >
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="p-3 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-full">
            <Trophy className="w-8 h-8 text-black" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
            Ludo Game
          </h1>
        </div>
        <p className="text-xl text-gray-300 max-w-2xl mx-auto">
          Roll the dice and move your pieces to victory!
        </p>
      </motion.div>

      <div className="max-w-6xl mx-auto">
        {/* Game Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-gradient-to-br from-gray-800/90 to-gray-700/90 backdrop-blur-md rounded-2xl p-6 border border-yellow-500/30 shadow-2xl mb-8"
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-yellow-400" />
                <span className="text-lg font-semibold">Current Player:</span>
                <span className={`px-3 py-1 rounded-full text-sm font-bold ${getPlayerColor(gameState.players[gameState.currentPlayer].color)}`}>
                  {gameState.players[gameState.currentPlayer].name}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-blue-400" />
                <span className="text-lg font-semibold">Moves: {gameState.moves}</span>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={resetGame}
                className="bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white font-bold py-2 px-4 rounded-lg transition-all duration-300 hover:scale-105 flex items-center gap-2"
              >
                <RotateCcw className="w-5 h-5" />
                Reset Game
              </button>
              <Link
                to="/individual-match"
                className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-bold py-2 px-4 rounded-lg transition-all duration-300 hover:scale-105 flex items-center gap-2"
              >
                <Home className="w-5 h-5" />
                Back to Matches
              </Link>
            </div>
          </div>

          {/* Dice Section */}
          <div className="flex items-center justify-center gap-8">
            <div className="text-center">
              <h3 className="text-xl font-bold text-white mb-4">Roll the Dice</h3>
              <AnimatePresence>
                {showDice && (
                  <motion.div
                    initial={{ scale: 0, rotate: 0 }}
                    animate={{ scale: 1, rotate: 360 }}
                    exit={{ scale: 0, rotate: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-white"
                  >
                    {getDiceIcon()}
                  </motion.div>
                )}
              </AnimatePresence>
              <div className="text-2xl font-bold text-yellow-400 mt-2">
                {gameState.diceValue > 0 ? gameState.diceValue : '?'}
              </div>
              <button
                onClick={rollDice}
                disabled={!gameState.canRollDice || isRolling}
                className={`mt-4 px-6 py-3 rounded-lg font-bold transition-all duration-300 ${gameState.canRollDice && !isRolling
                  ? 'bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-black hover:scale-105 shadow-lg'
                  : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                  }`}
              >
                {isRolling ? 'Rolling...' : 'Roll Dice'}
              </button>
            </div>
          </div>
        </motion.div>

        {/* Game Board */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-gradient-to-br from-gray-800/90 to-gray-700/90 backdrop-blur-md rounded-2xl p-6 border border-yellow-500/30 shadow-2xl mb-8"
        >
          <h2 className="text-2xl font-bold text-white text-center mb-6">Game Board</h2>

          {/* Simplified Board Representation */}
          <div className="grid grid-cols-4 gap-4">
            {gameState.players.map((player, playerIndex) => (
              <div key={player.id} className="text-center">
                <h3 className={`text-lg font-bold mb-4 ${getPlayerColor(player.color)} px-3 py-2 rounded-lg`}>
                  {player.name}
                </h3>
                <div className="grid grid-cols-2 gap-2">
                  {player.pieces.map((piece, pieceIndex) => (
                    <motion.button
                      key={piece.id}
                      onClick={() => movePiece(pieceIndex)}
                      disabled={gameState.currentPlayer !== playerIndex || gameState.diceValue === 0}
                      className={`w-12 h-12 rounded-full border-2 transition-all duration-300 ${piece.isInHome
                        ? `${getPieceColor(player.color)} border-white`
                        : `${getPieceColor(player.color)} border-yellow-400`
                        } ${gameState.currentPlayer === playerIndex && gameState.diceValue > 0
                          ? 'hover:scale-110 cursor-pointer'
                          : 'cursor-not-allowed opacity-50'
                        }`}
                      whileHover={{ scale: gameState.currentPlayer === playerIndex && gameState.diceValue > 0 ? 1.1 : 1 }}
                      whileTap={{ scale: gameState.currentPlayer === playerIndex && gameState.diceValue > 0 ? 0.95 : 1 }}
                    >
                      <span className="text-white font-bold text-sm">
                        {piece.isInHome ? 'H' : piece.position + 1}
                      </span>
                    </motion.button>
                  ))}
                </div>
                <div className="mt-2 text-sm text-gray-300">
                  {player.pieces.filter(p => p.isInHome && p.position === 100).length}/4 Home
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Game Rules */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="bg-gradient-to-br from-gray-800/90 to-gray-700/90 backdrop-blur-md rounded-2xl p-6 border border-yellow-500/30 shadow-2xl"
        >
          <h2 className="text-2xl font-bold text-white text-center mb-6">Game Rules</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-yellow-400 mb-3">How to Play:</h3>
              <ul className="space-y-2 text-gray-300">
                <li>• Roll the dice to move your pieces</li>
                <li>• Roll a 6 to move a piece out of home</li>
                <li>• Roll a 6 to get an extra turn</li>
                <li>• Move all 4 pieces to home to win</li>
                <li>• Pieces can capture opponents by landing on them</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-yellow-400 mb-3">Winning:</h3>
              <ul className="space-y-2 text-gray-300">
                <li>• First player to get all 4 pieces home wins</li>
                <li>• Pieces must move exactly to reach home</li>
                <li>• Safe zones protect your pieces</li>
                <li>• Strategy and luck both matter!</li>
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default LudoGame;
