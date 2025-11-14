import { BgButton, IconBadge, Image } from "@components/atoms";
import { motion } from "framer-motion";
import React from "react";
// import { setMatchData } from "@redux/slices/match.slice";
import { formatDateLocalMDHMS } from "@app-utils/timeUtils";
import { Calendar, Users } from "lucide-react";

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
  teamMatchId: string;
  startTime: string;
  onClick: () => void;
}

const MatchBoardItem: React.FC<MatchBoardItemProps> = (props) => {
  return (
    <div className="w-80 md:w-100 h-52">
      {/* Header sdds*/}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        <div
          className="flex flex-col justify-between rounded-xl border border-[#383838] 
              bg-gradient-to-br from-[rgba(28,28,28,0.2)] to-[rgba(130,130,130,0.2)] 
              px-4 py-4"
        >
          <div>
            <div className="flex flex-row justify-between items-start">
              <div className="flex flex-row items-center gap-2">
                <Image
                  src={props.avatar}
                  alt={""}
                  className="w-12 h-12 rounded-full border-[1px] border-white/10"
                  fallbackSrc={props.avatar}
                />
                <div className="flex flex-col items-start">
                  <p className="font-vastagoBold text-xl">{props.name}</p>
                  <p className="font-vastagoRegular text-sm text-[#9E9E9E]">{props.mode} Teams</p>
                </div>
              </div>
              <div>
                <IconBadge text="Ready" />
              </div>
            </div>

            <div className="flex flex-row justify-start gap-2 mt-4">
              <div className="flex justify-start items-start w-full gap-1">
                <Calendar className="w-4 h-4 text-[#9E9E9E99]" />
                <div className="flex flex-col items-start">
                  <p className="font-vastagoRegular text-sm text-[#9E9E9E99] ">Match Date</p>
                  <p className="font-vastagoRegular text-sm text-[#9E9E9E]">{formatDateLocalMDHMS(props.startTime)}</p>
                </div>
              </div>
              <div className="flex justify-start items-start w-full gap-1">
                <Users className="w-4 h-4 text-[#9E9E9E99]" />
                <div className="flex flex-col items-start">
                  <p className="font-vastagoRegular text-sm text-[#9E9E9E99] ">Players Ready</p>
                  <p className="font-vastagoRegular text-sm text-[#9E9E9E]">3/4</p>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-white/10 my-4" />

          <div className="flex flex-row items-end justify-between w-full">
            <BgButton
              onClick={props.onClick}
              size="cards"
              scale={1}
              disabled={false}
            >
              <span className="font-vastagoSemiBold bg-gradient-to-b from-[#F3DB8E] to-[#A97525] bg-clip-text text-transparent [filter:drop-shadow(0px_1px_0px_#160B04)] hover:text-[#F3DB8E]">
                MATCH INFO
              </span>
            </BgButton>

            <div className="flex flex-row gap-1">
              <IconBadge icon="coin" text={`${props.coin} coins`} />
              <IconBadge icon="timer" text={`${props.time} min left`} />
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default MatchBoardItem;