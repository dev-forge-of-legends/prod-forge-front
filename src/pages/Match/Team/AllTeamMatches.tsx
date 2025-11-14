import {
  apiGetCreatedTeamMatches,
  apiGetInvitedTeamMatches,
  apiGetPublicTeamMatches,
} from "@apis/team_match";
import { SearchInput } from "@components/atoms";
import { useAppDispatch } from "@redux/store";
import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { setTeamMatchId } from "../../../redux/slices/team-match.slice";
import MatchBoardItem from "./MatchBoardItem";

interface MatchData {
  id: string;
  name: string;
  avatar: string;
  players: number;
  mode: string;
  betCoins: number;
  timeLimit: number;
  createrId: string;
  isPublic: boolean;
  startTime: string;
}

const AllTeamMatches: React.FC = () => {
  const [matchData, setMatchData] = useState<MatchData[]>([]);

  const [text, setText] = useState("");
  const [searchResult, setSearchReslt] = useState(matchData);

  const [activeTab, setActiveTab] = useState("public");

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (activeTab === "public") {
      handlePublicMatch();
    } else if (activeTab === "invited") {
      handleInvitedMatch();
    } else if (activeTab === "created") {
      handleCreatedMatch();
    }
  }, [activeTab]);

  useEffect(() => {
    const query = text.trim().toLowerCase();
    const filtered = matchData.filter((match) => {
      const matchesText =
        !query || `${match.name}`.toLowerCase().includes(query);
      return matchesText;
    });
    setSearchReslt(filtered);
  }, [text]);

  const handlePublicMatch = async () => {
    const data = await apiGetPublicTeamMatches();
    setMatchData(data.items);
    setSearchReslt(data.items);
  };

  const handleInvitedMatch = async () => {
    const data = await apiGetInvitedTeamMatches();
    if (data != null) {
      setMatchData(data);
      setSearchReslt(data);
    } else {
      setMatchData([]);
    }
  };

  const handleCreatedMatch = async () => {
    const data = await apiGetCreatedTeamMatches();
    setMatchData(data);
    setSearchReslt(data);
  };

  const handleMatchInfo = (matchId: string) => {
    dispatch(setTeamMatchId(matchId));
    navigate("/team-match-info");
  };

  return (
    <div className="quicksand-font h-full text-white p-4 md:p-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        <h1 className="font-vastagoRegular text-xl md:text-3xl text-left mb-4">Team Matches</h1>
        <div className="w-80">
          <SearchInput text={text} setText={setText} />
        </div>

        <div className="w-full flex flex-row flex-wrap justify-start items-center gap-3 md:gap-4 mt-4 mb-4">
          <button
            onClick={() => setActiveTab("public")}
            className="flex items-center transition-all"
          >
            <span className={`font-vastagoMedium text-sm md:text-base hover:text-yellow border-b-2  border-transparent hover:border-yellow transition-colors py-1 md:py-2 ${activeTab === "public" ? "text-white border-white" : "text-white/50"}`}>
              Public Matches
            </span>
          </button>
          <button
            onClick={() => setActiveTab("invited")}
            className="flex items-center transition-all"
          >
            <span className={`font-vastagoMedium text-sm md:text-base hover:text-yellow border-b-2  border-transparent hover:border-yellow transition-colors py-1 md:py-2 ${activeTab === "invited" ? "text-white border-white" : "text-white/50"}`}>
              Invited Matches
            </span>
          </button>
          <button
            onClick={() => setActiveTab("created")}
            className="flex items-center transition-all"
          >
            <span className={`font-vastagoMedium text-sm md:text-base hover:text-yellow border-b-2  border-transparent hover:border-yellow transition-colors py-1 md:py-2 ${activeTab === "created" ? "text-white border-white" : "text-white/50"}`}>
              Created Matches
            </span>
          </button>
        </div>
        {/* ---------------------------Match Templates---------------------------- */}
        <div className="w-full max-h-screen flex flex-wrap overflow-y-auto space-x-6 space-y-4 pb-8">
          {searchResult.map((item: any, _index: number) => (
            <MatchBoardItem
              key={_index}
              teamMatchId={item.id}
              name={item.name}
              avatar={item.avatar}
              joined_num={item.players}
              mode={item.mode}
              coin={item.betCoins}
              time={item.timeLimit}
              matchId={item.id}
              createrId={item.createrId}
              isPublic={item.isPublic}
              startTime={item.startTime}
              onClick={() => handleMatchInfo(item.id)}
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default AllTeamMatches;
