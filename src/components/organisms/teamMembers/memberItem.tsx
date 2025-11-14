import { motion } from "framer-motion";
import React, { useEffect } from "react";
import { Image } from "@components/atoms/Image";
import { IconBadge } from "@components/atoms";

interface MatchBoardItemProps {
  avatar: string;
  name: string;
  level : number;
  wins : number;
  loses : number;
}

const MemberItem: React.FC<MatchBoardItemProps> = (props) => {
  // const dispatch = useAppDispatch();

  useEffect(() => {
    // fetchData();
  }, []);

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
          src={props.avatar}
          alt={props.name}
          className="w-10 h-10 rounded-full border-[1px] border-white/10"
          // className="min-h-10 min-w-10 max-h-10 max-w-10 rounded-full m-2 border-[2px] p-0.5 border-[gold] shadow-[0px_0px_7px_1px_gold]"
          fallbackSrc={props.avatar}
        />
        <div className="flex flex-col">
          <h1 className="text-[18px] ml-1 font-bold">{props.name}</h1>
          <h1 className="text-[13px] ml-1 font-bold">XP Level: {props.level}</h1>
        </div>
      </div>

      <div className="flex flex-row flex-wrap gap-2 text-[11px] text-white mt-2 mb-4">
        <IconBadge text={`Match Players: ${props.wins + props.loses}`} />
        <IconBadge text={`Win : ${props.wins}`} />
        <IconBadge text={`Loss :${props.loses} `} />
      </div>
    </motion.div>
  );
};

export default MemberItem;