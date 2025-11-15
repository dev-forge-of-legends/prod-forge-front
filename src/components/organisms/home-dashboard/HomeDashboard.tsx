import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { apiGetClaimedReward } from "@apis/achievement";
import { apiGetIsBonusReceivedById, apiGetRolledState } from "@apis/reward";
import { apiGetTeam } from "@apis/team";
import { apiGetUser } from "@apis/user";
import { AchieveItem, Team, UserData } from "@app-types/interfaces";
import {
  Avatar,
  BackgroundWrapper,
  BgButton,
  Panel,
  SoftBadge,
} from "@components/atoms";
import { StatCard } from "@components/molecules";
import { Stat } from "../../../types/constants";
import { Image } from "../../atoms/Image";
import {
  apiGetIndividualGamesCount,
  apiGetTeamGamesCount,
} from "@apis/team_match";

interface DashboardTeam {
  numTotal: number;
  numInProgress: number;
  numPending: number;
  numCompleted: number;
}

export const HomeDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [canShow, setCanShow] = useState<boolean>(false);
  const [profile, setProfile] = useState<UserData>();
  const [achieve, setAchieves] = useState<AchieveItem[]>([]);
  const [team, setTeam] = useState<Team>();
  const [dailyBonusPosition, setDailyBonusPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);

  // Static achievements data for when user has no claimed achievements
  const staticAchievements: AchieveItem[] = [
    {
      _id: "static-1",
      avatar: "/assets/images/icons/default.svg",
      description: "First Victory",
      isAchieved: "false",
      reputation: "Win your first match",
      winCount: 1,
      priceXp: 100,
      priceCoin: 50,
    },
    {
      _id: "static-2",
      avatar: "/assets/images/icons/default.svg",
      description: "Team Player",
      isAchieved: "false",
      reputation: "Join a team",
      winCount: 0,
      priceXp: 50,
      priceCoin: 25,
    },
    {
      _id: "static-3",
      avatar: "/assets/images/icons/default.svg",
      description: "Daily Streak",
      isAchieved: "false",
      reputation: "Login for 3 consecutive days",
      winCount: 0,
      priceXp: 75,
      priceCoin: 30,
    },
  ];

  // Calculate the number of claimed achievements
  const claimedAchievementsCount = achieve.filter(
    (item) => item.isAchieved === "true"
  ).length;

  // Get achievements to display - use static ones if user has no claimed achievements
  const displayAchievements =
    claimedAchievementsCount > 0 ? achieve : staticAchievements;

  useEffect(() => {
    fetchUserData();
    fetchAchievement();
    fetchBonusReceived();
    fetchTeamData();
    fetchIndividualCount();
    fetchTeamMatchCount();
  }, []);

  const [individualcount, setIndividualCount] = useState<DashboardTeam>();
  const [teamcount, setTeamCount] = useState<DashboardTeam>();

  const fetchIndividualCount = async () => {
    try {
      const data = await apiGetIndividualGamesCount();
      setIndividualCount(data);
    } catch {
      console.error("Error Occured");
    }
  };

  const fetchTeamMatchCount = async () => {
    try {
      const data = await apiGetTeamGamesCount();
      setTeamCount(data);
    } catch {
      console.error("error occured");
    }
  };

  const fetchAchievement = async () => {
    try {
      const items = await apiGetClaimedReward();
      setAchieves(items);
    } catch {
      console.error("Error Occurred");
    }
  };

  const fetchUserData = async () => {
    try {
      const data = await apiGetUser();
      setProfile(data);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const fetchBonusReceived = async () => {
    try {
      const IsBonusReceived = await apiGetIsBonusReceivedById();
      setCanShow(IsBonusReceived);
    } catch {
      console.error("Error Occurred");
    }
  };

  const fetchTeamData = async () => {
    try {
      const data = await apiGetUser();
      const v_team = await apiGetTeam(data.teamId, true);
      setTeam(v_team);
      if (!v_team) {
        navigate("/homedashboard");
        return;
      }
    } catch (error) {
      console.error("Error fetching team data:", error);
    }
  };

  const handleRoll = async () => {
    try {
      const vis_dice = await apiGetRolledState();
      navigate(vis_dice ? "/daily" : "/dice");
    } catch {
      console.error("Error Occurred");
    }
  };

  // Draggable functionality for Daily Bonus
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    e.preventDefault();
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;

    setDailyBonusPosition((prev) => ({
      x: prev.x + e.movementX,
      y: prev.y + e.movementY,
    }));
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const [STATS, setSTATS] = useState<Stat[]>([]);

  useEffect(() => {
    if (profile) {
      setSTATS([
        {
          label: "Matches Played",
          value: profile?.played ?? 0,
          icon: "/assets/images/icons/Played.webp",
        },
        {
          label: "Wins",
          value: profile?.wins ?? 0,
          icon: "/assets/images/icons/Wins.webp",
        },
        {
          label: "Losses",
          value: profile?.loses ?? 0,
          icon: "/assets/images/icons/Cross.webp",
        },
        {
          label: "Current Streak",
          value: profile?.streak ?? 0,
          icon: "/assets/images/icons/Fire.webp",
        },
      ]);
    }
  }, [profile]);

  return (
    <BackgroundWrapper>
      <main className="antialiased w-full min-h-screen px-3 py-4 text-white overflow-x-hidden pb-20">
        {/* Header */}
        <div className="mb-4 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <h1 className="leading-none text-white text-xl sm:text-2xl md:text-3xl font-vastagoSemiBold">
            Dashboard
          </h1>
        </div>

        {/* Daily Bonus Banner - Always positioned at bottom with high z-index */}
        {!canShow && (
          <div
            className={`bg-gradient-to-tl from-[#FFF176] to-[#F89F17] rounded-xl w-full max-w-md p-4 border border-amber-500/30 shadow-lg cursor-move select-none fixed bottom-4 left-1/2 transform -translate-x-1/2 ${
              isDragging ? "ring-2 ring-amber-400" : ""
            }`}
            style={{
              transform: `translate(${dailyBonusPosition.x}px, ${dailyBonusPosition.y}px) translateX(-50%)`,
              zIndex: 1000,
            }}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
          >
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="flex-shrink-0">
                  <Image
                    src="/assets/images/reward/Reward.webp"
                    fallbackSrc="/assets/images/reward/Reward.webp"
                    alt="Daily Bonus"
                    className="w-12 h-12 md:w-14 md:h-14 rounded-lg"
                  />
                </div>
                <div>
                  <h2 className="text-black text-xs font-vastagoMedium">
                    Welcome Bonus
                  </h2>
                  <p className="text-white text-lg md:text-xl font-vastagoSemiBold">
                    DAILY BONUS
                  </p>
                </div>
              </div>
              <button
                type="button"
                className="bg-gradient-to-b from-amber-500 to-amber-700 hover:from-amber-400 hover:to-amber-600 text-white font-vastagoSemiBold px-6 py-2 rounded-full text-sm md:text-base transition-all duration-200 transform hover:scale-105 min-w-[120px] shadow-lg"
                onClick={handleRoll}
              >
                Roll Now
              </button>
            </div>
          </div>
        )}

        {/* My Information */}
        <Panel title="My Information">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {STATS.map((s, index) => (
              <StatCard key={index} s={s} />
            ))}
          </div>
        </Panel>

        {/* 3 columns - Adjusted grid for better fit */}
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 items-stretch mt-4">
          {/* Team Information */}
          <Panel title="Team Information">
            {profile?.role === "teamLeader" ? (
              <div className="flex  justify-between mt-5">
                <BgButton
                  size="sm"
                  scale={0.8}
                  className="text-sm"
                  onClick={() => navigate("/create-team")}
                >
                  + Create TEAM
                </BgButton>
                <BgButton
                  size="sm"
                  scale={0.8}
                  className="text-sm"
                  onClick={() => navigate("/join-requests")}
                >
                  JOIN REQUEST
                </BgButton>
              </div>
            ) : profile?.role === "member" ? (
              <div className="rounded-xl p-3 bg-[#160B0480] border border-gray-700">
                <div className="flex items-center gap-3 pb-3 border-b border-gray-700">
                  <Avatar
                    name={team?.name || "Team"}
                    className="h-10 w-10 md:h-12 md:w-12 border-2 border-amber-500"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="font-vastagoMedium text-base text-white leading-none truncate">
                      {team?.name || "No Team"}
                    </div>
                    <div className="mt-1 flex items-center gap-2">
                      <SoftBadge className="bg-green-500/20 text-green-400 text-xs font-vastagoMedium px-2 py-1">
                        {team?.wins || 0} Wins
                      </SoftBadge>
                      <SoftBadge className="bg-blue-500/20 text-blue-400 text-xs font-vastagoMedium px-2 py-1">
                        {team?.members?.length || 0} Members
                      </SoftBadge>
                    </div>
                  </div>
                </div>

                <ul className="max-h-48 overflow-y-auto custom-scrollbar mt-2">
                  {team?.members?.map((m) => (
                    <li
                      key={m.userName}
                      className="flex items-center justify-between py-2 border-b border-gray-700 last:border-b-0 hover:bg-gray-700/50 rounded px-2 transition-colors"
                    >
                      <div className="flex items-center gap-2 min-w-0 flex-1">
                        <Avatar
                          name={m.userName}
                          src={m.avatar}
                          className="h-8 w-8 flex-shrink-0"
                        />
                        <div className="min-w-0 flex-1">
                          <div className="font-vastagoMedium text-sm text-white leading-none truncate">
                            {m.userName}
                          </div>
                          <div className="text-xs font-vastagoMedium text-gray-400">
                            Level: {m.level}
                          </div>
                        </div>
                      </div>
                      <button
                        className="rounded-full text-xs text-white font-vastagoMedium border border-gray-600 px-2 py-1 hover:bg-gray-600 transition-colors flex-shrink-0 ml-2"
                        type="button"
                      >
                        VIEW
                      </button>
                    </li>
                  ))}
                </ul>

                <div className="mt-3 text-center">
                  <Link
                    to="/team"
                    className="font-vastagoRegular text-amber-500 hover:text-amber-400 text-xs underline transition-colors"
                  >
                    View All Members
                  </Link>
                </div>
              </div>
            ) : (
              <div className="flex mx-[10%] justify-between mt-5">
                <BgButton
                  size="sm"
                  scale={0.8}
                  className="text-sm"
                  onClick={() => navigate("/create-team")}
                >
                  + Create TEAM
                </BgButton>
                <BgButton
                  size="sm"
                  scale={0.8}
                  className="text-sm"
                  onClick={() => navigate("/join-team")}
                >
                  JOIN TEAM
                </BgButton>
              </div>
            )}
          </Panel>

          {/* Match Information - Made smaller */}
          <Panel title="Match Information">
            <div className="space-y-3">
              <div>
                <div className="mb-2 text-sm font-vastagoSemiBold text-amber-500">
                  Individual Matches
                </div>
                <div className="rounded-xl bg-[#160B0480] p-2 border border-gray-700">
                  <div className="grid grid-cols-2 gap-2">
                    <div className="bg-[#160B0480] rounded-lg p-2 border border-gray-600 hover:border-amber-500/30 transition-all duration-200">
                      <div className="font-vastagoMedium text-gray-400 text-xs text-center">
                        Matches Created
                      </div>
                      <div className="mt-1 font-vastagoMedium text-white text-sm text-center">
                        {individualcount?.numTotal}
                      </div>
                    </div>
                    <div className="bg-[#160B0480] rounded-lg p-2 border border-gray-600 hover:border-amber-500/30 transition-all duration-200">
                      <div className="font-vastagoMedium text-gray-400 text-xs text-center">
                        Matches Waiting
                      </div>
                      <div className="mt-1 font-vastagoMedium text-white text-sm text-center">
                        {individualcount?.numPending}
                      </div>
                    </div>
                  </div>

                  <div className="mt-2 border-t border-gray-700 pt-2 text-center">
                    <Link
                      to="/individual-all-matches"
                      className="text-amber-500 hover:text-amber-400 font-vastagoRegular text-xs underline transition-colors"
                    >
                      See All
                    </Link>
                  </div>
                </div>
              </div>

              <div>
                <div className="mb-2 text-sm font-vastagoSemiBold text-amber-500">
                  Team Challenges
                </div>
                <div className="rounded-xl bg-[#160B0480] p-2 border border-gray-700">
                  <div className="grid grid-cols-2 gap-2">
                    <div className="bg-[#160B0480] rounded-lg p-2 border border-gray-600 hover:border-amber-500/30 transition-all duration-200">
                      <div className="font-vastagoRegular text-gray-400 text-xs text-center">
                        Matches Created
                      </div>
                      <div className="mt-1 text-sm font-vastagoMedium text-white text-center">
                        {teamcount?.numTotal}
                      </div>
                    </div>
                    <div className="bg-[#160B0480] rounded-lg p-2 border border-gray-600 hover:border-amber-500/30 transition-all duration-200">
                      <div className="font-vastagoRegular text-gray-400 text-xs text-center">
                        Matches Waiting
                      </div>
                      <div className="mt-1 text-sm font-vastagoMedium text-white text-center">
                        {teamcount?.numPending}
                      </div>
                    </div>
                  </div>

                  <div className="mt-2 border-t border-gray-700 pt-2 text-center">
                    <Link
                      to="/team-all-matches"
                      className="text-amber-500 hover:text-amber-400 font-vastagoRegular text-xs underline transition-colors"
                    >
                      See All
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </Panel>

          {/* Achievements */}
          <Panel title="Achievements">
            <div className="rounded-xl bg-[#160B0480] p-3 border border-gray-700">
              {/* Show message when no claimed achievements */}
              {claimedAchievementsCount === 0 && (
                <div className="mb-3 p-2 bg-amber-500/10 border border-amber-500/20 rounded-lg">
                  <p className="text-xs text-amber-400 text-center font-vastagoMedium">
                    Complete challenges to unlock achievements!
                  </p>
                </div>
              )}

              {/* Achievement counter */}
              <div className="mb-3 text-center">
                <p className="text-xs text-gray-400 font-vastagoMedium">
                  Claimed: {claimedAchievementsCount} / {achieve.length}
                </p>
              </div>

              <ul className="space-y-2 max-h-64 overflow-y-auto custom-scrollbar">
                {displayAchievements
                  .filter((achieve) => achieve.isAchieved === "true")
                  .map((a, i) => (
                    <li
                      key={`${a._id}-${i}`}
                      className="flex items-center justify-between p-2 rounded-lg bg-gray-700 border border-gray-600 hover:border-amber-500/20 transition-all duration-200"
                    >
                      <div className="flex items-center gap-2 min-w-0 flex-1">
                        <div
                          className={`flex h-8 w-8 items-center justify-center rounded-full ${
                            a.isAchieved === "true"
                              ? "bg-amber-500/20"
                              : "bg-gray-600/50"
                          } shrink-0`}
                        >
                          {a.avatar ? (
                            <Image
                              src={a.avatar}
                              fallbackSrc="/assets/images/icons/default.svg"
                              className="w-5 h-5 object-contain"
                            />
                          ) : (
                            <span
                              className={`text-sm ${
                                a.isAchieved === "true"
                                  ? "text-amber-500"
                                  : "text-gray-400"
                              }`}
                            >
                              {a.isAchieved === "true" ? "🏆" : "🔒"}
                            </span>
                          )}
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-xs font-vastagoMedium text-white truncate">
                            {a.description}
                          </p>
                          <p className="text-xs font-vastagoRegular text-gray-400">
                            {a.reputation}
                          </p>
                        </div>
                      </div>
                      {/* Show XP/Coin rewards for static achievements */}
                      {claimedAchievementsCount === 0 && (
                        <div className="flex gap-1 text-xs">
                          {a.priceXp && (
                            <span className="bg-green-500/20 text-green-400 px-1 rounded">
                              +{a.priceXp}XP
                            </span>
                          )}
                          {a.priceCoin && (
                            <span className="bg-yellow-500/20 text-yellow-400 px-1 rounded">
                              +{a.priceCoin}
                            </span>
                          )}
                        </div>
                      )}
                    </li>
                  ))}

                {/* Show static achievements as locked when user has no claimed achievements */}
                {claimedAchievementsCount === 0 &&
                  displayAchievements
                    .filter((achieve) => achieve.isAchieved === "false")
                    .map((a, i) => (
                      <li
                        key={`static-${a._id}-${i}`}
                        className="flex items-center justify-between p-2 rounded-lg bg-gray-800/50 border border-gray-600/50 opacity-70"
                      >
                        <div className="flex items-center gap-2 min-w-0 flex-1">
                          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-600/30 shrink-0">
                            <span className="text-gray-500 text-sm">🔒</span>
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="text-xs font-vastagoMedium text-gray-400 truncate">
                              {a.description}
                            </p>
                            <p className="text-xs font-vastagoRegular text-gray-500">
                              {a.reputation}
                            </p>
                          </div>
                        </div>
                        <div className="flex gap-1 text-xs">
                          {a.priceXp && (
                            <span className="bg-green-500/10 text-green-500/70 px-1 rounded">
                              +{a.priceXp}XP
                            </span>
                          )}
                          {a.priceCoin && (
                            <span className="bg-yellow-500/10 text-yellow-500/70 px-1 rounded">
                              +{a.priceCoin}
                            </span>
                          )}
                        </div>
                      </li>
                    ))}
              </ul>

              <div className="mt-3 text-center">
                <Link
                  to="/achievements"
                  className="text-amber-500 hover:text-amber-400 font-vastagoRegular text-xs underline transition-colors"
                >
                  View All Achievements
                </Link>
              </div>
            </div>
          </Panel>
        </div>
      </main>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #374151;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #6B7280;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #9CA3AF;
        }
      `}</style>
    </BackgroundWrapper>
  );
};
