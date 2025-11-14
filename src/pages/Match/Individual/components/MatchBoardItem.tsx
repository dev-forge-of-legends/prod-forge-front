import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { Image } from "@components/atoms/Image";
import { useAppDispatch } from "@redux/store";
import { setMatchData } from "@redux/slices/match.slice";
import { apiGetIndividualIdMatches } from "@apis/individual_match";
import { BgButton, IconBadge } from "@components/atoms";

interface MatchBoardItemProps {
  joined_num: Array<object>;
  avatar: string;
  name: string;
  mode: string;
  coin: number;
  time: number;
  matchId: string;
  createrId: string;
  isPublic: boolean;
  onUpdated: any;
}

const MatchBoardItem: React.FC<MatchBoardItemProps> = (props) => {
  const dispatch = useAppDispatch();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    apiGetIndividualIdMatches(props.matchId);
  };

  const toggleSidebar = async () => {
    dispatch(
      setMatchData([
        {
          matchName: props.name,
          time: props.time,
          join_num: parseInt(props.mode, 10),
          coin: props.coin,
          matchId: props.matchId,
          createrId: props.createrId,
          isPublic: props.isPublic,
        },
      ])
    );

    setIsSidebarOpen(!isSidebarOpen);
    props.onUpdated(true);
  };

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
        <h1 className="text-[18px] ml-1 font-bold">{props.name}</h1>
      </div>

      <div className="flex flex-row flex-wrap gap-2 text-[11px] text-white mt-2 mb-4">
        <IconBadge text={`Players: ${props.mode}`} />
        <IconBadge text={`Ready: ${props.joined_num.length} / ${props.mode}`} />
        <IconBadge icon="timer" text={`${props.time} min`} />
        <IconBadge icon="coin" text={`${props.coin} coins`} />
      </div>

      <BgButton onClick={toggleSidebar} size="cards" scale={1} disabled={false}>
        <span className="font-vastagoSemiBold bg-gradient-to-b from-[#F3DB8E] to-[#A97525] bg-clip-text text-transparent [filter:drop-shadow(0px_1px_0px_#160B04)] hover:text-[#F3DB8E]">
          {props.joined_num.length === parseInt(props.mode)
            ? "FULL GAME"
            : "JOIN GAME"}
        </span>
      </BgButton>
    </motion.div>
  );
};

export default MatchBoardItem;