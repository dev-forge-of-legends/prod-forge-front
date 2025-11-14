import {
  apiGetTeamMatchesById,
  apiJoinTeamMatches,
  apiLeaveTeamMatches,
  apiMemberJoinTeamMatch,
  apiMemberLeaveTeamMatch,
  apiNotReadyTeamMatch,
  apiReadyTeamMatch,
  apiStartTeamMatch
} from "@apis/team_match";
import { formatDateLocalMDHMS } from "@app-utils/timeUtils";
import { BgButton } from "@components/atoms";
import { useAppDispatch, useAppSelector } from "@redux/store";
import socketService from "@services/socket.service";
import { motion } from "framer-motion";
import { Calendar, Coins, Timer } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { setMatchId } from "../../../redux/slices/individual-match.slice";
import TeamMatchInfoMemberItem from "./TeamMatchInfoMemberItem";
import TeamMatchInfoTeamItem from "./TeamMatchInfoTeamItem";

interface TeamMatchDataType {
  name: string;
  mode: string;
  avatar: string;
  createrTeamId: string;
  isPublic: boolean;
  betCoins: number;
  timeLimit: number;
  teams: TeamsType[];
  startTime: string;
}
interface TeamsType {
  teamId: string;
  status: string;
  invited: boolean;
  color: string;
  nowMoving: boolean;
  team: {
    avatar: string;
    name: string;
    ownerId: string;
  };
  members: string[];
  membersData: MemberType[];
}
interface MemberType {
  id: string;
  userName: string;
  level: number;
  avatar: string;
}

const TeamMatchInfo: React.FC = () => {
  const [teamMatchData, setTeamMatchData] = useState<TeamMatchDataType | undefined>(
    undefined
  );
  const [membersData, setMembersData] = useState<MemberType[]>([]);
  const [isOwner, setIsOwner] = useState(false);
  const [userJoinStatus, setUserJoinStatus] = useState("");
  const [teamJoinStatus, setTeamJoinStatus] = useState("");
  const teamMatchId = useAppSelector((state) => state.teamMatch.teamMatchId);
  const user = useAppSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    loadTeamMatchData();
  }, [teamMatchId]);

  useEffect(() => {
    socketService.addEventHandler("join-match", handleJoinMatchEvent);
    socketService.addEventHandler("match-member", handleMatchMemberEvent);
    return () => {
      socketService.removeEventHandler("join-match", handleJoinMatchEvent);
      socketService.removeEventHandler("match-member", handleMatchMemberEvent);
    };
  }, []);

  const loadTeamMatchData = async () => {
    try {
      const data = await apiGetTeamMatchesById(teamMatchId);

      setTeamMatchData(data);
      if (data.createrTeamId === user.teamId && user.role === "teamLeader") {
        setIsOwner(true);
      } else {
        setIsOwner(false);
      }
      console.log("user", user);
      console.log("data", data);

      if (user.teamId && data.teams.length > 0) {
        const userTeam = data.teams.find((team: TeamsType) => team.teamId === user.teamId);
        if (userTeam) {
          setMembersData(userTeam.membersData);
          if (user.role === "member") {
            if (userTeam.members.includes(String(user.id))) {
              setUserJoinStatus("joined");
            } else {
              setUserJoinStatus("left");
            }
          } else if (user.role === "teamLeader") {
            setUserJoinStatus("");
            setTeamJoinStatus(userTeam.status);
          }
        } else {
          setUserJoinStatus("");
          setTeamJoinStatus("");
        }
      } else {
        setUserJoinStatus("");
        setTeamJoinStatus("");
      }

    } catch (error) {
      console.log(error);
    }
  };

  // Team Member
  const handleMemberJoinTeamMatch = async () => {
    try {
      const data = await apiMemberJoinTeamMatch(teamMatchId);
      console.log(data);
      setUserJoinStatus("joined");
    } catch (error: any) {
      toast.error(error.message || "Failed to leave team match");
      console.log(error);
    }
  };

  // Team Member
  const handleMemberLeaveTeamMatch = async () => {
    try {
      const data = await apiMemberLeaveTeamMatch(teamMatchId);
      console.log(data);
      setUserJoinStatus("left");
    } catch (error: any) {
      toast.error(error.message || "Failed to join team match");
      console.log(error);
    }
  };

  // Team Leader
  const handleJoinTeamMatch = async () => {
    try {
      const data = await apiJoinTeamMatches(teamMatchId, { teamId: user.teamId });
      console.log(data);
      setTeamJoinStatus("joined");
    } catch (error: any) {
      toast.error(error.message || "Failed to join team match");
      console.log(error);
    }
  };

  // Team Leader
  const handleLeaveTeamMatch = async () => {
    try {
      const data = await apiLeaveTeamMatches(teamMatchId);
      console.log(data);
      setTeamJoinStatus("left");
    } catch (error: any) {
      toast.error(error.message || "Failed to leave team match");
      console.log(error);
    }
  };

  // Team Leader
  const handleReadyTeamMatch = async () => {
    try {
      const data = await apiReadyTeamMatch(teamMatchId);
      console.log(data);
    } catch (error: any) {
      toast.error(error.message || "Failed to ready match");
      console.log(error);
    }
  };

  // Team Leader
  const handleNotReadyTeamMatch = async () => {
    try {
      const data = await apiNotReadyTeamMatch(teamMatchId);
      console.log(data);
    } catch (error: any) {
      toast.error(error.message || "Failed to not ready match");
      console.log(error);
    }
  };

  // Match Owner
  const handleStartTeamMatch = async () => {
    try {
      const data = await apiStartTeamMatch(teamMatchId);
      console.log(data);
    } catch (error: any) {
      toast.error(error.message || "Failed to start match");
      console.log(error);
    }
  };

  // Match Owner
  // const handleCancelTeamMatch = async () => {
  //   try {
  //     const data = await apiCancelTeamMatch(teamMatchId);
  //     console.log(data);
  //   } catch (error: any) {
  //     toast.error(error.message || "Failed to cancel match");
  //     console.log(error);
  //   }
  // };

  // Socket Event Handler
  const handleJoinMatchEvent = (data: any) => {
    if (data.type === "start-match") {
      dispatch(setMatchId(data.matchId));
      navigate("/team-game");
    } else if (data.type === "join-match") {
      loadTeamMatchData();
    } else if (data.type === "left-match") {
      loadTeamMatchData();
    }
  };

  const handleMatchMemberEvent = (data: any) => {
    if (data.type === "member-added") {
      const teamId: string | undefined = data.teamId;
      const addedMemberIds: string[] = (data.memberUserIds || []).map(
        (memberId: string | number) => String(memberId)
      );
      const addedMembers: MemberType[] = (data.members || []) as MemberType[];

      if (teamId && teamId === user.teamId) {
        setMembersData((currentMembers) => {
          const existingIds = new Set(currentMembers.map((member) => member.id));
          const mergedMembers = [
            ...currentMembers,
            ...addedMembers.filter((member) => !existingIds.has(member.id)),
          ];
          return mergedMembers;
        });

        if (
          user.role === "member" &&
          addedMemberIds.includes(String(user.id))
        ) {
          setUserJoinStatus("joined");
        }
      }
    } else if (data.type === "member-removed") {
      const { teamId, userId } = data;
      if (teamId && teamId === user.teamId) {
        setMembersData((currentMembers) =>
          currentMembers.filter((member) => member.id !== String(userId))
        );
      }
    }
  }

  return (
    <div className="quicksand-font h-full text-white p-4 md:p-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        <h1 className="font-vastagoRegular text-xl sm:text-3xl text-left mb-8">Team Match Info</h1>
        <div className="flex flex-col sm:flex-row justify-between gap-4 sm:gap-6">
          <div
            className="flex flex-col justify-start rounded-xl border border-[#383838] 
                bg-gradient-to-br from-[rgba(28,28,28,0.2)] to-[rgba(130,130,130,0.2)] 
                p-4 sm:p-8 gap-4 w-full sm:w-1/2"
          >
            <div className="flex flex-row justify-between items-start">
              <div className="flex flex-col justify-start items-start">
                <h1 className="font-vastagoRegular text-lg sm:text-[22px] text-left text-white/50">{teamMatchData?.mode} Teams</h1>
                <h1 className="font-vastagoRegular text-lg sm:text-[24px] text-left text-yellow-400">{teamMatchData?.name}</h1>
              </div>
              <div>
                <button className="font-vastagoRegular text-xs sm:text-sm text-left border border-gray-400 text-gray-400 px-2 py-1 rounded-full whitespace-nowrap">Edit Details</button>
              </div>
            </div>
            <div className="flex flex-row flex-nowrap justify-between gap-2 sm:gap-2 mt-4 overflow-x-auto scroll-smooth custom-scrollbar">
              <div className="flex justify-start items-start gap-1 flex-shrink-0 min-w-[140px]">
                <Calendar className="w-5 h-5 sm:w-6 sm:h-6 text-white/50 flex-shrink-0" />
                <div className="flex flex-col items-start">
                  <p className="font-vastagoRegular text-sm sm:text-[18px] text-white/50 whitespace-nowrap">Match Date</p>
                  <p className="font-vastagoRegular text-sm sm:text-[18px] text-white/80 whitespace-nowrap">{formatDateLocalMDHMS(teamMatchData?.startTime || "")}</p>
                </div>
              </div>
              <div className="flex justify-start items-start gap-1 flex-shrink-0 min-w-[120px]">
                <Coins className="w-5 h-5 sm:w-6 sm:h-6 text-white/50 flex-shrink-0" />
                <div className="flex flex-col items-start">
                  <p className="font-vastagoRegular text-sm sm:text-[18px] text-white/50 whitespace-nowrap">Bet Coins</p>
                  <p className="font-vastagoRegular text-sm sm:text-[18px] text-white/80 whitespace-nowrap">{teamMatchData?.betCoins} coins</p>
                </div>
              </div>
              <div className="flex justify-start items-start gap-1 flex-shrink-0 min-w-[110px]">
                <Timer className="w-5 h-5 sm:w-6 sm:h-6 text-white/50 flex-shrink-0" />
                <div className="flex flex-col items-start">
                  <p className="font-vastagoRegular text-sm sm:text-[18px] text-white/50 whitespace-nowrap">Time Limit</p>
                  <p className="font-vastagoRegular text-sm sm:text-[18px] text-white/80 whitespace-nowrap">{teamMatchData?.timeLimit} min</p>
                </div>
              </div>
            </div>
            <div className="flex flex-row w-full items-center mb-4">
              <p className="text-lg sm:text-[24px] font-vastagoRegular text-white text-left whitespace-nowrap">Teams Join</p>
              <div className="border border-b-[1] h-0 border-transparent border-b-white/20 w-full ml-2"></div>
            </div>
            <div className="flex flex-row w-full justify-between gap-2 sm:gap-3 mb-4 overflow-x-auto scroll-smooth custom-scrollbar">
              {teamMatchData?.teams.map((team) => (
                <TeamMatchInfoTeamItem
                  key={team.teamId}
                  avatar={team.team.avatar}
                  teamName={team.team.name}
                  members={team.members.length}
                  isPublicMatch={teamMatchData?.isPublic}
                  status={team.status}
                  isOwner={false}
                  userRole={user.role}
                />
              ))}
            </div>
          </div>
          <div
            className="flex flex-col justify-start rounded-xl border border-[#383838] 
                bg-gradient-to-br from-[rgba(28,28,28,0.2)] to-[rgba(130,130,130,0.2)] 
                p-4 sm:p-8 w-full sm:w-1/2"
          >
            <div className="flex flex-row justify-between items-center">
              <h1 className="font-vastagoRegular text-lg md:text-[22px] text-left text-white/50">My Team</h1>
              <button className="font-vastagoRegular text-xs md:text-md text-left border border-gray-400 text-gray-400 px-2 py-1 rounded-full whitespace-nowrap">{teamMatchData?.teams.length} Members</button>
            </div>
            <div className="flex flex-row w-full justify-between gap-2 md:gap-3 mt-4 overflow-x-auto scroll-smooth custom-scrollbar">
              {membersData.map((member) => (
                <TeamMatchInfoMemberItem
                  key={member.id}
                  avatar={member.avatar}
                  userName={member.userName}
                  level={member.level}
                  status={userJoinStatus}
                  isOwner={false}
                />
              ))}
            </div>
          </div>
        </div>
        <div className="flex flex-row justify-end items-center mt-4">
          {isOwner ? (
            <div className="flex flex-row justify-end items-center gap-2">
              {/* <BgButton size="md" scale={1.2} className="text-sm w-full" onClick={handleCancelTeamMatch}>
                <span className="text-yellow-bright">Cancel Match</span>
              </BgButton> */}
              <BgButton size="md" scale={1.2} className="text-sm w-full" onClick={handleStartTeamMatch}>
                <span className="text-yellow-bright">Start Match</span>
              </BgButton>
            </div>
          ) : user.role === "member" ? (
            <div>
              {userJoinStatus === "joined" ? <BgButton size="md" scale={1.2} className="text-sm w-full" onClick={handleMemberLeaveTeamMatch}>
                <span className="text-yellow-bright">Leave Match</span>
              </BgButton> : userJoinStatus === "left" ? <BgButton size="md" scale={1.2} className="text-sm w-full" onClick={handleMemberJoinTeamMatch}>
                <span className="text-yellow-bright">Join Match</span>
              </BgButton> : null}
            </div>
          ) : user.role === "teamLeader" ? (
            <div>
              {teamJoinStatus === "joined" ?
                <div className="flex flex-row justify-end items-center gap-2">
                  <BgButton size="md" scale={1.2} className="text-sm w-full" onClick={handleLeaveTeamMatch}>
                    <span className="text-yellow-bright">Leave Match</span>
                  </BgButton>
                  <BgButton size="md" scale={1.2} className="text-sm w-full" onClick={handleReadyTeamMatch}>
                    <span className="text-yellow-bright">Ready Match</span>
                  </BgButton>
                </div>
                : teamJoinStatus === "ready" ?
                  <div className="flex flex-row justify-end items-center gap-2">
                    <BgButton size="md" scale={1.2} className="text-sm w-full" onClick={handleNotReadyTeamMatch}>
                      <span className="text-yellow-bright">Not Ready</span>
                    </BgButton>
                    <BgButton size="md" scale={1.2} className="text-sm w-full" onClick={handleLeaveTeamMatch}>
                      <span className="text-yellow-bright">Leave Match</span>
                    </BgButton>
                  </div>
                  : teamJoinStatus === "notReady" ?
                    <div className="flex flex-row justify-end items-center gap-2">
                      <BgButton size="md" scale={1.2} className="text-sm w-full" onClick={handleReadyTeamMatch}>
                        <span className="text-yellow-bright">Ready Match</span>
                      </BgButton>
                      <BgButton size="md" scale={1.2} className="text-sm w-full" onClick={handleLeaveTeamMatch}>
                        <span className="text-yellow-bright">Leave Match</span>
                      </BgButton>
                    </div>
                    : <BgButton size="md" scale={1.2} className="text-sm w-full" onClick={handleJoinTeamMatch}>
                      <span className="text-yellow-bright">Join Match</span>
                    </BgButton>}
            </div>
          ) : null}
        </div>
      </motion.div>
    </div>
  );
};

export default TeamMatchInfo;