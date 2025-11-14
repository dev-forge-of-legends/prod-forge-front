import { AnimatePresence, motion } from "framer-motion";

interface AchievementRewardProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  status: string;
  xp: number;
  coin: number;
}

const AchievementReward = ({
  isOpen,
  onClose,
  title,
  status,
  xp,
  coin,
}: AchievementRewardProps) => {
  const handleSkip = () => {
    if (status === "progress") {
      alert("You cannot receive this achievement right now.");
      onClose();
    } else {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black flex items-center justify-center z-150 p-4 bg-[url('https://sfo3.digitaloceanspaces.com/forge-dev-assets/assets/images/logback.webp')]"
        onClick={handleSkip}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="quicksand-font border-[1px] border-[rgba(200,200,200,0.3)] shadow-[0_0_3px_1px_rgba(250,250,250,0.1)] bg-[url('https://sfo3.digitaloceanspaces.com/forge-dev-assets/assets/images/reward/reward.png')] p-6  w-full max-w-md relative"
          onClick={(e) => e.stopPropagation()}
        >
          {/* bg-[url('https://sfo3.digitaloceanspaces.com/forge-dev-assets/assets/images/achievement/reward.webp')] bg-no-repeat bg-cover rounded-[3rem] */}
          {/* Close Button */}
          {/* <div className="bg-green-400 text-center"> */}
          <div className="text-center">
            <button
              className="absolute w-20 top-4 right-4 text-white text-xl bg-transparent backdrop-blur-sm backdrop-filte border-2 border-amber-500 rounded-4xl cursor-pointer hover:text-yellow-400 transition-colors"
              onClick={onClose}
            >
              Skip
            </button>
            <div></div>
            <h1 className="text-white text-2xl mt-1 font-semibold">
              CONGRATULATIONS!
            </h1>
            <p className="text-black font-semibold">{title}</p>

            <p className="text-black font-bold">You earned Coin +{coin}!</p>
            <div className="mt-5 flex gap-4 justify-center text-center">
              <div className="w-20 rounded-xl bg-yellow-300 p-3 font-semibold">
                XP: {xp}
              </div>
              <div className="w-30 rounded-xl bg-yellow-300 p-3 font-semibold">
                COINS: +{coin}
              </div>
            </div>
            <div className="mt-8 mx-3 flex justify-center font-bold">
              <button
                className="w-full p-3 rounded-4xl bg-amber-300"
                onClick={handleSkip}
              >
                CLAIM REWARD
              </button>
            </div>

            <p className="mt-5 text-gray-300 text-[14px]">
              Rewards will be added to your account.
            </p>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default AchievementReward;
