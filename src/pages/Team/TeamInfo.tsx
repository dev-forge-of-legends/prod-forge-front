import { apiLogout } from "@apis/auth";
import { apiDeleteTeam, apiGetTeam } from "@apis/team";
import { apiGetUser } from "@apis/user";
import { Team, UserData } from "@app-types/interfaces";
import { BgButton } from "@components/atoms";
import { Image } from "@components/atoms/Image";
import PaginatedMembers from "@components/molecules/PaginatedMembers/PaginatedMembers";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const TeamInfo: React.FC = () => {
  const navigate = useNavigate();
  const [team, setTeam] = useState<Team>();
  const [profile, setProfile] = useState<UserData>();

  useEffect(() => {
    const fetchTeamData = async () => {
      const data = await apiGetUser();
      console.log("Team Info User Profile:", data);
      setProfile(data);
      const v_team = await apiGetTeam(data.teamId, true);
      setTeam(v_team);
      if (!v_team) {
        navigate("/homedashboard");
        return;
      }
      console.log("This is my team");
    };

    fetchTeamData();
  }, []);

  const handleLogout = async () => {
    try {
      await apiLogout();
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const handleDeleteTeam = async () => {
    if (!team?.id) {
      return;
    }
    try {
      await apiDeleteTeam(team.id);
      toast.success("Team Deleted Successfully");
      handleLogout();
    } catch {
      console.error("Error occured");
      toast.error("Team can not deleted");
    }
  };

  return (
    <div className="min-h-[90vh]">
      <div className="container mx-auto px-4 sm:px-6 py-6 relative z-10">
        {/* Enhanced Header */}
        <h1 className="font-vastagoRegular text-xl md:text-3xl text-left mb-4 text-white">
          Team Information
        </h1>

        {/* Main Team Card */}
        <div className="backdrop-blur-xl rounded-2xl shadow-2xl overflow-hidden transition-all duration-300 border-[1px] border-gray-700">
          {/* Team Profile Section */}
          <div className="flex flex-col lg:flex-row items-center lg:items-start p-6 sm:p-8">
            {/* Enhanced Team Avatar */}
            <div className="relative mb-6 lg:mb-0">
              <div className="relative w-20 h-20 sm:w-28 sm:h-28 lg:w-32 lg:h-32">
                <div className="absolute inset-0 rounded-full blur-md opacity-50 bg-gradient-to-r from-dark-lightest to-dark-lighter"></div>
                <div className="relative w-full h-full">
                  <Image
                    src="/assets/images/users/user0.webp"
                    fallbackSrc="/assets/images/users/user0.webp"
                    alt="Team avatar"
                    className="w-full h-full rounded-full object-cover shadow-lg transition-transform duration-300 hover:scale-105 border-4 border-dark"
                  />
                </div>
                {/* Online Status Indicator */}
                <div className="absolute bottom-3 right-3 w-6 h-6 bg-green-500 rounded-full border-2 border-dark"></div>
              </div>
            </div>

            {/* Team Info */}
            <div className="flex-1 w-full lg:pl-8">
              {/* Team Name and Stats Header */}
              <div className="flex flex-col sm:flex-row justify-between items-center sm:items-start mb-6">
                <div className="text-center sm:text-left mb-4 sm:mb-0">
                  <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">
                    {team?.name || "WarLegends"}
                  </h1>
                </div>
              </div>

              {/* Enhanced Stats Cards */}
              <div className="flex justify-center sm:justify-start gap-4 sm:gap-6">
                <div className="group relative flex sm:max-w-[140px] min-w-[140px] h-16 bg-[url('https://sfo3.digitaloceanspaces.com/forge-dev-assets/assets/images/teaminfo/team_info.png')] p-3 justify-center items-center rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-amber-500/30 overflow-hidden">
                  {/* Animated border effect */}
                  <div className="absolute inset-0 border-2 border-transparent group-hover:border-amber-300/40 transition-all duration-500 rounded-lg" />

                  {/* Glow effect */}
                  <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-amber-400/10 to-yellow-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  {/* Subtle inner glow */}
                  <div className="absolute inset-[2px] rounded-md border border-amber-200/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                  <div className="w-8 h-8 mb-2 rounded-lg flex z-10">
                    <img
                      src="/assets/images/teaminfo/team_members.png"
                      alt="No Image Uploaded"
                      className="filter brightness-0 invert opacity-80 group-hover:opacity-100 transition-opacity duration-300"
                    />
                  </div>
                  <div className="ml-3 py-2 z-10">
                    <h1 className="text-white/70 text-[16px] font-semibold mb-1 group-hover:text-white/90 transition-colors duration-300">
                      Members
                    </h1>
                    <p className="text-amber-400 text-lg font-bold group-hover:text-amber-300 group-hover:drop-shadow-sm transition-all duration-300">
                      {team?.members.length || 0}
                    </p>
                  </div>
                </div>

                <div className="group relative flex sm:max-w-[140px] min-w-[140px] h-16 bg-[url('https://sfo3.digitaloceanspaces.com/forge-dev-assets/assets/images/teaminfo/team_info.png')] p-3 justify-center items-center rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-amber-500/30 overflow-hidden">
                  {/* Animated border effect */}
                  <div className="absolute inset-0 border-2 border-transparent group-hover:border-amber-300/40 transition-all duration-500 rounded-lg" />

                  {/* Glow effect */}
                  <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-amber-400/10 to-yellow-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  {/* Subtle inner glow */}
                  <div className="absolute inset-[2px] rounded-md border border-amber-200/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                  <div className="w-8 h-8 mb-2 rounded-lg flex z-10">
                    <img
                      src="/assets/images/teaminfo/team_wins.png"
                      alt="No Image Uploaded"
                      className="filter brightness-0 invert opacity-80 group-hover:opacity-100 transition-opacity duration-300"
                    />
                  </div>
                  <div className="ml-3 py-2 z-10">
                    <h1 className="text-white/70 text-[16px] font-semibold mb-1 group-hover:text-white/90 transition-colors duration-300">
                      Wins
                    </h1>
                    <p className="text-amber-400 text-lg font-bold group-hover:text-amber-300 group-hover:drop-shadow-sm transition-all duration-300">
                      {team?.wins || 0}
                    </p>
                  </div>
                </div>
                <div className="group relative flex sm:max-w-[140px] min-w-[140px] h-16 bg-[url('https://sfo3.digitaloceanspaces.com/forge-dev-assets/assets/images/teaminfo/team_info.png')] p-3 justify-center items-center rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-amber-500/30 overflow-hidden">
                  {/* Animated border effect */}
                  <div className="absolute inset-0 border-2 border-transparent group-hover:border-amber-300/40 transition-all duration-500 rounded-lg" />

                  {/* Glow effect */}
                  <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-amber-400/10 to-yellow-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  {/* Subtle inner glow */}
                  <div className="absolute inset-[2px] rounded-md border border-amber-200/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                  <div className="w-8 h-8 mb-2 rounded-lg flex z-10">
                    <img
                      src="/assets/images/teaminfo/team_loss.png"
                      alt="No Image Uploaded"
                      className="filter brightness-0 invert opacity-80 group-hover:opacity-100 transition-opacity duration-300"
                    />
                  </div>
                  <div className="ml-3 py-2 z-10">
                    <h1 className="text-white/70 text-[16px] font-semibold mb-1 group-hover:text-white/90 transition-colors duration-300">
                      Loss
                    </h1>
                    <p className="text-amber-400 text-lg font-bold group-hover:text-amber-300 group-hover:drop-shadow-sm transition-all duration-300">
                      {team?.loses || 0}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced Team Members Section */}
          <div className="backdrop-blur-lg m-4 sm:m-6 transition-all duration-300 border-t-[1px] border-gray-700">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pt-5">
              <div className="mb-3 sm:mb-0">
                <h1 className="text-2xl font-bold text-white flex items-center gap-3">
                  Team Member
                </h1>
              </div>
              <div className="px-4 py-2 rounded-full bg-dark border border-dark-lighter">
                <h1 className="text-white/80 text-sm font-medium">
                  {team?.members.length || 0} Member
                  {team?.members.length !== 1 ? "s" : ""}
                </h1>
              </div>
            </div>

            <div className="pt-2">
              {team ? (
                <PaginatedMembers members={team.members} itemsPerPage={6} />
              ) : (
                <div className="text-center py-12">
                  <div className="w-20 h-20 mx-auto mb-4 rounded-full flex items-center justify-center bg-dark-light">
                    <span className="text-3xl">🏃</span>
                  </div>
                  <h1 className="text-white/70 text-xl font-semibold mb-2">
                    No Team Available Yet!
                  </h1>
                  <p className="text-white/50 text-sm">
                    Create or join a team to get started
                  </p>
                </div>
              )}
            </div>
            <div>
              {profile?.role === "teamLeader" ? (
                <div>
                  <div className="flex ml-[2%] gap-4 mt-5">
                    <BgButton
                      size="sm"
                      scale={0.8}
                      className="text-sm"
                      onClick={handleDeleteTeam}
                    >
                      DELETE TEAM
                    </BgButton>
                    <BgButton
                      size="sm"
                      scale={0.8}
                      className="text-sm"
                      onClick={() => navigate("/create-team-matches")}
                    >
                      + CREATE MATCH
                    </BgButton>
                  </div>
                </div>
              ) : (
                <div></div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamInfo;
