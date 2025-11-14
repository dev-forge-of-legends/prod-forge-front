import {
  apiGetTeamMatchesById,
  apiRollDice,
  apiVotePawn,
} from "@apis/team_match";
import { PAWN_COLORS } from "@app-types/types";
import { Pawn, PlayerAsTeam, TeamMatchData } from "@app-utils/gamePlayUtils";
import Dice from "@components/organisms/IndividualGame/Dice";
import Timer from "@components/organisms/IndividualGame/Timer";
import { Board } from "@components/organisms/TeamGame/Board";
import { PawnsVote } from "@components/organisms/TeamGame/PawnsVote";
import { useAppSelector } from "@redux/store";
import socketService from "@services/socket.service";
import { ChevronsDown, ChevronsUp } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import MatchChat from "./MatchChat";

const TeamGame: React.FC = () => {
  const teamId = useRef("");
  const matchId = useAppSelector((state) => state.teamMatch.teamMatchId);

  const [pawns, setPawns] = useState<Pawn[]>([]);
  const [showChat, setShowChat] = useState(false); // Control chat visibility
  const [players, setPlayers] = useState<PlayerAsTeam[]>(
    Array.from({ length: 4 }, () => ({
      teamId: "",
      status: "",
      invited: false,
      color: PAWN_COLORS.None,
      nowMoving: false,
      team: {
        name: "",
        avatar: "",
        level: 0,
      },
    }))
  );
  const [rolledNumber, setRolledNumber] = useState<number>(0);
  const [rollTimestamp, setRollTimestamp] = useState<number>(0);
  const [time, setTime] = useState<number>(60);
  const [nowMoving, setNowMoving] = useState(false);
  const [movingPlayerColor, setMovingPlayerColor] = useState("");
  const [winner, setWinner] = useState<any>(null);
  const [selectedPawnId, setSelectedPawnId] = useState<string | null>(null);
  const [hoveredPawnId, setHoveredPawnId] = useState<string | null>(null);

  useEffect(() => {
    const user_data = localStorage.getItem("userdata");
    console.log("userdata", user_data);
    if (user_data) {
      teamId.current = JSON.parse(user_data).teamId;
    }
    socketService.addEventHandler("teamgame:data", handleDataEvent);
    socketService.addEventHandler("teamgame:roll", handleRollEvent);
    socketService.addEventHandler("game:winner", handleWinner);
    fetchMatchData();
    return () => {
      socketService.removeEventHandler("teamgame:data", handleDataEvent);
      socketService.removeEventHandler("game:roll", handleRollEvent);
      socketService.removeEventHandler("game:winner", handleWinner);
    };
  }, []);

  useEffect(() => {
    if (teamId.current) {
      fetchMatchData();
    }
  }, []);

  // Toggle chat visibility
  const toggleSidebar = () => {
    setShowChat((prev) => !prev);
  };

  const handleData = (data: TeamMatchData) => {
    console.log("matchData", data);
    setWinner(data.winner || null);
    if (data.teams == null) return;

    // Filling navbar with empty player nick container
    while (data.teams.length !== 4) {
      data.teams.push({
        teamId: teamId.current,
        status: "",
        invited: false,
        color: PAWN_COLORS.None,
        nowMoving: false,
        team: {
          name: "",
          avatar: "",
          level: 0,
        },
      });
    }
    console.log("players", data.teams);

    // Checks if client is currently moving player by session ID
    const nowMovingPlayer = data.teams.find(
      (player: { nowMoving: boolean }) => player.nowMoving === true
    );
    console.log("nowMovingPlayer", nowMovingPlayer);

    if (nowMovingPlayer) {
      console.log("nowmovingplayer id", nowMovingPlayer.teamId);
      console.log("my teamid", teamId.current);
      if (nowMovingPlayer.teamId === teamId.current) {
        setNowMoving(true);
      } else {
        setNowMoving(false);
      }
      setMovingPlayerColor(nowMovingPlayer.color);
    }

    setRolledNumber(data.rolledNumber || 1);
    setPlayers(data.teams);
    setPawns(data.pawns);
    setTime(data.nextMoveTime || 10);
  };

  const handleRollEvent = (data: any) => {
    console.log("🎲 Roll event received from socket:", data);
    setRolledNumber(data.rolledNumber);
    setRollTimestamp(Date.now());
    setSelectedPawnId(null);
  };

  const handleDataEvent = ({ match }: { match: TeamMatchData }) => {
    console.log("data event", match);
    handleData(match);
    setSelectedPawnId(null);
  };

  const handleWinner = (winner: any) => {
    setWinner(winner);
  };

  const fetchMatchData = async () => {
    const data = await apiGetTeamMatchesById(matchId);
    console.log("match data fetched:", data);
    handleData(data);
  };

  const rollDice = async () => {
    try {
      await apiRollDice(matchId);
      toast.success("You rolled ...");
    } catch (error: any) {
      toast.error(error.message || "Please try again");
    }
  };

  const votePawn = async (pawnId: string) => {
    try {
      setSelectedPawnId(pawnId);
      await apiVotePawn(matchId, pawnId);
      toast.success(`Voted for pawn`);
    } catch (error: any) {
      toast.error(error.message || "Please try again");
    }
  };

  return (
    <div className="relative min-h-screen w-full bg-[#090502]">
      {/* Mobile overlay when chat is open */}
      {showChat && (
        <div
          className="fixed inset-0 z-40 bg-black/60 lg:hidden"
          onClick={toggleSidebar}
        />
      )}

      <div className="relative flex flex-col lg:flex-row gap-6 max-w-[1400px] mx-auto px-4 lg:px-8 pt-6 pb-28 lg:pb-10">
        {/* Chat Panel */}
        <div className="w-full lg:w-96 lg:flex-shrink-0">
          <div
            className={`fixed inset-x-0 bottom-0 z-50 h-[85vh] w-full transform border-t-2 border-[#3a281e] bg-[#1b1009] shadow-2xl transition-all duration-500 ease-out rounded-t-3xl
            ${showChat
                ? "translate-y-0 opacity-100 pointer-events-auto"
                : "translate-y-full opacity-0 pointer-events-none"
              }
            lg:static lg:inset-auto lg:h-[70vh] lg:max-h-[600px] lg:w-full lg:rounded-2xl lg:border-2 lg:border-[#3a281e] lg:opacity-100 lg:translate-y-0 lg:pointer-events-auto`}
          >
            <div className="h-full flex flex-col">
              <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 lg:hidden">
                <p className="text-white font-semibold">Team Chat</p>
                <button
                  className="text-sm text-yellow-400"
                  onClick={toggleSidebar}
                >
                  Close
                </button>
              </div>
              <div className="flex-1">
                <MatchChat />
              </div>
            </div>
          </div>

          {/* Desktop toggle button */}
          <div className="hidden lg:block mt-4">
            <button
              className="w-full text-white font-semibold py-4 px-6 rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl border border-white/10 bg-black/40"
              onClick={toggleSidebar}
            >
              <div className="flex items-center justify-center space-x-2">
                {players.find((p) => p.teamId === teamId.current)?.team?.avatar ? (
                  <img
                    src={players.find((p) => p.teamId === teamId.current)?.team?.avatar}
                    alt="Team Avatar"
                    className="w-6 h-6 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-6 h-6 rounded-full bg-gray-600 flex items-center justify-center">
                    <span className="text-xs text-white">T</span>
                  </div>
                )}
                <span>{showChat ? "Hide Team Chat" : "Live Team Chat"}</span>
                {!showChat ? <ChevronsUp /> : <ChevronsDown />}
              </div>
            </button>
          </div>
        </div>

        {/* Game Area */}
        <div className="flex-1 flex flex-col items-center gap-6 w-full">
          <Timer leftTime={time} />
          <Board
            players={players}
            pawns={pawns}
            movingPlayerColor={movingPlayerColor}
            rolledNumber={rolledNumber}
            nowMoving={nowMoving}
            onVotePawn={votePawn}
            selectedPawnId={selectedPawnId}
            hoveredPawnId={hoveredPawnId}
            onHoverPawn={setHoveredPawnId}
          />

          <div className="w-full flex justify-center">
            <div className="w-full max-w-[456px] p-4 flex flex-col items-center text-center space-y-4">
              <PawnsVote
                pawns={pawns}
                teamColor={players.find((p) => p.teamId === teamId.current)?.color || ""}
                selectedPawnId={selectedPawnId}
                onVotePawn={votePawn}
                onHoverPawn={setHoveredPawnId}
                rolledNumber={rolledNumber}
                nowMoving={nowMoving}
              />
              <Dice
                value={rolledNumber | 0}
                rollTimestamp={rollTimestamp}
                nowMoving={nowMoving}
                onClick={rollDice}
              />
              {winner && (
                <div className="bg-green-600 text-white p-4 rounded-lg shadow-lg text-center w-full">
                  🎉 Winner: {winner.team?.name || "Unknown"}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile chat toggle button */}
      <div className="fixed bottom-4 left-1/2 z-50 w-[calc(100%-2rem)] -translate-x-1/2 lg:hidden">
        <button
          className="w-full text-white font-semibold py-4 px-6 rounded-2xl shadow-lg transition-all duration-300 hover:shadow-xl border border-white/10 bg-gradient-to-r from-[#f59e0b] to-[#d97706]"
          onClick={toggleSidebar}
        >
          <div className="flex items-center justify-center space-x-2">
            {players.find((p) => p.teamId === teamId.current)?.team?.avatar ? (
              <img
                src={players.find((p) => p.teamId === teamId.current)?.team?.avatar}
                alt="Team Avatar"
                className="w-6 h-6 rounded-full object-cover"
              />
            ) : (
              <div className="w-6 h-6 rounded-full bg-gray-600 flex items-center justify-center">
                <span className="text-xs text-white">T</span>
              </div>
            )}
            <span>{showChat ? "Hide Team Chat" : "Live Team Chat"}</span>
            {!showChat ? <ChevronsUp /> : <ChevronsDown />}
          </div>
        </button>
      </div>
    </div>
  );
};
export default TeamGame;
