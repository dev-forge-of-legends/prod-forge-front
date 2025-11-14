import { apiPutClaimedRewardToUser } from "@apis/achievement";
import { BgButton, IconBadge } from "@components/atoms";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Image } from "../../atoms/Image";

interface achieve {
  id: string;
  icon: string;
  title: string;
  status: string;
  xp: number;
  coin: number;
  winCount: number;
}

export const AchieveBox = ({
  id,
  icon,
  title,
  winCount,
  status,
  xp,
  coin,
}: achieve) => {
  const navigate = useNavigate();

  const handleClaim = async () => {
    try {
      await apiPutClaimedRewardToUser(id);
      toast.success(`${title} Claimed!`);
      navigate("/profile");
    } catch {
      console.error("Error Occured");
    }
  };

  const isLocked = status === "unlocked";

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="
          flex flex-col justify-between 
          rounded-xl border border-[#383838] 
          bg-gradient-to-br from-[rgba(28,28,28,0.2)] to-[rgba(130,130,130,0.2)] 
          px-4 py-4 text-white shadow-lg
          transition-transform duration-200
        "
    >
      <div className="flex flex-row items-center">
        <Image
          src={icon || "assets/images/users/user0.webp"}
          alt="No Icons Available"
          className="w-10 h-10 rounded-full border-[1px] border-white/10"
          fallbackSrc={icon || "assets/images/users/user0.webp"}
        />
        <h1 className="text-[18px] ml-1 font-bold">{title}</h1>
      </div>

      <div className="flex flex-row flex-wrap gap-2 text-[11px] text-white mt-2 mb-4">
        <IconBadge text={`XP: ${xp}`} />
        <IconBadge text={`Coin: ${coin}`} />
        <IconBadge text={`Wins: ${winCount}`} />
      </div>

      <BgButton
        onClick={handleClaim}
        size="cards"
        scale={1}
        disabled={isLocked}
      >
        <span className="font-vastagoSemiBold bg-gradient-to-b from-[#F3DB8E] to-[#A97525] bg-clip-text text-transparent [filter:drop-shadow(0px_1px_0px_#160B04)] hover:text-[#F3DB8E]">
          {status === "true" ? "Claimed" : "Claim"}
        </span>
      </BgButton>
    </motion.div>
  );
};