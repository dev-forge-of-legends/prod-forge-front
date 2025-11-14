import {
  apiGetIndividualIdMatches,
  apiMovePawn,
  apiRollDice,
} from "@apis/individual_match";
import { PAWN_COLORS } from "@app-types/types";
import { MatchData, Pawn, Player } from "@app-utils/gamePlayUtils";
import Board from "@components/organisms/IndividualGame/Board";
import Timer from "@components/organisms/IndividualGame/Timer";
// import SupportChat from "@pages/Help/SupportChat";
import { useAppSelector } from "@redux/store";
import socketService from "@services/socket.service";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";

const IndividualGame: React.FC = () => {
  const userId = useRef("");
  const matchId = useAppSelector((state) => state.individualMatch.matchId);

  // State for rendering
  const [pawns, setPawns] = useState<Pawn[]>([]);
  const [players, setPlayers] = useState<Player[]>(
    Array.from({ length: 4 }, () => ({
      userId: "",
      status: "",
      invited: false,
      color: PAWN_COLORS.None,
      nowMoving: false,
      user: {
        userName: "",
        avatar: "",
        level: 0,
      },
    }))
  );
  const [rolledNumber, setRolledNumber] = useState<number>(0);
  const [timeLeft, setTimeLeft] = useState<number>(10);
  const [nowMoving, setNowMoving] = useState(false);
  const [movingPlayerColor, setMovingPlayerColor] = useState("");
  const [winner, setWinner] = useState<any>(null);
  const [turnNumber, setTurnNumber] = useState<number>(0);

  // Refs to always have latest values in socket handlers
  const pawnsRef = useRef<Pawn[]>([]);
  const playersRef = useRef<Player[]>([]);
  const rolledNumberRef = useRef<number>(0);
  const timeRef = useRef<number>(60);
  const nowMovingRef = useRef<boolean>(false);
  const movingPlayerColorRef = useRef<string>("");

  // Update refs whenever state changes
  useEffect(() => {
    pawnsRef.current = pawns;
  }, [pawns]);

  useEffect(() => {
    playersRef.current = players;
  }, [players]);

  useEffect(() => {
    rolledNumberRef.current = rolledNumber;
  }, [rolledNumber]);

  useEffect(() => {
    timeRef.current = timeLeft;
  }, [timeLeft]);

  useEffect(() => {
    nowMovingRef.current = nowMoving;
  }, [nowMoving]);

  useEffect(() => {
    movingPlayerColorRef.current = movingPlayerColor;
  }, [movingPlayerColor]);

  useEffect(() => {
    const user_data = localStorage.getItem("userdata");
    if (user_data) {
      userId.current = JSON.parse(user_data).id;
    }
    socketService.addEventHandler("game:data", handleDataEvent);
    socketService.addEventHandler("game:roll", handleRollEvent);
    socketService.addEventHandler("game:winner", handleWinner);
    fetchMatchData();
    return () => {
      socketService.removeEventHandler("game:data", handleDataEvent);
      socketService.removeEventHandler("game:roll", handleRollEvent);
      socketService.removeEventHandler("game:winner", handleWinner);
    };
  }, []);

  useEffect(() => {
    if (userId.current) {
      fetchMatchData();
    }
  }, []);

  const handleData = (data: MatchData) => {
    setWinner(data.winner || null);
    if (data.players == null) return;

    // Filling navbar with empty player nick container
    while (data.players.length !== 4) {
      data.players.push({
        userId: "",
        status: "",
        invited: false,
        color: PAWN_COLORS.None,
        nowMoving: false,
        user: {
          userName: "",
          avatar: "",
          level: 0,
        },
      });
    }

    // Checks if client is currently moving player by session ID
    const nowMovingPlayer = data.players.find(
      (player: { nowMoving: boolean }) => player.nowMoving === true
    );

    if (nowMovingPlayer) {
      const isMyTurn = nowMovingPlayer.userId === userId.current;
      setNowMoving(isMyTurn);
      nowMovingRef.current = isMyTurn;
      setMovingPlayerColor(nowMovingPlayer.color);
      movingPlayerColorRef.current = nowMovingPlayer.color;
    }

    const newRolledNumber = data.rolledNumber || 0;
    const newTime = data.nextMoveTime || data.timeLimit || 60;

    setRolledNumber(newRolledNumber);
    rolledNumberRef.current = newRolledNumber;

    setPlayers(data.players);
    playersRef.current = data.players;

    setPawns(data.pawns);
    pawnsRef.current = data.pawns;

    console.log("newTime (maxTime for this turn):", newTime);
    setTimeLeft(newTime); // This is the starting time for the turn
    timeRef.current = newTime;
    setTurnNumber((prev) => prev + 1); // Increment turn to force Timer reset
  };

  const handleRollEvent = (rolledNumber: number) => {
    console.log("🎲 Roll event received from socket:", rolledNumber);
    setRolledNumber(rolledNumber);
    rolledNumberRef.current = rolledNumber;
  };

  const handleDataEvent = ({ match }: { match: MatchData }) => {
    console.log("data event", match);
    handleData(match);
  };

  const handleWinner = (winner: any) => {
    setWinner(winner);
  };

  const fetchMatchData = async () => {
    const data = await apiGetIndividualIdMatches(matchId);
    console.log("match data fetched");
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

  const movePawn = async (pawnId: string) => {
    try {
      await apiMovePawn(matchId, pawnId);
      toast.success(`Moved ${pawnId}`);
    } catch (error: any) {
      toast.error(error.message || "Please try again");
    }
  };

  return (
    <div className="flex flex-col justify-start items-center gap-2 scroll-y-auto">
      <Timer key={turnNumber} leftTime={timeLeft} />
      <Board
        players={players}
        pawns={pawns}
        movingPlayerColor={movingPlayerColor}
        rolledNumber={rolledNumber}
        nowMoving={nowMoving}
        onMovePawn={movePawn}
        rollDice={rollDice}
        timeLimit={timeLeft}
        leftTime={timeLeft}
      />
      {/* <Dice
        value={rolledNumber | 0}
        rollTimestamp={rollTimestamp}
        nowMoving={nowMoving}
        onClick={rollDice}
      /> */}
      {winner && <div>{winner}</div>}
    </div>
  );
};

export default IndividualGame;
