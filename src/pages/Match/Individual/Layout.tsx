import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import {
  apiGetIndividualCreatedMatches,
  apiGetIndividualInvitedMatches,
  apiGetIndividualMatches,
} from "@apis/individual_match";
import MatchBoardItem from "./components/MatchBoardItem";
import RightSideBar from "./components/RightSideBar";
import { SearchInput } from "@components/atoms";

interface MatchData {
  id: string;
  name: string;
  avatar: string;
  players: any;
  mode: string;
  betCoins: number;
  timeLimit: number;
  createrId: string;
  isPublic: boolean;
}

const IndividualLayout: React.FC = () => {
  const [matchData, setMatchData] = useState<MatchData[]>([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("public");
  const [text, setText] = useState("");
  const [searchResult, setSearchResult] = useState<MatchData[]>([]);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  useEffect(() => {
    if (activeTab === "public") handlePublicMatch();
    else if (activeTab === "invited") handleInvitedMatch();
    else if (activeTab === "created") handleCreatedMatch();
  }, [activeTab]);

  const handlePublicMatch = async () => {
    setMatchData([]);
    setSearchResult([]);
    const data = await apiGetIndividualMatches();
    setMatchData(data.items);
    setSearchResult(data.items);
  };

  const handleInvitedMatch = async () => {
    // setMatchData([]);
    // setSearchResult([]);
    const data = await apiGetIndividualInvitedMatches();
    if (data) {
      setMatchData(data);
      setSearchResult(data);
    } else setMatchData([]);
  };

  const handleCreatedMatch = async () => {

    setMatchData([]);
    // setSearchResult([]);
    const data = await apiGetIndividualCreatedMatches();
    if (data) {
      setMatchData(data);
      setSearchResult(data);
    } else setMatchData([]);
    console.log("data", data);
    // setMatchData(data);
    // setSearchResult(data);
  };

  useEffect(() => {
    const query = text.trim().toLowerCase();
    const filtered = matchData.filter((match) =>
      match.name.toLowerCase().includes(query)
    );
    setSearchResult(filtered);
  }, [text, matchData]);

  return (
    <div className="quicksand-font h-full text-white p-6">
      {/* ================= Header ================= */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-12"
      >
        <h1 className="font-vastagoRegular text-xl md:text-3xl text-left mb-4">
          Individual Matches
        </h1>
        <div className="w-80">
          <SearchInput text={text} setText={setText} />
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap items-center gap-3 md:gap-4 mt-2 mb-6">
          {["public", "invited", "created"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`font-vastagoMedium text-sm md:text-base transition-colors py-1 md:py-2 border-b-2 border-transparent hover:text-yellow hover:border-yellow ${
                activeTab === tab ? "text-white" : "text-white/50"
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)} Matches
            </button>
          ))}
        </div>

        {/* =================== Match Cards =================== */}
        <motion.div
          className="
            grid grid-cols-1 gap-6
            md:grid-cols-2
            lg:grid-cols-3
            2xl:grid-cols-[repeat(auto-fit,minmax(350px,1fr))]
          "
        >
          {searchResult.map((item, index) => (
            <MatchBoardItem
              key={item.id || index}
              name={item.name}
              avatar={item.avatar}
              joined_num={item.players}
              mode={item.mode}
              coin={item.betCoins}
              time={item.timeLimit}
              matchId={item.id}
              createrId={item.createrId}
              onUpdated={toggleSidebar}
              isPublic={item.isPublic}
            />
          ))}
        </motion.div>
      </motion.div>

      {/* =================== Sidebar Overlay =================== */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity duration-300 z-[40]"
          onClick={toggleSidebar}
        />
      )}

      {/* =================== Right Sidebar =================== */}
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: isSidebarOpen ? 0 : "100%" }}
        transition={{ type: "spring", stiffness: 200 }}
        className="fixed right-0 top-0 w-[22rem] h-full bg-[#160B0499] shadow-lg z-[50]"
      >
        <RightSideBar isOpen={isSidebarOpen} />
      </motion.div>
    </div>
  );
};

export default IndividualLayout;
