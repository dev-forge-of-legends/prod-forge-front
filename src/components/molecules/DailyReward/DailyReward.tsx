import { apiGetXPCoins, apiPostBonusClaimed } from "@apis/reward";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const DailyReward = () => {
  const navigate = useNavigate();
  const [xp, setXp] = useState<number>(0);
  const [coin, setCoin] = useState<number>(0);

  useEffect(() => {
    fetchXpCoin();
  }, []);

  const fetchXpCoin = async () => {
    try {
      const xpCoin = await apiGetXPCoins();
      setXp(xpCoin.xp);
      setCoin(xpCoin.bonus_coin);
    } catch {
      console.error("Error Occured");
    }
  };

  const handleSkip = () => {
    navigate("/homedashboard");
  };

  const handleClaim = async () => {
    try {
      await apiPostBonusClaimed();
      navigate("/homedashboard");
    } catch {
      console.error("Error Occured");
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 flex items-center justify-center z-150 p-4 backdrop-blur-sm to-teal-800"
        onClick={handleSkip}
      >
        {/* Backdrop blur layer */}
        <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" />

        <motion.div
          initial={{ scale: 0.9, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          className="relative min-w-[440px] max-w-[440px] min-h-[394px] bg-[url('https://sfo3.digitaloceanspaces.com/forge-dev-assets/assets/images/reward/ClaimReward.webp')] bg-cover bg-no-repeat rounded-[36px] text-center overflow-hidden shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Decorative elements */}
          <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-emerald-400/20 to-teal-400/20 rounded-full -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-40 h-40 bg-gradient-to-tr from-green-400/20 to-emerald-400/20 rounded-full translate-x-1/3 translate-y-1/3" />

          {/* Header */}
          <div className="relative pt-8 pb-6 px-6 text-center">
            <motion.button
              whileHover={{
                scale: 1.05,
                backgroundColor: "rgba(255,255,255,0.2)",
              }}
              whileTap={{ scale: 0.95 }}
              className="absolute top-5 right-5 w-20 px-4 py-2 text-sm font-semibold text-white bg-white/10 backdrop-blur-sm rounded-full border border-white/30 hover:border-white/50 transition-all duration-200"
              onClick={handleSkip}
            >
              Skip
            </motion.button>

            <motion.h1
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              className="pt-[64px] text-[28px] font-extrabold bg-gradient-to-r from-yellow-600 to-amber-700 bg-clip-text text-transparent"
            >
              CONGRATULATIONS!
            </motion.h1>
            <p className="text-gray-600 text-lg font-medium mt-2">
              You earned:
            </p>
          </div>

          {/* Rewards Section */}
          <div className="mx-[85px] mb-5 h-[44px] flex justify-between gap-3">
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              className="flex-1 rounded-[12px] bg-gradient-to-r from-emerald-100 to-green-100 border border-emerald-200 shadow-md flex justify-center items-center backdrop-blur-sm"
            >
              <p className="text-[16px] font-bold bg-gradient-to-r from-emerald-700 to-green-800 bg-clip-text text-transparent">
                XP: + {xp}
              </p>
            </motion.div>

            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.1 }}
              className="flex-1 rounded-[12px] bg-gradient-to-r from-teal-100 to-cyan-100 border border-teal-200 shadow-md flex justify-center items-center backdrop-blur-sm"
            >
              <p className="text-[16px] font-bold bg-gradient-to-r from-teal-700 to-cyan-800 bg-clip-text text-transparent">
                COINS: + {coin}
              </p>
            </motion.div>
          </div>

          {/* Claim Button */}
          <div className="px-6 pb-8">
            <motion.button
              whileHover={{
                scale: 1.02,
                boxShadow: "0 0 30px rgba(16, 185, 129, 0.4)",
              }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-4 bg-gradient-to-r from-emerald-500 to-green-600 text-white font-bold text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-200 relative overflow-hidden group"
              onClick={handleClaim}
            >
              {/* Shine effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />

              <span className="relative flex items-center justify-center gap-2">
                <motion.span
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  🎁
                </motion.span>
                CLAIM REWARD
              </span>
            </motion.button>

            {/* Footer text */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-center text-gray-200 text-[14px] mt-4 font-medium"
            >
              Rewards will be automatically added to your account
            </motion.p>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
