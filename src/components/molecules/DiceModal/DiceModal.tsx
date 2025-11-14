import { apiGetRollXpCoins } from "@apis/reward";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const DiceModal = () => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [currentNumber, setCurrentNumber] = useState(1);
  const [showResult, setShowResult] = useState(false);
  const navigate = useNavigate();

  const diceFaces: Record<number, [number, number][]> = {
    1: [[1, 1]],
    2: [
      [0, 0],
      [2, 2],
    ],
    3: [
      [0, 0],
      [1, 1],
      [2, 2],
    ],
    4: [
      [0, 0],
      [0, 2],
      [2, 0],
      [2, 2],
    ],
    5: [
      [0, 0],
      [0, 2],
      [1, 1],
      [2, 0],
      [2, 2],
    ],
    6: [
      [0, 0],
      [0, 2],
      [1, 0],
      [1, 2],
      [2, 0],
      [2, 2],
    ],
  };

  const handleClose = () => {
    navigate("/homedashboard");
  };

  const handleDiceClick = async () => {
    if (isSpinning) return;

    if (!showResult) {
      await spinDice();
    } else {
      navigate("/daily");
    }
  };

  const spinDice = async () => {
    setIsSpinning(true);
    setShowResult(false);

    const spins = 12 + Math.floor(Math.random() * 8);

    for (let i = 0; i < spins; i++) {
      await new Promise((resolve) => setTimeout(resolve, 80 + i * 5));
      setCurrentNumber(Math.floor(Math.random() * 6) + 1);
    }

    try {
      const bonus = await apiGetRollXpCoins();
      setCurrentNumber(bonus.rollNum);
    } catch {
      console.error("Error Occurred");
    }

    setIsSpinning(false);
    setShowResult(true);
  };

  const renderDiceFace = (number: number) => {
    const dots: [number, number][] = diceFaces[number];

    return (
      <div className="grid grid-cols-3 grid-rows-3 w-full h-full gap-1 p-2">
        {Array.from({ length: 3 }, (_, row) =>
          Array.from({ length: 3 }, (_, col) => {
            const hasDot = dots.some(([r, c]) => r === row && c === col);
            return (
              <div
                key={`${row}-${col}`}
                className={`flex items-center justify-center ${
                  hasDot ? "bg-red-500 rounded-full" : ""
                }`}
              >
                {hasDot && (
                  <div className="w-2 h-2 bg-gradient-to-br from-red-500 to-red-600 rounded-full shadow-lg shadow-red-500/30" />
                )}
              </div>
            );
          })
        )}
      </div>
    );
  };

  return (
    <div
      className="fixed inset-0 backdrop-blur-sm flex justify-center items-center z-50"
      onClick={handleClose}
    >
      <div
        className="min-w-[440px] max-w-[440px] min-h-[394px] max-h-[394px] bg-[url('https://sfo3.digitaloceanspaces.com/forge-dev-assets/assets/images/reward/DiceModal.webp')] bg-cover bg-no-repeat rounded-[54px] text-center overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with black, bold text */}
        <div className="pt-[80px]">
          <h2
            className="text-[28px] font-bold text-black text-center 
  [text-shadow:_0_0_20px_rgba(255,241,118,0.4),_0_4px_8px_rgba(0,0,0,0.25)]"
          >
            DAILY BONUS
          </h2>
          <p className="text-gray-500 text-[18px] font-medium">
            Roll the dice and win exciting rewards daily!
          </p>
        </div>

        {/* Dice Container with hand cursor */}
        <div
          className={`relative w-[72px] h-[72px] mx-auto my-4 cursor-pointer transition-all duration-500 ${
            isSpinning
              ? "animate-[spin_0.15s_linear_infinite] scale-110"
              : "hover:scale-105"
          } ${showResult ? "animate-pulse" : ""}`}
          onClick={handleDiceClick}
        >
          {/* Dice shadow */}
          <div className="absolute inset-0 bg-black/20 blur-md rounded-full transform scale-90 -z-10"></div>

          {/* Dice main body */}
          <div
            className={`w-full h-full bg-gradient-to-br from-gray-100 to-gray-300 rounded-2xl flex justify-center items-center shadow-lg border-2 border-gray-300 transition-all duration-300 ${
              showResult ? "ring-2 ring-green-400 shadow-green-400/20" : ""
            }`}
          >
            {renderDiceFace(currentNumber)}
          </div>
        </div>

        {/* Status Area */}
        <div className="min-h-[54px] flex items-center justify-center">
          {isSpinning ? (
            <div className="flex flex-col items-center space-y-3">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
                <div
                  className="w-2 h-2 bg-purple-500 rounded-full animate-bounce"
                  style={{ animationDelay: "0.1s" }}
                ></div>
                <div
                  className="w-2 h-2 bg-pink-500 rounded-full animate-bounce"
                  style={{ animationDelay: "0.2s" }}
                ></div>
              </div>
              <span className="text-gray-600 font-medium text-lg">
                Spinning...
              </span>
            </div>
          ) : showResult ? (
            <div className="animate-fade-in">
              <div className="bg-green-50 p-4 rounded-2xl border border-green-200">
                <p className="text-xl font-bold text-green-600">
                  You rolled: {currentNumber}
                </p>
              </div>
              <p className="text-gray-500 text-sm font-medium">
                Click the dice to continue
              </p>
            </div>
          ) : (
            <div className="space-y-2">
              <img
                src="/assets/images/reward/hand.webp"
                alt="No Image Found"
                className="w-[36px] h-[48px]"
              />
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="pt-2">
          <p className="text-white text-[20px] font-medium">
            1 free roll every 24 hours
          </p>
        </div>
      </div>
    </div>
  );
};
