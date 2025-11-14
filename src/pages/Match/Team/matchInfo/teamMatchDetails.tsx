import {
  apiGetTeamMatchesById,
  apiNotReadyTeamMatch,
  apiReadyTeamMatch,
  apiStartTeamMatch,
} from "@apis/team_match";
import { BgButton } from "@components/atoms";
import { Image } from "@components/atoms/Image";
import { setMatchId } from "@redux/slices/individual-match.slice";
import { useAppDispatch, useAppSelector } from "@redux/store";
import socketService from "@services/socket.service";
import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TeamItem from "./TeamItem";

interface TeamDataProps {
  name: string;
  mode: string;
  avatar: string;
  createrTeamId: string;
  isPublic: boolean;
  betCoins: number;
  timeLimit: number;
  teams: TeamsType[];
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
}
const TeamMatchDetails: React.FC = () => {
  const navigate = useNavigate();
  const [teamMatcherData, setTeamMatcherData] = useState<TeamDataProps | null>(
    null
  );
  const redux_team_id = useAppSelector((state) => state.teamMatch.teamMatchId);
  useEffect(() => {
    fetchData();
    console.log("redux_team_id", redux_team_id);
  }, [redux_team_id]);

  useEffect(() => {
    // load_matcherData();
    loadLocalData();
    socketService.addEventHandler("join-match", handleJoinMatchEvent);
    return () => {
      socketService.removeEventHandler("join-match", handleJoinMatchEvent);
    };
  }, []);
  const [isOwner, setIsOwner] = useState(false);
  const [readylabel, setReadyLabel] = useState("I am Ready");
  const [readystyle, setReadyStyle] = useState(
    "rounded-xl w-full mt-3 bg-[#F89F17] text-[13px] h-9"
  );
  const [userProfileId, setUserProfileId] = useState("");
  const [ismeready, setIsMeReady] = useState("");
  const [myreadystyle, setMyReadyStyle] = useState("");
  const [canStartGame, setCanStartGame] = useState(false);
  const dispatch = useAppDispatch();
  const fetchData = async () => {
    const data = await apiGetTeamMatchesById(redux_team_id);
    setTeamMatcherData(data);
    console.log("teamMatchData", data);
    load_matcherData();

    loadLocalData();
  };

  const handleJoinMatchEvent = (data: any) => {
    console.log(data);
    if (data.type === "start-match") {
      dispatch(setMatchId(data.matchId));
      navigate("/team-game");
    }
  };

  const backAllTeamGame = () => {
    navigate("/team-all-matches");
  };
  const loadLocalData = async () => {
    const user_data = localStorage.getItem("userdata");

    if (user_data) {
      try {
        const user_team_id = JSON.parse(user_data).teamId;
        console.log(user_team_id);
        const data = await apiGetTeamMatchesById(redux_team_id);
        console.log("Are you Owner", data?.createrTeamId);
        setUserProfileId(user_team_id);
        if (user_team_id === data?.createrTeamId) {
          setIsOwner(true);
        } else {
          setIsOwner(false);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };
  const load_matcherData = async () => {
    try {
      const data = await apiGetTeamMatchesById(redux_team_id);
      console.log("teamMatchData_OKOK", data);
      setTeamMatcherData(data);
      for (let i = 0; i < data.teams.length; i++) {
        if (data.teams[i].teamId != userProfileId) {
          if (data.teams[i].status == "joined") {
            setIsMeReady("Ready");
            setMyReadyStyle(
              "rounded-xl pl-3 pr-4 py-1.5 text-[13px]  text-[#63A439]  mr-3 bg-[#63A4351A]"
            );
            setReadyLabel("I am not Ready");
            setReadyStyle("rounded-xl w-full mt-3 bg-[red] text-[13px] h-9");
          } else {
            setIsMeReady("Not Ready");
            setMyReadyStyle(
              "rounded-xl pl-3 pr-3 py-1.5 text-[13px] w-24  text-[#F03930]  mr-3 text-center bg-[#F039301A]"
            );
            setReadyLabel("I am Ready");
            setReadyStyle(
              "rounded-xl w-full mt-3 bg-[#F89F17] text-[13px] h-9"
            );
          }
        }
      }

      // Check if all players are ready to start the game
      const allPlayersJoined =
        data.teams.length > 0 &&
        data.teams.every(
          (player: { status: string }) => player.status === "joined"
        );

      setCanStartGame(allPlayersJoined);
      console.log("canStartGame???", allPlayersJoined);
    } catch (error) {
      console.log(error);
    }
  };

  const joinCreatedMatch = async () => {
    const user_data = localStorage.getItem("userdata");
    if (user_data) {
      try {
        // if (input_match.createrId != JSON.parse(user_data).id) {
        //   //Check if owner is me or not
        //   if (joinedtext == "Join Game") {
        //     setMatcherData([]);
        //     const data = await apiJoinIndividualMatches(
        //       input_match.matchId,
        //       JSON.parse(user_data).id
        //     );
        //     console.log("Sky is always blue.", data);
        //     setJoinedText("Out Match");
        //     const temp: MatcherDataType[] = matcherData;
        //     const newData = {
        //       color: "none",
        //       invited: true,
        //       status: "joined",
        //       user: {
        //         avatar: JSON.parse(user_data).avatar,
        //         level: JSON.parse(user_data).level,
        //         userName: JSON.parse(user_data).userName
        //       },
        //       userId: JSON.parse(user_data).userId
        //     };
        //     temp.push(newData);
        //     setMatcherData(temp);
        //   } else {
        //     setJoinedText("Join Game");
        //     const data = await apiPlayerOutMatch(
        //       input_match.matchId
        //     );
        //     console.log(data);
        //     setMatcherData([]);
        //     setMatcherData(matcherData.filter((data) => data.userId != JSON.parse(user_data).userId));
        //   }
        // }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const startTeamMatch = async () => {
    if (canStartGame) {
      try {
        const data = await apiStartTeamMatch(redux_team_id);
        console.log("start match data", data);
        dispatch(setMatchId(redux_team_id));
        navigate("/team-game");
      } catch (error) {
        console.log(error);
      }
    }
  };

  const readyMatch = async () => {
    setIsMeReady("Ready");
    setMyReadyStyle(
      "rounded-xl pl-3 pr-4 py-1.5 text-[13px]  text-[#63A439]  mr-3 bg-[#63A4351A]"
    );
    setReadyStyle("rounded-xl w-full mt-3 bg-[red] text-[13px] h-9");
    const data = await apiReadyTeamMatch(redux_team_id);
    console.log(data);
    setReadyLabel("I am not Ready.");
  };

  const notReadyMatch = async () => {
    await setReadyLabel("I am Ready.");
    setIsMeReady("Not Ready");
    // dispatch( setMatchData( { userId: userProfileId, status:"waiting" } ) );
    setMyReadyStyle(
      "rounded-xl pl-3 pr-3 py-1.5 text-[13px] w-24  text-[#F03930]  mr-3 text-center bg-[#F039301A]"
    );
    const data = await apiNotReadyTeamMatch(redux_team_id);
    console.log(data);
    setReadyStyle("rounded-xl w-full mt-3 bg-[#F89F17] text-[13px] h-9");
  };

  const readyornot = () => {
    if (readystyle == "rounded-xl w-full mt-3 bg-[red] text-[13px] h-9") {
      notReadyMatch();
    } else {
      readyMatch();
    }
  };

  return (
    <div className="flex flex-col px-5 py-4">
      <button className="text-[32px] text-white mb-6" onClick={backAllTeamGame}>
        Back to MatchBoard
      </button>
      <div className="flex flex-row justify-center flex-wrap">
        <div className="w-full bg-gradient-to-br from-graeto-black text-white p-2 h-full">
          {/* Header sdds*/}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div
              className="flex flex-col justify-start align-start rounded-xl border border-[#383838] inner-shadow-little bg-gradient-to-r from-[#9E9E7E1A] to-blue-0 p-4"
            >
              {/* <div>
                <div className="flex flex-row bg-[#FFF1763A] rounded-xl items-center">
                  <span className="ml-1">
                    <Image
                      src={"/assets/images/coin.png"}
                      className="w-3 h-3"
                    ></Image>
                  </span>
                  <h1 className="mr-1 pr-1 pl-1 text-[#FFF176]">120 coins</h1>
                </div>
              </div> */}
              <div className="mb-4">
                <h1 className="text-[16px] mb-1">Match Name</h1>
                <h1 className="text-[18px] font-semibold">{teamMatcherData?.name}</h1>
              </div>

              <div className="mb-5">
                <div className="flex flex-row mb-4 pb-2 justify-start items-center gap-4">
                  <div className="flex flex-row justify-start items-start w-64">
                    <div className="flex flex-row  justify-center items-center mr-2">
                      <h1 className="text-[13px]">&nbsp;</h1>
                      <Image
                        src="/assets/images/coin.png"
                        alt={""}
                        className="min-h-5 min-w-5 max-h-5 max-w-5 group-hover:opacity-100 shrink-0 rounded-full"
                        fallbackSrc={"/assets/images/dragon_icon.png"}
                      />
                    </div>
                    <div className="flex-col flex text-[13px] items-start justify-start w-full">
                      <h1 className="text-[#9E9E9E99] mb-1">Match Date</h1>
                      <h1 className="text-[#9E9E9E] text-[14px]">Sep 10, 5:00 AM</h1>
                    </div>
                  </div>

                  <div className="flex flex-row justify-start items-start w-64">
                    <div className="flex flex-row  justify-center items-center mr-2">
                      <h1 className="text-[13px]">&nbsp;</h1>
                      <Image
                        src="/assets/images/coin.png"
                        alt={""}
                        className="min-h-5 min-w-5 max-h-5 max-w-5 group-hover:opacity-100 shrink-0 rounded-full"
                        fallbackSrc={""}
                      />
                    </div>
                    <div className="flex-col flex text-[13px] items-start justify-start w-full">
                      <h1 className="text-[#9E9E9E99] mb-1">Bet Coins Amount</h1>
                      <h1 className="text-[#9E9E9E] text-[14px]">
                        {teamMatcherData?.betCoins}
                      </h1>
                    </div>
                  </div>

                  <div className="flex flex-row justify-start items-start w-64">
                    <div className="flex flex-row  justify-center items-center mr-2">
                      <h1 className="text-[13px]">&nbsp;</h1>
                      <Image
                        src="/assets/images/coin.png"
                        alt={""}
                        className="min-h-5 min-w-5 max-h-5 max-w-5 group-hover:opacity-100 shrink-0 rounded-full"
                        fallbackSrc={""}
                      />
                    </div>
                    <div className="flex-col flex text-[13px] items-start justify-start w-full">
                      <h1 className="text-[#9E9E9E99] mb-1">Time Limit</h1>
                      <h1 className="text-[#9E9E9E] text-[14px]">
                        {teamMatcherData?.timeLimit} min
                      </h1>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-row w-full items-center mb-4">
                <h1 className="w-[30%] text-[15px] font-semibold">Teams Join</h1>
                <div className="border border-b-[1] h-0 border-transparent border-b-[#FFFFFF1A] w-full"></div>
              </div>

              <div className="flex flex-row w-full justify-between gap-3 mb-4">
                {teamMatcherData?.teams?.map((item, index) => {
                  return (
                    <TeamItem
                      key={index}
                      teamName={item.team.name}
                      avatar={item.team.avatar}
                      isPublicMatch={teamMatcherData.isPublic}
                      readyStatus={item.status}
                      myreadyStatus={ismeready}
                      myreadyStyle={myreadystyle}
                      isOwner={isOwner}
                      currentteamId={userProfileId}
                      key_id={item.teamId}
                      members={3}
                    />
                  );
                })}
              </div>
              <div className="border border-b-[1] h-0 mt-2 mb-3 border-transparent border-b-[#FFFFFF1A] w-full"></div>
              <button className="text-[14px] py-2">Edit Details</button>
            </div>
          </motion.div>
        </div>
      </div>
      <div className="flex flex-row justify-end items-center mt-6 w-full">
        {/* <button className="rounded-xl w-40 h-8 mt-3 ml-4 mb-1 bg-[#F89F17] text-[12px]">
            Cancel Game
          </button>
          <button className="rounded-xl w-40 h-8 mt-3 ml-4 mb-1 bg-[#F89F17] text-[12px]">
            Start Match
          </button> */}

        {isOwner ? (
          <BgButton
            size="md"
            scale={1.2}
            className="text-sm w-full"
            onClick={startTeamMatch}
          >
            START MATCH
          </BgButton>
        ) : teamMatcherData?.isPublic ? (
          <BgButton
            size="md"
            scale={1.2}
            className="text-sm w-full"
            onClick={joinCreatedMatch}
          >
            JOIN MATCH
          </BgButton>
        ) : (
          <BgButton
            size="md"
            scale={1.2}
            className="text-sm w-full"
            onClick={readyornot}
          >
            {readylabel}
          </BgButton>
        )}
      </div>
    </div>
  );
};

export default TeamMatchDetails;
