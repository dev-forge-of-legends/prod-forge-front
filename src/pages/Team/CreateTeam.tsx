import { apiCreateTeam } from "@apis/team";
import { apiGetUsers } from "@apis/user";
import { UserData } from "@app-types/interfaces";
import { BgButton, BgInput } from "@components/atoms";
import { InviteFriendItem } from "@components/molecules/InviteFriendBar/InviteFriendItem";
import { AnimatePresence, motion } from "framer-motion";
import { debounce } from "perfect-debounce";
import React, { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const CreateTeam: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [usersdata, setUsersdata] = useState<UserData[]>([]);
  const [selectedUserIds, setSelectedUserIds] = useState<string[]>([]);
  const [invitedUsers, setInvitedUsers] = useState<UserData[]>([]);
  const [search, setSearch] = useState("");
  const [teamname, setTeamname] = useState("");
  // const [isPublic, setIsPublic] = useState(false);
  // const [isCreating, setIsCreating] = useState(false);

  const navigate = useNavigate();

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
    console.log("User Data : ", data);
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
    if (selectedUserIds.length === 0) {
      toast.error("Please select at least one friend to invite");
      return;
    }
    setInvitedUsers(usersdata.filter((it) => selectedUserIds.includes(it.id)));
    setSelectedUserIds([]);
    toggleSidebar();
    toast.success(
      `Invited ${selectedUserIds.length} friend${selectedUserIds.length > 1 ? "s" : ""
      }`
    );
  };

  // const removeInvitedFriend = (id: string) => {
  //   setInvitedUsers(invitedUsers.filter((it) => it.id !== id));
  //   toast.success("Friend removed from team");
  // };

  const handleCreateTeam = async () => {
    if (!teamname.trim()) {
      toast.error("Please enter a team name");
      return;
    }

    if (invitedUsers.length === 0) {
      toast.error("Please invite at least one friend");
      return;
    }

    // setIsCreating(true);
    const members = invitedUsers.map((it) => it.id);
    console.log(members);

    try {
      const res = await apiCreateTeam(teamname, members);
      console.log(res);
      toast.success("🎉 Team created successfully!");
      setTimeout(() => {
        navigate("/homedashboard");
      }, 1500);
    } catch (err: any) {
      toast.error(err.message || "Failed to create Team");
    } finally {
      // setIsCreating(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <AnimatePresence>
        <div className="flex justify-center items-center w-full max-w-lg">
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: -20 }}
            transition={{ duration: 0.5, type: "spring" }}
            className="bg-[#160B04]/50 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-8 w-full relative shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-ceter justify-between mb-8">
              {/* Header */}
              <div className="text-center">
                <motion.h2
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-3xl font-bold text-[#FFFFFF]"
                >
                  Create Your Dream Team
                </motion.h2>
              </div>
              {/* Close Button */}
              <button
                className="text-[#9E9E9E] text-lg cursor-pointer transition-all duration-300 hover:scale-110"
                onClick={() => navigate("/homedashboard")}
              >
                ✕
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                // handleCreateTeam();
              }}
              className="space-y-6"
            >
              {/* Team Name */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
              >
                <label className="block text-sm font-medium text-white  mb-3 uppercase tracking-wider">
                  Team Name
                </label>
                {/* <Input
                  type="text"
                  placeholder="Enter your legendary team name..."
                  value={teamname}
                  onChange={(e) => {
                    setTeamname(e.target.value);
                  }}
                  className="w-100 h-12 px-4 py-2 bg-cover bg-center"
                  style={{
                    backgroundImage:
                      "url('https://sfo3.digitaloceanspaces.com/forge-dev-assets/assets/images/buttons/input_bg.webp')",
                    backgroundSize:
                      'cover',
                  }}
                /> */}
                <BgInput
                  type="text"
                  placeholder="Enter your Legendary team name..."
                  value={teamname}
                  onChange={(e) => {
                    setTeamname(e.target.value);
                  }}
                  error=""
                  className="h-12 w-full text-black/70"
                />
              </motion.div>

              {/* Invite Friends Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="flex justify-start"
              >
                <BgButton
                  size="dashboard"
                  className="text-sm w-45 h-12"
                  onClick={toggleSidebar}
                >
                  <span className="text-yellow-bright uppercase">
                    +Invite Friends ({invitedUsers.length})
                  </span>
                </BgButton>
              </motion.div>

              {/* Invited Friends List */}

              {/* Action Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="flex flex-col sm:flex-row gap-4 pt-4"
              >
                <BgButton
                  size="off"
                  className="text-sm w-55 h-15"
                  onClick={() => navigate("/homedashboard")}
                >
                  <span className="text-yellow-bright uppercase">Cancel</span>
                </BgButton>
                <BgButton
                  onClick={handleCreateTeam}
                  size="on"
                  className="text-sm w-55 h-15"
                >
                  <span className="font-vastagoSemiBold bg-gradient-to-b from-[#F3DB8E] to-[#A97525] bg-clip-text uppercase text-transparent [filter:drop-shadow(0px_1px_0px_#160B04)] hover:text-[#F3DB8E]">
                    Create team
                  </span>
                </BgButton>
              </motion.div>
            </form>

            {/* Enhanced Sidebar Overlay */}
          </motion.div>
        </div>
      </AnimatePresence>
      <AnimatePresence>
        {isSidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/0 backdrop-blur-sm pointer-events-auto transition-opacity duration-300 z-40"
              onClick={toggleSidebar}
            ></motion.div>

            {/* Enhanced Sidebar */}
            <motion.div
              initial={{ x: "100%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: "100%", opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 w-full sm:w-96 h-full bg-[#0f0f0f]/95 backdrop-blur-xl shadow-2xl border-l border-gray-700/50 z-50 flex flex-col"
            >
              <div className="p-6 bg-[#160B04]/50">
                <div className="flex justify-between items-center">
                  <div>
                    <h1 className="text-2xl font-bold text-white bg-clip-text text-transparent">
                      Invite Friends
                    </h1>
                    <p className="text-gray-400 text-sm mt-1">
                      {selectedUserIds.length} friend
                      {selectedUserIds.length !== 1 ? "s" : ""} selected
                    </p>
                  </div>
                  <button
                    onClick={toggleSidebar}
                    className="mb-6 text-white text-3xl hover:text-yellow-400 transition-colors"
                  >
                    ×
                  </button>
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col bg-[#160b04]/50 min-h-0">
                {/* Search */}
                <div className="relative mb-6 flex-shrink-0">
                  <input
                    id="search"
                    type="search"
                    className="w-full h-12 rounded-[12px] bg-[#160B04]/100 border border-gray-600/50  px-4 pl-12 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-300"
                    placeholder="Search friends..."
                    aria-label="Search"
                    value={search}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      const value = e.target.value;
                      setSearch(value);
                      debouncedSearch(value);
                    }}
                  />
                  <svg
                    className="absolute left-4 top-3 w-6 h-6 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>

                {/* Friends List */}
                <div className="flex-1 overflow-y-auto space-y-2 min-h-0">
                  {usersdata.map((item) => (
                    <InviteFriendItem
                      key={item.id}
                      user={item}
                      isDelete={false}
                      checked={selectedUserIds.includes(item.id)}
                      onChange={(id: string, checked: boolean) =>
                        updateSelectedItem(id, checked)
                      }
                    />
                  ))}
                  {/* {usersdata.length === 0 && (
                    <div className="text-center text-gray-400 py-8">
                      <svg
                        className="w-12 h-12 mx-auto mb-3"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1}
                          d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
                        />
                      </svg>
                      No friends found
                    </div>
                  )} */}
                </div>
                <div className="flex flex-row justify-center mt-6 flex-shrink-0">
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
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CreateTeam;
