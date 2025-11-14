import {
  apiGetIndividualIdMatches,
  apiJoinIndividualMatches,
  apiNotReadyMatch,
  apiPlayerOutMatch,
  apiReadyMatch,
  apiStartMatch,
} from "@apis/individual_match";
import React, { useEffect, useState } from "react";
// import MatchersItem from "./MatchersItem";
import { setMatchId } from "@redux/slices/individual-match.slice";
import { useAppDispatch, useAppSelector } from "@redux/store";
import socketService from "@services/socket.service";
import { useNavigate } from "react-router-dom";
import MatchersItem from "./MatchersItem";
import { motion } from "framer-motion";
import { BgButton } from "@components/atoms";
interface RightSideBarType {
  isOpen: boolean;
}
interface Type {
  matchName: string;
  time: string;
  join_num: number;
  coin: number;
  matchId: string;
  createrId: string;
  isPublic: boolean;
}
interface MatcherDataType {
  color: string;
  invited: boolean;
  status: string;
  user: {
    avatar: string;
    level: number;
    userName: string;
  };
  userId: string;
}
const RightSideBar: React.FC<RightSideBarType> = ({ isOpen }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const input_match: Type = useAppSelector(
    (state) => state.matchdata.match_data[0]
  );
  const [isowner, SetIsOwner] = useState(false);
  const [readylabel, setReadyLabel] = useState("I am Ready");
  const [userProfileId, setUserProfileId] = useState("");
  const [matcherData, setMatcherData] = useState<MatcherDataType[]>([]);
  const [ismeready, setIsMeReady] = useState("");
  const [myreadystyle, setMyReadyStyle] = useState("");
  const [isJoined, setIsJoined] = useState(false);
  const [canStartGame, setCanStartGame] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    console.log("RightSideBar is opened");
    if (isOpen) {
      load_matcherData();
    }
  }, [isOpen]);

  useEffect(() => {
    // load_matcherData();
    loadLocalData();
    socketService.addEventHandler("join-match", handleJoinMatchEvent);
    return () => {
      socketService.removeEventHandler("join-match", handleJoinMatchEvent);
    };
  }, []);

  const handleJoinMatchEvent = (data: any) => {
    console.log(data);
    if (data.type === "start-match") {
      dispatch(setMatchId(data.matchId));
      navigate("/individual-game");
    } else {
      setMatcherData(prev => {
        //If player left
        if( data.type === "left-match" ) {
          return prev.filter(player => player.userId !== data.playerId);
        }
        else if ( data.type === "ready-match"  ) {
          console.log("ready-match", data);
          return prev.map(player => {
            if (player.userId === data.playerId) {
              return {
                ...player,
                status: "joined",
              };
            }
            return player;
          })
        }
        else if ( data.type === "not-ready-match" ) {
          console.log("not-ready-match", data);
          return prev.map(player => {
            if (player.userId === data.playerId) {
              return {
                ...player,
                status: "active",
              };
            }
            return player;
          })
        }

        const existingIndex = prev.findIndex(player => player.userId === data.playerId);
        if (existingIndex !== -1) {
          const updated = [...prev];
          const existingPlayer = updated[existingIndex];
          updated[existingIndex] = {
            ...existingPlayer,
            color: data.color ?? existingPlayer.color,
            invited: data.invited ?? existingPlayer.invited,
            status: data.status ?? existingPlayer.status,
            user: {
              ...existingPlayer.user,
              avatar: data.avatar ?? existingPlayer.user.avatar,
              level: data.level ?? existingPlayer.user.level,
              userName: data.userName ?? existingPlayer.user.userName,
            },
          };
          return updated;
        }

        const newPlayer: MatcherDataType = {
          color: data.color ?? "none",
          invited: data.invited ?? true,
          status: data.status ?? "joined",
          user: {
            avatar: data.avatar,
            level: data.level,
            userName: data.userName,
          },
          userId: data.playerId,
        };

        return [...prev, newPlayer];
      });

      if (data.playerId === userProfileId && data.status) {
        if (data.status === "joined") {
          setIsMeReady("Ready");
          setMyReadyStyle(
            "rounded-xl pl-2 pr-3 text-[12px]  text-[#63A439]  mr-3 bg-[#63A4351A]"
          );
          setReadyLabel("I am not Ready");
        } else {
          setIsMeReady("Not Ready");
          setMyReadyStyle(
            "rounded-xl pl-2 pr-2 text-[12px] w-20  text-[#F03930]  mr-3 text-center bg-[#F039301A]"
          );
          setReadyLabel("I am Ready");
        }
      }
    }
  };

  const loadLocalData = async () => {
    const user_data = localStorage.getItem("userdata");
    if (user_data) {
      try {
        const user_id = JSON.parse(user_data).id;
        setUserProfileId(user_id);
        SetIsOwner(user_id === input_match.createrId);
        console.log("input_match_console", isowner);
        // return user_id;
      } catch (error) {
        console.log(error);
      }
    }
  };
  const load_matcherData = async () => {
    console.log("input_match", input_match);
    setIsLoading(true);
    loadLocalData(); // get user data from localStorage
    try {
      const data = await apiGetIndividualIdMatches(input_match.matchId);
      setMatcherData(data.players);
      for (let i = 0; i < data.players.length; i++) {
        if (data.players[i].userId == userProfileId) {
          if (data.players[i].status == "joined") {
            setIsMeReady("Ready");
            setMyReadyStyle(
              "rounded-xl pl-2 pr-3 text-[12px]  text-[#63A439]  mr-3 bg-[#63A4351A]"
            );
            setReadyLabel("I am not Ready");
          } else {
            setIsMeReady("Not Ready");
            setMyReadyStyle(
              "rounded-xl pl-2 pr-2 text-[12px] w-20  text-[#F03930]  mr-3 text-center bg-[#F039301A]"
            );
            setReadyLabel("I am Ready");
          }
        }
      }

      // Check if all players are ready to start the game
      const allPlayersJoined = data.players.length > 0 &&
        data.players.every((player: { status: string; }) => player.status === "joined");
      setCanStartGame(allPlayersJoined);
      console.log("canStartGame???", allPlayersJoined);
    } catch (error) {
      console.log(error);
    } 
    setIsLoading(false);
  };

  const joinCreatedMatch = async () => {
    const user_data = localStorage.getItem("userdata");
    if (user_data) {
      try {
        if (input_match.createrId != JSON.parse(user_data).id) {
          //Check if owner is me or not
          if (!isJoined) {
            setMatcherData([]);
            const data = await apiJoinIndividualMatches(
              input_match.matchId,
              JSON.parse(user_data).id
            );
            console.log("Sky is always blue.", data);
            setIsJoined(true);
            const temp: MatcherDataType[] = matcherData;
            const newData = {
              color: "none",
              invited: true,
              status: "joined",
              user: {
                avatar: JSON.parse(user_data).avatar,
                level: JSON.parse(user_data).level,
                userName: JSON.parse(user_data).userName
              },
              userId: JSON.parse(user_data).userId
            };
            temp.push(newData);
            setMatcherData(temp);
            // setMatcherData( prev => [ ...prev, newData])
          } else {
            setIsJoined(false);
            const data = await apiPlayerOutMatch(
              input_match.matchId
            );
            console.log(data);
            setMatcherData([]);
            setMatcherData(matcherData.filter((data) => data.userId != JSON.parse(user_data).userId));
          }
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const readyMatch = async () => {
    setIsMeReady("Ready");
    setMyReadyStyle(
      "rounded-xl pl-2 pr-3 text-[12px]  text-[#63A439]  mr-3 bg-[#63A4351A]"
    );
    const data = await apiReadyMatch(input_match.matchId);
    console.log(data);
    setReadyLabel("I am not Ready.");
  };

  const notReadyMatch = async () => {
    await setReadyLabel("I am Ready.");
    setIsMeReady("Not Ready");
    // dispatch( setMatchData( { userId: userProfileId, status:"waiting" } ) );
    setMyReadyStyle(
      "rounded-xl pl-2 pr-2 text-[12px] w-20  text-[#F03930]  mr-3 text-center bg-[#F039301A]"
    );
    const data = await apiNotReadyMatch(input_match.matchId);
    console.log(data);
  };

  const readyornot = () => {
    if (ismeready === "Ready") {
      notReadyMatch();
    } else {
      readyMatch();
    }
  };

  const startMatch = async () => {
    if (canStartGame) {
      try {
        const data = await apiStartMatch(input_match.matchId);
        console.log("start match data", data);
        dispatch(setMatchId(input_match.matchId));
        navigate("/individual-game");
      } catch (error) {
        console.log(error);
      }
    }
  };

 
return (
  <motion.div
    initial={{ x: 300, opacity: 0 }}
    animate={{ x: isOpen ? 0 : 300, opacity: isOpen ? 1 : 0 }}
    transition={{ duration: 0.4, ease: "easeOut" }}
    className="
      fixed right-0 top-0 h-full
      w-full sm:w-[400px] lg:w-[420px] 
      text-white p-4 overflow-y-auto
      shadow-[0_0_15px_rgba(0,0,0,0.5)]
      border-l border-[#333]
      z-[60]
    "
  >
    {/* Header */}
    <div className="mb-6 bg-[[#160B0480">
      <h1 className="font-bold text-xl md:text-2xl mb-1">Match Details</h1>
      <div className="flex flex-wrap justify-between items-center text-sm text-gray-300">
        <div>
          <span className="text-gray-400">Match Name:</span>
          <span className="ml-2 text-[#F89F17] font-semibold">{input_match.matchName}</span>
        </div>
        <div className="flex gap-2 mt-1">
          <span className="bg-[#9E9E9E2A] px-2 py-1 rounded-md">{input_match.time} min</span>
          <span className="bg-[#9E9E9E2A] px-2 py-1 rounded-md">{input_match.join_num} players</span>
        </div>
      </div>
    </div>

    {/* Match Info */}
    <div className="space-y-4">
      <div>
        <h2 className="text-gray-400 text-sm">OPEN MATCH</h2>
        <p className="text-white text-base">
          {input_match.isPublic ? "Yes (Any user can join)" : "No (Only invited users can join)"}
        </p>
      </div>

      <div>
        <h2 className="text-gray-400 text-sm">BET COIN AMOUNT</h2>
        <p className="text-[#63A435] text-xl font-semibold">{input_match.coin}</p>
      </div>
    </div>

    {/* Invited Friends */}
    <div className="mt-6 border border-[#9E9E9E11] rounded-lg shadow-inner p-3">
      <div className="flex justify-between items-center mb-2">
        <h2 className="font-semibold text-lg">Invited Friends</h2>
        <span className="text-sm text-gray-400">{matcherData.length} friends</span>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center py-6">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-white"></div>
        </div>
      ) : (
        <div className="grid gap-3 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-1">
          {matcherData.map((item, index) => (
            <MatchersItem
              key={index}
              key_id={item.userId}
              currentuserId={userProfileId}
              userName={item.user.userName}
              level={item.user.level}
              avatar={item.user.avatar}
              isOwner={isowner}
              isPublicMatch={input_match.isPublic}
              readyStatus={item.status}
              myreadyStatus={ismeready}
              myreadyStyle={myreadystyle}
            />
          ))}
        </div>
      )}
    </div>

    {/* Buttons */}
    <div className="mt-6">
      {isowner ? (
        <BgButton
          onClick={startMatch}
          className="w-full"
          size="sm"
          scale={1}
        >
          <span className="text-yellow-bright">START GAME</span>
        </BgButton>
      ) : input_match.isPublic ? (
        <BgButton
          onClick={joinCreatedMatch}
          size="md"
          scale={1}
        >
          <span className="text-yellow-bright">{isJoined ? "Out Match" : "Join Game"}</span>
        </BgButton>
      ) : (
        <BgButton
          onClick={readyornot}
          size="md"
          scale={1}
        >
          <span className="text-yellow-bright">{ readylabel }</span>
        </BgButton>
      )}
    </div>
  </motion.div>
);
};

export default RightSideBar;

