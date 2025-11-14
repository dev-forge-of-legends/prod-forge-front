import { apiCreateIndividualMatch } from "@apis/individual_match";
import { apiGetUsers } from "@apis/user";
import { UserData } from "@app-types/interfaces";
import { BgButton, BgInput } from "@components/atoms";
import { InviteFriendItem } from "@components/molecules/InviteFriendBar/InviteFriendItem";
import { InviteFriendRighitSideItem } from "@components/molecules/InviteFriendBar/InviteFriendItemForCreation";
import { AnimatePresence, motion } from "framer-motion";
import { debounce } from "perfect-debounce";
import React, { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const CreateIndividualMatch: React.FC = () => {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [usersdata, setUsersdata] = useState<UserData[]>([]);
  const [selectedUserIds, setSelectedUserIds] = useState<string[]>([]);
  const [invitedUsers, setInvitedUsers] = useState<UserData[]>([]);
  const [search, setSearch] = useState("");

  const [selectedMode, setSelectedMode] = useState("");
  const [isPublic, setIsPublic] = useState(false);
  const [betCoin, setBetCoin] = useState(0);
  const [timeLimit, setTimeLimit] = useState(0);
  const [startTime, setStartTime] = useState("");
  const [matchName, setMatchName] = useState("");

  const debouncedSearch = useCallback(
    debounce((term: string) => {
      console.log("Searching for:", term);
      fetchUserData(term);
    }, 500),
    []
  );

  useEffect(() => {
    return () => {
      debouncedSearch.cancel();
    };
  }, [debouncedSearch]);

  useEffect(() => {
    fetchUserData("");
  }, []);

  const fetchUserData = async (search: string) => {
    const data = await apiGetUsers(search);
    setUsersdata(data.items);
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

  const setinviteFriends = () => {
    setInvitedUsers(usersdata.filter((it) => selectedUserIds.includes(it.id)));
    setSelectedUserIds([]);
    toggleSidebar();
  };

  const removeInvitedFriend = (id: string) => {
    setInvitedUsers(invitedUsers.filter((it) => it.id !== id));
  };

  const handleModeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedMode(event.target.value);
  };

  const handlePublicChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsPublic(event.target.checked);
    setInvitedUsers([]);
  };

  const handleCreateMatch = async () => {
    const payload = {
      name: matchName,
      isPublic: isPublic,
      mode: selectedMode,
      avatar:
        "https://sfo3.digitaloceanspaces.com/forge-dev-assets/assets/images/dragon_icon.webp",
      players: [...invitedUsers.map((it) => it.id)],
      betCoin: betCoin,
      timeLimit: timeLimit,
      startTime: startTime,
    };
    try {
      const res = await apiCreateIndividualMatch(payload);
      console.log(res);
      navigate("/individual-all-matches");
      toast.success("Match created successfully");
    } catch (err: any) {
      toast.error(err.message || "Failed to create match");
    }
  };

  return (
    <div className="h-[90vh] flex flex-col justify-center items-center">
      <AnimatePresence>
        {/* <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={handleClose}
        className="quicksand-font bg-[url('https://sfo3.digitaloceanspaces.com/forge-dev-assets/assets/images/logback.webp')] fixed inset-0  flex items-center justify-center z-150 p-4"
      > */}
        <div className="flex justify-center items-center w-full md:w-125  font-vastagoMedium">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="border-[1px] items-center justify-center overflow-y-scroll smart-scroll h-[85vh]   border-[rgba(200,200,200,0.3)] rounded-lg p-6 w-full  relative shadow-[0_0_3px_1px_rgba(250,250,250,0.1)]]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              className="absolute top-4 right-4 text-white text-xl cursor-pointer hover:text-yellow-400 transition-colors"
              onClick={() => navigate("/homedashboard")}
            >
              ✕
            </button>

            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-white mb-2">
                Create Account
              </h2>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
              }}
              className="space-y-4"
            >
              <div>
               <h1 className="font-vastagoRegular text-white text-[16px] mb-1 pl-1">PLAYERS TO JOIN</h1>
                <label className="mr-10">
                  <input
                    type="radio"
                    className="text-white"
                    value="2"
                    checked={selectedMode === "2"}
                    onChange={handleModeChange}
                  />
                  <span className="text-white pl-2">Two Player</span>
                </label>
                <label>
                  <input
                    type="radio"
                    value="4"
                    checked={selectedMode === "4"}
                    onChange={handleModeChange}
                  />
                  <span className="text-white pl-2">Four Player</span>
                </label>
              </div>

              <div>
                <h1 className="font-vastagoRegular text-white text-[16px] mb-1 pl-1">Allow Anyone to Join</h1>
                <input
                  type="checkbox"
                  checked={isPublic}
                  onChange={handlePublicChange}
                />
              </div>

              {!isPublic ? (
                <div>
                  <div className="h-[60px] my-[5%]">
                    <BgButton
                      onClick={toggleSidebar}
                      size="sm"
                      scale={1}
                    >
                      <span className="text-yellow-bright">+ INVITE FRIEND</span>
                    </BgButton>
                  
                  </div>
                  <div className="w-full relative">
                    {invitedUsers.map((item, index) => (
                      <InviteFriendItem
                        key={index}
                        user={item}
                        isDelete={true}
                        checked={true}
                        onChange={(id: string) => removeInvitedFriend(id)}
                      />
                    ))}
                  </div>
                </div>
              ) : (
                <div></div>
              )}

              <div>
                <h1 className="font-vastagoRegular text-white text-[16px] mb-1 pl-1">BET COINS</h1>
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
                <h1 className="font-vastagoRegular text-white text-[16px] mb-1 pl-1">TIME LIMIT</h1>
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
                <h1 className="font-vastagoRegular text-white text-[16px] mb-1 pl-1">MATCH DATE & TIME</h1>
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
                <h1 className="font-vastagoRegular text-white text-[16px] mb-1 pl-1">MATCH NAME</h1>
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
              <div className="flex flex-row justify-center mt-8 mb-3 ">
                <BgButton
                  size="authentication"
                  className="text-sm w-full h-12"
                  onClick={handleCreateMatch}
                >
                  <span className="text-yellow-bright">
                    CREATE MATCH
                  </span>
                </BgButton>
              </div>
            </form>
          </motion.div>
        </div>
      </AnimatePresence>

      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-sm pointer-events-auto transition-opacity duration-300 z-10"
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
            className="fixed right-0 top-0 w-full sm:w-96 h-full bg-[#160B0480] shadow-lg z-50 overflow-y-auto"
          >
            <div className="p-4 overflow-y-scroll smart-scroll h-[100vh]">
              <h1 className="text-[30px] font-bold text-[white]">
                Invite Friends
              </h1>
              <input
                id="search"
                type="search"
                className="w-full h-13 text-[18px] rounded-md border border-[#FFFFFF33] py-2 pl-10 pr-3 text-sm text-[white]  placeholder-gray-500 focus:border-brand-500 focus:ring-brand-200 focus:outline-none"
                placeholder="Search…"
                aria-label="Search"
                value={search}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  const value = e.target.value;
                  setSearch(value);
                  debouncedSearch(value);
                }}
              />

              {usersdata.map((item, index) => (
                <InviteFriendRighitSideItem
                  key={index}
                  user={item}
                  isDelete={false}
                  checked={selectedUserIds.includes(item.id)}
                  onChange={(id: string, checked: boolean) =>
                    updateSelectedItem(id, checked)
                  }
                />
              ))}
              <div className="flex flex-row justify-center mt-10">
                <BgButton
                  onClick={resetSelectedUserIds}
                  size="off"
                  className="w-40 h-10"
                >
                  <span className="text-yellow-bright">RESET</span>
                </BgButton>
                <BgButton
                  onClick={setinviteFriends}
                  size="on"
                  className="w-40 h-10"
                >
                  <span className="text-yellow-bright">INVITE FRIENDS</span>
                </BgButton>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CreateIndividualMatch;