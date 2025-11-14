import { mockUsers } from "@app-utils/mockData/mockUsers";
import { teamAvatars } from "@app-utils/mockData/teamAvatars";
import { Image } from "@components/atoms/Image";
import { motion } from 'framer-motion';
import {
  Award,
  Clock,
  Crown,
  Gamepad2,
  MessageCircle,
  Shield,
  Star,
  Target,
  TrendingUp,
  Trophy,
  Users,
  Zap
} from 'lucide-react';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const TeamDashboard: React.FC = () => {
  const navigate = useNavigate();

  const teamStats = [
    { label: 'Total Matches', value: '156', icon: Gamepad2, color: 'from-blue-500 to-blue-600' },
    { label: 'Wins', value: '98', icon: Trophy, color: 'from-yellow-500 to-yellow-600' },
    { label: 'Win Rate', value: '63%', icon: Target, color: 'from-green-500 to-green-600' },
    { label: 'Current Streak', value: '8', icon: Zap, color: 'from-purple-500 to-purple-600' }
  ];

  const teamMembers = mockUsers.slice(0, 5);

  const recentAchievements = [
    { name: 'Team Champions', description: 'Won the monthly tournament', icon: Trophy, unlocked: true },
    { name: 'Perfect Streak', description: '10 wins in a row', icon: TrendingUp, unlocked: true },
    { name: 'Elite Status', description: 'Reached top 5 ranking', icon: Crown, unlocked: false }
  ];

  const quickActions = [
    {
      title: 'Team Matches',
      description: 'Manage team matches and join competitions',
      icon: Gamepad2,
      color: 'from-blue-500 to-blue-600',
      action: () => navigate('/team-matches')
    },
    {
      title: 'Match History',
      description: 'View detailed match results and statistics',
      icon: Clock,
      color: 'from-green-500 to-green-600',
      action: () => navigate('/match-histories')
    },
    {
      title: 'Challenge Teams',
      description: 'Send challenges to other teams',
      icon: Shield,
      color: 'from-purple-500 to-purple-600',
      action: () => navigate('/challenge-teams')
    }
  ];

  return (
    <div className="quicksand-font min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white p-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <div className="flex items-center justify-center gap-4 mb-6">
          <div className="relative">
            <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-yellow-500 shadow-2xl">
              <img
                src={teamAvatars[0]}
                alt="Team Avatar"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center">
              <Crown className="w-5 h-5 text-black" />
            </div>
          </div>
          <div className="text-left">
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
              Shadow Warriors
            </h1>
            <p className="text-xl text-gray-300">Elite Team • Rank #3 • 4 Members</p>
            <div className="flex items-center gap-4 mt-2">
              <span className="text-yellow-400 font-semibold">Legendary Status</span>
              <span className="text-green-400">Active</span>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="max-w-7xl mx-auto">
        {/* Stats Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
        >
          {teamStats.map((stat, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-gray-800/80 to-gray-700/80 backdrop-blur-sm rounded-xl p-6 border border-gray-600/50 hover:border-yellow-500/50 transition-all duration-300 hover:scale-105"
            >
              <div className="flex items-center justify-between mb-3">
                <div className={`p-3 bg-gradient-to-br ${stat.color} rounded-lg`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <span className="text-2xl font-bold text-white">{stat.value}</span>
              </div>
              <p className="text-gray-300 text-sm">{stat.label}</p>
            </div>
          ))}
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Team Members */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="lg:col-span-1"
          >
            <div className="bg-gradient-to-br from-gray-800/90 to-gray-700/90 backdrop-blur-md rounded-2xl p-6 border border-yellow-500/30 shadow-2xl">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                <Users className="w-6 h-6 text-yellow-400" />
                Team Members
              </h2>
              <div className="space-y-4">
                {teamMembers.map((member, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
                    className="flex items-center gap-3 p-3 bg-gray-700/50 rounded-lg hover:bg-gray-600/50 transition-colors"
                  >
                    <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-yellow-500">
                      <Image src={member.avatar} alt={member.userName} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-white text-sm">{member.userName}</h4>
                      <div className="flex items-center gap-2 text-xs">
                        <span className="text-yellow-400">{member.role}</span>
                        <span className="text-gray-400">•</span>
                        <span className="text-blue-400">{member.rank}</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Center Column - Quick Actions */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="lg:col-span-1"
          >
            <div className="bg-gradient-to-br from-gray-800/90 to-gray-700/90 backdrop-blur-md rounded-2xl p-6 border border-yellow-500/30 shadow-2xl">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                <Star className="w-6 h-6 text-yellow-400" />
                Quick Actions
              </h2>
              <div className="space-y-4">
                {quickActions.map((action, index) => (
                  <motion.button
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.8 + index * 0.1 }}
                    onClick={action.action}
                    className="w-full text-left p-4 bg-gradient-to-r from-gray-700/50 to-gray-600/50 rounded-xl border border-gray-600/50 hover:border-yellow-500/50 transition-all duration-300 hover:scale-105 group"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`p-3 bg-gradient-to-br ${action.color} rounded-lg group-hover:scale-110 transition-transform`}>
                        <action.icon className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-white mb-1">{action.title}</h3>
                        <p className="text-sm text-gray-300">{action.description}</p>
                      </div>
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right Column - Achievements */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="lg:col-span-1"
          >
            <div className="bg-gradient-to-br from-gray-800/90 to-gray-700/90 backdrop-blur-md rounded-2xl p-6 border border-yellow-500/30 shadow-2xl">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                <Award className="w-6 h-6 text-yellow-400" />
                Achievements
              </h2>
              <div className="space-y-4">
                {recentAchievements.map((achievement, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 1.0 + index * 0.1 }}
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

        {/* Bottom Section - Team Chat & Notifications */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="max-w-4xl mx-auto mt-12"
        >
          <div className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 backdrop-blur-md rounded-2xl p-6 border border-yellow-500/30">
            <h3 className="text-2xl font-bold text-white text-center mb-6">Team Communication</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <button className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 hover:scale-105 shadow-lg flex items-center justify-center gap-2">
                <MessageCircle className="w-5 h-5" />
                Team Chat
              </button>
              <button className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 hover:scale-105 shadow-lg flex items-center justify-center gap-2">
                <Shield className="w-5 h-5" />
                Team Settings
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default TeamDashboard;
