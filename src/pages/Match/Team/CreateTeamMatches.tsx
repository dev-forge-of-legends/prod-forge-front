import { apiGetTeams } from "@apis/team";
import { apiCreateTeamMatch } from "@apis/team_match";
import { Team } from "@app-types/interfaces";
import { BgButton, BgInput, SearchInput } from "@components/atoms";
import {
  InviteTeamItem,
  InvitedTeam,
} from "@components/molecules/InviteTeamBar";
import { AnimatePresence, motion } from "framer-motion";
import { debounce } from "perfect-debounce";
import React, { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const CreateTeamMatches: React.FC = () => {
  const navigate = useNavigate();

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [teamsdata, setTeamsdata] = useState<Team[]>([]);
  const [selectedUserIds, setSelectedUserIds] = useState<string[]>([]);
  const [invitedTeams, setInvitedTeams] = useState<Team[]>([]);
  const [search, setSearch] = useState("");

  const [selectedMode, setSelectedMode] = useState("2");
  const [isPublic, setIsPublic] = useState(false);
  const [betCoin, setBetCoin] = useState(0);
  const [timeLimit, setTimeLimit] = useState(0);
  const [startTime, setStartTime] = useState("");
  const [matchName, setMatchName] = useState("");

  const debouncedSearch = useCallback(
    debounce((term: string) => {
      console.log("Searching for:", term);
      fetchTeamsData(term);
    }, 500),
    []
  );

  useEffect(() => {
    return () => {
      debouncedSearch.cancel();
    };
  }, [debouncedSearch]);

  useEffect(() => {
    fetchTeamsData("");
  }, []);

  const fetchTeamsData = async (search: string) => {
    const data = await apiGetTeams(0, 100, search, true);
    setTeamsdata(data.items);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const updateSelectedItem = (id: string, checked: boolean) => {
    if (checked) {
      setSelectedUserIds((prev) => [...prev, id]);
    } else {
      setSelectedUserIds((prev) => prev.filter((it) => it !== id));
    }
  };

  const resetSelectedUserIds = () => {
    setSelectedUserIds([]);
  };

  const setinviteTeams = () => {
    setInvitedTeams(teamsdata.filter((it) => selectedUserIds.includes(it.id)));
    setSelectedUserIds([]);
    toggleSidebar();
  };

  const removeInvitedTeam = (id: string) => {
    setInvitedTeams(invitedTeams.filter((it) => it.id !== id));
  };

  const handleModeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedMode(event.target.value);
  };

  const handlePublicChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsPublic(event.target.checked);
    setInvitedTeams([]);
  };

  const handleCreateMatch = async () => {
    const payload = {
      name: matchName,
      isPublic: isPublic,
      mode: selectedMode,
      avatar:
        "https://sfo3.digitaloceanspaces.com/forge-dev-assets/assets/images/dragon_icon.webp",
      teams: [...invitedTeams.map((it) => it.id)],
      teamMembers: [],
      createrTeamMembers: [],
      betCoin: betCoin,
      timeLimit: timeLimit,
      startTime: startTime,
    };
    try {
      const res = await apiCreateTeamMatch(payload);
      console.log(res);
      navigate("/team-all-matches");
      toast.success("Match created successfully");
    } catch (err: any) {
      toast.error(err.message || "Failed to create match");
    }
  };

  return (
    <div className="h-[90vh] relative flex flex-col justify-center items-center px-2">
      <AnimatePresence>
        <div className="flex justify-center items-center w-full md:w-125 font-vastagoMedium">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="border-[1px] items-center justify-center overflow-y-scroll smart-scroll h-[85vh] border-[rgba(200,200,200,0.3)] rounded-lg p-6 w-full  relative shadow-[0_0_3px_1px_rgba(250,250,250,0.1)]]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              className="absolute top-4 right-4 text-white text-xl cursor-pointer hover:text-yellow-400 transition-colors"
              onClick={() => navigate("/team-all-matches")}
            >
              ✕
            </button>

            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-white mb-2">
                Create Team Match
              </h2>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
              }}
              className="space-y-4"
            >
              <div>
                <h1 className="font-vastagoRegular text-white text-[16px] mb-1 pl-1">
                  PLAYERS TO JOIN
                </h1>
                <div className="flex flex-row items-center gap-6 mt-2">
                  <label className="flex flex-row items-center cursor-pointer">
                    <input
                      type="radio"
                      className="w-4 h-4 mr-2 cursor-pointer"
                      value="2"
                      checked={selectedMode === "2"}
                      onChange={handleModeChange}
                    />
                    <span className="font-vastagoRegular text-white">
                      Two Teams
                    </span>
                  </label>
                  <label className="flex flex-row items-center cursor-pointer">
                    <input
                      type="radio"
                      className="w-4 h-4 mr-2 cursor-pointer"
                      value="4"
                      checked={selectedMode === "4"}
                      onChange={handleModeChange}
                    />
                    <span className="font-vastagoRegular text-white">
                      Four Teams
                    </span>
                  </label>
                </div>
              </div>

              <div className="flex flex-row items-center">
                <input
                  type="checkbox"
                  checked={isPublic}
                  onChange={handlePublicChange}
                  className="w-4 h-4 mr-1"
                />
                <h1 className="font-vastagoRegular text-white text-[16px] mb-1 pl-1">
                  Allow Anyone to Join
                </h1>
              </div>

              {!isPublic ? (
                <div>
                  <div className="mt-4">
                    <BgButton onClick={toggleSidebar} size="sm" scale={1}>
                      <span className="text-yellow-bright">+ INVITE TEAM</span>
                    </BgButton>
                  </div>
                  <div className="w-full relative">
                    {invitedTeams.map((item, index) => (
                      <InvitedTeam
                        key={index}
                        team={item}
                        onChange={(id: string) => removeInvitedTeam(id)}
                        className="mt-4"
                      />
                    ))}
                  </div>
                </div>
              ) : (
                <div></div>
              )}

              <div>
                <h1 className="font-vastagoRegular text-white text-[16px] mb-1 pl-1">
                  BET COINS
                </h1>
                <BgInput
                  type="number"
                  placeholder="Set bet coins"
                  value={betCoin}
                  onChange={(e) => {
                    setBetCoin(parseInt(e.target.value));
                  }}
                  error=""
                  className="h-12 w-full text-black/70"
                />
              </div>

              <div>
                <h1 className="font-vastagoRegular text-white text-[16px] mb-1 pl-1">
                  TIME LIMIT
                </h1>
                <BgInput
                  type="number"
                  placeholder="Set time limit"
                  value={timeLimit}
                  onChange={(e) => {
                    setTimeLimit(parseInt(e.target.value));
                  }}
                  error=""
                  className="h-12 w-full text-black/70"
                />
              </div>

              <div>
                <h1 className="font-vastagoRegular text-white text-[16px] mb-1 pl-1">
                  MATCH DATE & TIME
                </h1>
                <BgInput
                  type="datetime-local"
                  placeholder="Set match date and time"
                  value={startTime}
                  onChange={(e) => {
                    setStartTime(e.target.value);
                  }}
                  error=""
                  className="h-12 w-full text-black/70"
                />
              </div>

              <div>
                <h1 className="font-vastagoRegular text-white text-[16px] mb-1 pl-1">
                  MATCH NAME
                </h1>
                <BgInput
                  type="text"
                  placeholder="Enter your name"
                  value={matchName}
                  onChange={(e) => {
                    setMatchName(e.target.value);
                  }}
                  error=""
                  className="h-12 w-full text-black/70"
                />
              </div>
              <div className="flex flex-row justify-center mt-8 mb-3">
                <BgButton
                  size="authentication"
                  className="text-sm w-full h-12"
                  onClick={handleCreateMatch}
                >
                  <span className="text-yellow-bright">CREATE MATCH</span>
                </BgButton>
              </div>
            </form>
          </motion.div>
        </div>
      </AnimatePresence>

      {/* Sidebar Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-sm pointer-events-auto z-50 transition-opacity duration-300"
          onClick={toggleSidebar}
        ></div>
      )}

      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            className="fixed right-0 top-0 w-full md:w-96 h-full bg-dark/90 shadow-lg z-50 overflow-y-auto"
          >
            <div className="flex flex-col justify-between relative p-5 overflow-y-scroll smart-scroll h-full">
              <div>
                <div className="flex justify-between w-full">
                  <h1 className="font-vastagoSemiBold text-[28px] text-white">
                    Invite Team
                  </h1>
                  {/* Close Button */}
                  <button
                    className="text-white text-xl cursor-pointer hover:text-yellow-400 transition-colors"
                    onClick={toggleSidebar}
                  >
                    ✕
                  </button>
                </div>
                <SearchInput
                  text={search}
                  setText={(text: string) => {
                    setSearch(text);
                    debouncedSearch(text);
                  }}
                  className="mt-5 mb-5"
                />
                {teamsdata.map((item, index) => (
                  <InviteTeamItem
                    key={index}
                    team={item}
                    checked={selectedUserIds.includes(item.id)}
                    onChange={(id: string, checked: boolean) =>
                      updateSelectedItem(id, checked)
                    }
                  />
                ))}
              </div>

              <div className="bottom-10 flex flex-row justify-center gap-2 w-full">
                <BgButton
                  onClick={resetSelectedUserIds}
                  size="off"
                  className="w-40 h-10"
                >
                  <span className="text-yellow-bright">RESET</span>
                </BgButton>
                <BgButton
                  onClick={setinviteTeams}
                  size="on"
                  className="w-40 h-10"
                >
                  <span className="text-yellow-bright">INVITE TEAM</span>
                </BgButton>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CreateTeamMatches;
