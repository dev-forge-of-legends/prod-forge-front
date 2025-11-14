import { apiGetChatRooms, apiGetJoinRequestByTeam } from "@apis/team";
import { SearchInput } from "@components/atoms";
import { RequestBox } from "@components/organisms/RequestBox/RequestBox";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

interface Item {
  id?: string;
  teamId?: string;
  userId: string;
  status: string;
  userInfo: UserInfo;
}

interface UserInfo {
  avatar: string;
  email: string;
  id: string;
  level: number;
  loses: number;
  played: number;
  role: string;
  teamId: string;
  userName: string;
  wins: number;
}

const JoinRequest: React.FC = () => {
  const [request, setRequest] = useState<Item[]>([]);
  const [selectedTeamId, setSelectedTeamId] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [text, setText] = useState("");

  const [searchResult, setSearchResult] = useState(request);

  useEffect(() => {
    fetchUserData();
  }, []);

  useEffect(() => {
    const query = text.trim().toLowerCase();
    const filtered = request.filter((item) => {
      const itemsText =
        !query || `${item.userInfo.userName}`.toLowerCase().includes(query);
      return itemsText;
    });
    setSearchResult(filtered);
  }, [text]);

  useEffect(() => {
    if (selectedTeamId) {
      fetchJoinRequests(selectedTeamId);
    }
  }, [selectedTeamId]);

  const fetchUserData = async () => {
    try {
      setLoading(true);
      const roomsData = await apiGetChatRooms();

      if (roomsData.length > 0) {
        setSelectedTeamId(roomsData[0].teamInfo.id);
      }
    } catch (error) {
      console.error("Failed to fetch rooms:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchJoinRequests = async (teamId: string) => {
    try {
      const data = await apiGetJoinRequestByTeam(teamId);
      setRequest(data.items);
      setSearchResult(data.items);
    } catch (error) {
      console.error("Failed to fetch join requests:", error);
      setRequest([]);
      setSearchResult([]);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 flex justify-center items-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="w-16 h-16 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-cyan-200 text-lg font-semibold">
            Loading your teams...
          </p>
          <p className="text-gray-400 text-sm mt-2">
            Preparing the battlefield
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="quicksand-font h-full text-white p-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-4 md:mb-8"
      >
        <h1 className="font-vastagoRegular text-xl md:text-3xl text-left mb-4">
          Join Requests
        </h1>
        <div className="w-80">
          <SearchInput text={text} setText={setText} />
        </div>
      </motion.div>

      {/* Content Area */}
      <AnimatePresence mode="wait">
        {selectedTeamId && request.length === 0 ? (
          <motion.div
            key="no-requests"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="text-center mt-6 p-8 md:p-12 bg-gray-800/30 backdrop-blur-sm rounded-2xl border border-gray-700/50 max-w-2xl mx-auto"
          >
            <h3 className="text-2xl font-bold text-white mb-4">
              No Join Requests Yet
            </h3>
            <p className="text-gray-400 text-lg">
              When players request to join your team, their requests will appear
              here.
            </p>
            <div className="mt-6 text-gray flex items-center justify-center gap-2">
              <svg
                className="w-5 h-5 animate-pulse"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>Waiting for new requests...</span>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="requests-grid"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 0.3 }}
          >
            {/* Requests Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
              <AnimatePresence>
                {searchResult.map((req, index) => (
                  <motion.div
                    key={req.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ y: -5, transition: { duration: 0.2 } }}
                  >
                    <RequestBox
                      id={req.id}
                      teamId={req.teamId}
                      userId={req.userId}
                      status={req.status}
                      userInfo={req.userInfo}
                      onStatusUpdate={() => fetchJoinRequests(selectedTeamId)}
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default JoinRequest;
