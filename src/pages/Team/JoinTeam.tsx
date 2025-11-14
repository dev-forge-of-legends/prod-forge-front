import { apiGetTeams } from "@apis/team";
import { TeamData, TeamMember } from "@app-types/interfaces";
import { TeamBox } from "@components/organisms/TeamBox/TeamBox";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";

const JoinTeam: React.FC = () => {
  const [text, setText] = useState("");
  const [teams, AddTeams] = useState<TeamData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTeamData("");
  }, []);

  const fetchTeamData = async (search: string) => {
    try {
      setLoading(true);
      const data = await apiGetTeams(0, 100, search, true);
      AddTeams(data.items);
      console.log("Join Team:", data);
    } catch (error) {
      console.error("Failed to fetch teams:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      fetchTeamData(text);
    }
  };

  return (
    <div className="min-h-screen bg-cover bg-center bg-fixed">
      <div className="container mx-auto px-4 py-6 md:py-8 max-w-7xl">
        {/* Header Section */}
        <h1 className="font-vastagoRegular text-xl md:text-3xl text-left mb-4 text-white">
          Join Team
        </h1>

        {/* Search Input */}
        <div className="w-80">
          <Search
            size={16}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
          />

          <input
            type="text"
            placeholder="Search teams..."
            className="font-vastagoRegular text-white text-[18px] bg-[#160B04] px-4 pl-10 py-3 rounded-md border border-1 border-gray-600 focus:outline-none focus:ring-1 focus:ring-gray-500 focus:border-transparent w-full"
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={handleSearch}
          />
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-12">
            <div className="text-white text-lg">Loading teams...</div>
          </div>
        )}

        {/* Empty State */}
        {!loading && teams.length === 0 && (
          <div className="text-center py-12">
            <div className="text-white text-lg md:text-xl bg-gray-800/50 backdrop-blur-sm rounded-lg p-8 max-w-md mx-auto">
              No teams found. Try a different search term.
            </div>
          </div>
        )}

        {/* Teams Grid */}
        <div className="mt-6 mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-10">
          {teams.map((team) => {
            // Convert string[] to TeamMember[] for TeamBox component
            const teamMembers: TeamMember[] = team.members.map((memberId) => ({
              id: memberId,
              userName: "",
              level: 0,
              email: "",
              avatar: team.avatar, // Use team avatar as fallback
            }));

            return (
              <TeamBox
                key={team.id}
                id={team.id}
                avatar={team.avatar}
                name={team.name}
                members={teamMembers}
                memberCount={team.members.length}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default JoinTeam;
