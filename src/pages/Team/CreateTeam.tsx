import { apiCreateTeam } from "@apis/team";
import { apiGetUsers } from "@apis/user";
import { UserData } from "@app-types/interfaces";
import { Input } from "@components/atoms/Input/Input";
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
  const [isPublic, setIsPublic] = useState(false);
  const [isCreating, setIsCreating] = useState(false);

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
    toast.success(`Invited ${selectedUserIds.length} friend${selectedUserIds.length > 1 ? 's' : ''}`);
  };

  const removeInvitedFriend = (id: string) => {
    setInvitedUsers(invitedUsers.filter((it) => it.id !== id));
    toast.success("Friend removed from team");
  };

  const handlePublicChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsPublic(event.target.checked);
    console.log(event.target.checked);
  };

  const handleCreateTeam = async () => {
    if (!teamname.trim()) {
      toast.error("Please enter a team name");
      return;
    }

    if (invitedUsers.length === 0) {
      toast.error("Please invite at least one friend");
      return;
    }

    setIsCreating(true);
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
      setIsCreating(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 flex items-center justify-center p-4">
      <AnimatePresence>
        <div className="flex justify-center items-center w-full max-w-2xl">
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: -20 }}
            transition={{ duration: 0.5, type: "spring" }}
            className="bg-gray-800/70 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-8 w-full relative shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center bg-gray-700/50 hover:bg-gray-600/50 rounded-full text-white text-lg cursor-pointer transition-all duration-300 hover:scale-110"
              onClick={() => navigate("/homedashboard")}
            >
              ✕
            </button>

            {/* Header */}
            <div className="text-center mb-8">
              <motion.h2 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent mb-3"
              >
                Create Your Dream Team
              </motion.h2>
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-gray-400 text-sm"
              >
                Build your squad and conquer together
              </motion.p>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleCreateTeam();
              }}
              className="space-y-6"
            >
              {/* Team Name */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
              >
                <label className="block text-sm font-medium text-cyan-300 mb-3 uppercase tracking-wider">
                  🏆 Team Name
                </label>
                <Input
                  type="text"
                  placeholder="Enter your legendary team name..."
                  value={teamname}
                  onChange={(e) => {
                    setTeamname(e.target.value);
                  }}
                  className="w-full rounded-xl bg-gray-700/50 border border-gray-600 text-white placeholder-gray-400 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-300"
                  error=""
                />
              </motion.div>

              {/* Public Match Toggle */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
                className="bg-gray-700/30 rounded-xl p-4 border border-gray-600/50"
              >
                <label className="flex items-center justify-between cursor-pointer group">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-lg bg-cyan-500/10 flex items-center justify-center mr-3 group-hover:bg-cyan-500/20 transition-colors">
                      <span className="text-cyan-400">🌐</span>
                    </div>
                    <div>
                      <h3 className="text-white font-semibold">Open Match</h3>
                      <p className="text-gray-400 text-sm">Allow anyone to join your team</p>
                    </div>
                  </div>
                  <div className="relative">
                    <input
                      type="checkbox"
                      className="sr-only"
                      checked={isPublic}
                      onChange={handlePublicChange}
                    />
                    <div className={`block w-14 h-8 rounded-full transition-colors duration-300 ${
                      isPublic ? 'bg-cyan-500' : 'bg-gray-600'
                    }`}></div>
                    <div className={`absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition-transform duration-300 ${
                      isPublic ? 'transform translate-x-6' : ''
                    }`}></div>
                  </div>
                </label>
              </motion.div>

              {/* Invite Friends Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="flex justify-center"
              >
                <button
                  type="button"
                  onClick={toggleSidebar}
                  className="group relative bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl shadow-lg overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                  <span className="relative flex items-center">
                    <svg className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                    </svg>
                    Invite Friends ({invitedUsers.length})
                  </span>
                </button>
              </motion.div>

              {/* Invited Friends List */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="bg-gray-700/30 rounded-xl border border-gray-600/50 overflow-hidden"
              >
                <div className="p-4 border-b border-gray-600/50">
                  <h3 className="text-white font-semibold flex items-center">
                    <svg className="w-4 h-4 mr-2 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    Team Members ({invitedUsers.length})
                  </h3>
                </div>
                <div className="max-h-48 overflow-y-auto">
                  {invitedUsers.map((item) => (
                    <InviteFriendItem
                      key={item.id}
                      user={item}
                      isDelete={true}
                      checked={true}
                      onChange={(id: string) => removeInvitedFriend(id)}
                    />
                  ))}
                  {invitedUsers.length === 0 && (
                    <div className="text-gray-400 text-center py-8 flex flex-col items-center">
                      <svg className="w-12 h-12 mb-3 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                      No friends invited yet. Start building your team!
                    </div>
                  )}
                </div>
              </motion.div>

              {/* Action Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="flex flex-col sm:flex-row gap-4 pt-4"
              >
                <button
                  type="button"
                  onClick={() => navigate("/homedashboard")}
                  className="flex-1 py-3 px-6 border border-gray-600 text-gray-300 hover:text-white hover:border-gray-400 rounded-xl transition-all duration-300 hover:bg-gray-700/50 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isCreating}
                  className="flex-1 py-3 px-6 bg-gradient-to-r from-cyan-600 to-purple-600 hover:from-cyan-500 hover:to-purple-500 disabled:from-gray-600 disabled:to-gray-600 text-white rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg font-semibold flex items-center justify-center"
                >
                  {isCreating ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Creating Team...
                    </>
                  ) : (
                    <>
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                      Create Dream Team
                    </>
                  )}
                </button>
              </motion.div>
            </form>

            {/* Enhanced Sidebar Overlay */}
            <AnimatePresence>
              {isSidebarOpen && (
                <>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-black/60 backdrop-blur-sm pointer-events-auto transition-opacity duration-300 z-40"
                    onClick={toggleSidebar}
                  ></motion.div>

                  {/* Enhanced Sidebar */}
                  <motion.div
                    initial={{ x: "100%", opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: "100%", opacity: 0 }}
                    transition={{ type: "spring", damping: 25, stiffness: 200 }}
                    className="fixed right-0 top-0 w-full sm:w-96 h-full bg-gray-900/95 backdrop-blur-xl shadow-2xl border-l border-gray-700/50 z-50 flex flex-col"
                  >
                    <div className="p-6 border-b border-gray-700/50 bg-gradient-to-r from-gray-900 to-purple-900/20">
                      <div className="flex justify-between items-center">
                        <div>
                          <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                            Invite Friends
                          </h1>
                          <p className="text-gray-400 text-sm mt-1">
                            {selectedUserIds.length} friend{selectedUserIds.length !== 1 ? 's' : ''} selected
                          </p>
                        </div>
                        <button
                          onClick={toggleSidebar}
                          className="w-10 h-10 flex items-center justify-center bg-gray-700/50 hover:bg-gray-600/50 rounded-full text-white text-xl transition-all duration-300 hover:scale-110"
                        >
                          ×
                        </button>
                      </div>
                    </div>

                    <div className="p-6 flex-1 flex flex-col">
                      {/* Search */}
                      <div className="relative mb-6">
                        <input
                          id="search"
                          type="search"
                          className="w-full h-12 rounded-xl bg-gray-800/50 border border-gray-600 px-4 pl-12 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-300"
                          placeholder="Search friends..."
                          aria-label="Search"
                          value={search}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            const value = e.target.value;
                            setSearch(value);
                            debouncedSearch(value);
                          }}
                        />
                        <svg className="absolute left-4 top-3 w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                      </div>

                      {/* Friends List */}
                      <div className="flex-1 overflow-y-auto space-y-2">
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
                        {usersdata.length === 0 && (
                          <div className="text-center text-gray-400 py-8">
                            <svg className="w-12 h-12 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                            </svg>
                            No friends found
                          </div>
                        )}
                      </div>

                      {/* Sidebar Actions */}
                      <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t border-gray-700/50">
                        <button
                          type="button"
                          onClick={resetSelectedUserIds}
                          className="flex-1 py-3 px-6 border border-gray-600 text-gray-300 hover:text-white hover:border-gray-400 rounded-xl transition-all duration-300 hover:bg-gray-800/50 font-semibold"
                        >
                          Reset
                        </button>
                        <button
                          type="button"
                          onClick={setinviteFriends}
                          className="flex-1 py-3 px-6 bg-gradient-to-r from-cyan-600 to-purple-600 hover:from-cyan-500 hover:to-purple-500 text-white rounded-xl transition-all duration-300 transform hover:scale-105 font-semibold shadow-lg"
                        >
                          Invite ({selectedUserIds.length})
                        </button>
                      </div>
                    </div>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </AnimatePresence>
    </div>
  );
};

export default CreateTeam;