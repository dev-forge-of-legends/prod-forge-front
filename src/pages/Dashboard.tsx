import { mockTeams } from "@app-utils/mockData/mockTeams";
import { mockUsers } from "@app-utils/mockData/mockUsers";
import { teamAvatars } from "@app-utils/mockData/teamAvatars";
import { getValidImageUrl } from "@app-utils/stringUtils";
import { Image } from "@components/atoms/Image";
import { motion } from "framer-motion";
import { Crown, Medal, Star, Target, TrendingUp, Trophy, Users, Zap } from "lucide-react";
import { Link } from "react-router-dom";

export const Dashboard = () => {
  const user = mockUsers[0];
  const team = mockTeams[0];
  const stats = [
    { label: "Total Wins", value: "100", icon: Trophy, color: "text-yellow-400" },
    { label: "Win Rate", value: "78%", icon: Target, color: "text-green-400" },
    { label: "Current Streak", value: "5", icon: Zap, color: "text-blue-400" },
    { label: "Best Rank", value: "#3", icon: Crown, color: "text-purple-400" },
  ];

  const achievements = [
    { name: "First Victory", description: "Won your first match", icon: Star, unlocked: true },
    { name: "Win Streak", description:   "Won 5 matches in a row", icon: TrendingUp, unlocked: true },
    { name: "Top 10", description: "Reached top 10 ranking", icon: Medal, unlocked: false },
    { name: "Team Player", description: "Joined a team", icon: Users, unlocked: true },
  ];

  return (
    <div
      className="quicksand-font min-h-screen bg-cover bg-no-repeat bg-center relative overflow-hidden"
      style={{ backgroundImage: `url('${getValidImageUrl('/assets/images/backgrounds/landing.webp')}')` }}
    >
      {/* Overlay for better readability */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>

      {/* Content */}
      <div className="relative z-10 px-4 sm:px-8 lg:px-12 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 quicksand-font">
            Welcome to the Forge of Legends
          </h1>
          <p className="text-xl text-yellow-300 font-medium max-w-2xl mx-auto">
            Forge your legend and dominate the battlefield
          </p>
        </motion.div>

        {/* Main Dashboard Grid */}
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Left Column - User Profile */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-1"
          >
            <div className="quicksand-font bg-gradient-to-br from-gray-900/90 to-gray-800/90 backdrop-blur-md rounded-2xl p-6 border border-yellow-500/30 shadow-2xl">
              <div className="text-center mb-6">
                <div className="relative inline-block">
                  <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-yellow-500 shadow-lg">
                    <Image src={user.avatar} alt="user" className="w-full h-full object-cover" />
                  </div>
                  <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center">
                    <Crown className="w-5 h-5 text-black" />
                  </div>
                </div>
                <h2 className="text-2xl font-bold text-white mt-4 mb-2">{user.userName}</h2>
                <div className="flex items-center justify-center gap-2 text-yellow-400">
                  <Medal className="w-5 h-5" />
                  <span className="font-semibold">Rank #{user.rank}</span>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                  <span className="text-gray-300">Total Wins</span>
                  <span className="text-yellow-400 font-bold text-lg">{user.totalWins}</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                  <span className="text-gray-300">Win Rate</span>
                  <span className="text-green-400 font-bold text-lg">{user.winRate}%</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                  <span className="text-gray-300">Experience</span>
                  <span className="text-blue-400 font-bold text-lg">{user.experience} XP</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Center Column - Stats Cards */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="lg:col-span-1"
          >
            <div className="grid grid-cols-2 gap-4 mb-6">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
                  className="quicksand-font bg-gradient-to-br from-gray-900/90 to-gray-800/90 backdrop-blur-md rounded-xl p-4 border border-yellow-500/30 shadow-lg hover:shadow-yellow-500/20 transition-all duration-300 hover:scale-105"
                >
                  <div className="flex items-center justify-between mb-2">
                    <stat.icon className={`w-6 h-6 ${stat.color}`} />
                    <span className="text-2xl font-bold text-white">{stat.value}</span>
                  </div>
                  <p className="text-sm text-gray-400">{stat.label}</p>
                </motion.div>
              ))}
            </div>

            {/* Team Info */}
            <div className="quicksand-font bg-gradient-to-br from-gray-900/90 to-gray-800/90 backdrop-blur-md rounded-2xl p-6 border border-yellow-500/30 shadow-2xl">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <Users className="w-6 h-6 text-yellow-400" />
                Team Information
              </h3>
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-yellow-500">
                  <Image src={teamAvatars[0]} alt="team" className="w-full h-full object-cover" />
                </div>
                <div className="flex-1">
                  <h4 className="text-lg font-semibold text-white mb-1">{team.name}</h4>
                  <div className="flex items-center gap-4 text-sm">
                    <span className="text-yellow-400">Rank: #{team.rank}</span>
                    <span className="text-green-400">Wins: {team.totalWins}</span>
                  </div>
                </div>
              </div>
              <Link
                to="/team-dashboard"
                className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold py-2 px-4 rounded-lg transition-all duration-300 hover:scale-105 shadow-lg text-center block"
              >
                My Team
              </Link>
            </div>
          </motion.div>

          {/* Right Column - Achievements */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="lg:col-span-1"
          >
            <div className="quicksand-font bg-gradient-to-br from-gray-900/90 to-gray-800/90 backdrop-blur-md rounded-2xl p-6 border border-yellow-500/30 shadow-2xl">
              <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <Trophy className="w-6 h-6 text-yellow-400" />
                Achievements
              </h3>
              <div className="space-y-4">
                {achievements.map((achievement, index) => (
                  <motion.div
                    key={achievement.name}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.8 + index * 0.1 }}
                    className={`p-4 rounded-lg border transition-all duration-300 ${achievement.unlocked
                      ? 'bg-green-900/30 border-green-500/50 text-green-100'
                      : 'bg-gray-800/50 border-gray-600/50 text-gray-400'
                      }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-full ${achievement.unlocked ? 'bg-green-500/20' : 'bg-gray-600/50'
                        }`}>
                        <achievement.icon className={`w-5 h-5 ${achievement.unlocked ? 'text-green-400' : 'text-gray-500'
                          }`} />
                      </div>
                      <div className="flex-1">
                        <h4 className={`font-semibold ${achievement.unlocked ? 'text-green-300' : 'text-gray-400'
                          }`}>
                          {achievement.name}
                        </h4>
                        <p className={`text-sm ${achievement.unlocked ? 'text-green-200' : 'text-gray-500'
                          }`}>
                          {achievement.description}
                        </p>
                      </div>
                      {achievement.unlocked && (
                        <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Section - Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.0 }}
          className="max-w-4xl mx-auto mt-12"
        >
          <div className="quicksand-font bg-gradient-to-r from-yellow-500/20 to-orange-500/20 backdrop-blur-md rounded-2xl p-6 border border-yellow-500/30">
            <h3 className="text-2xl font-bold text-white text-center mb-6">Ready for Battle?</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Link to="/individual-match" className="bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-black font-bold py-3 px-6 rounded-lg transition-all duration-300 hover:scale-105 shadow-lg text-center">
                Play
              </Link>
              <Link to="/team-matches" className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 hover:scale-105 shadow-lg text-center">
                Join Tournament
              </Link>
              <Link to="/match-histories" className="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 hover:scale-105 shadow-lg text-center">
                View Leaderboard
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
