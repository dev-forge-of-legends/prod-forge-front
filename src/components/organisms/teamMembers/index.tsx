import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import MemberItem from "./memberItem";
import { apiGetTeam } from "@apis/team";
import { apiGetUser } from "@apis/user";

interface TeamData {
  id: string;
  name: string;
  avatar: string;
  players: any;
  mode: string;
  betCoins: number;
  timeLimit: number;
  createrId: string;
  isPublic: boolean;
  level: number;
  wins: number;
  loses: number;
  members: UserType[];
}

interface UserType {
  level: number;
  played: number;
  wins: number;
  userName: string;
  teamId: string;
  loses: number;
  avatar: string;
}
const TeamMemberLayout: React.FC = () => {
  // const [memberData, setTeamMemberData] = useState<TeamData[]>([]);
  const [memberData, setTeamMemberData] = useState<TeamData | null>(null);
  const [text, setText] = useState("");
  useEffect(() => {
    handleCreatedMatch();
  }, []);

  const handleCreatedMatch = async () => {
    // setSearchResult([]);
    const user: UserType = await apiGetUser();
    if (user.teamId.trim() === "") {
      console.log("No this time");
      setText("You are not joined the team.")
    } else {
      const user_data = localStorage.getItem("userdata");
      if (user_data) {
        const data = await apiGetTeam(user.teamId, true);
        setTeamMemberData(data);
        console.log("hello world", data);
      }
    }
  };
  return (
    <div className="quicksand-font h-full text-white p-6">
      {/* ================= Header ================= */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-12"
      >
        <h1 className="font-vastagoRegular text-xl md:text-3xl text-left mb-4">
          Team Members
        </h1>
        <h1 className="text-[white] text-30px">{text}</h1>
        {/* Tabs */}

        {/* =================== Match Cards =================== */}
        <motion.div
          className="
            grid grid-cols-1 gap-6
            md:grid-cols-2
            lg:grid-cols-3
            2xl:grid-cols-[repeat(auto-fit,minmax(350px,1fr))]
          "
        >
          {memberData &&
            memberData.members?.map((m) => (
              <MemberItem
                key={m.userName}
                level={m.level}
                wins={m.wins}
                loses={m.loses}
                name={m.userName}
                avatar={m.avatar}
              />
            ))}
        </motion.div>
      </motion.div>
      {/* =================== Right Sidebar =================== */}
    </div>
  );
};

export default TeamMemberLayout;
