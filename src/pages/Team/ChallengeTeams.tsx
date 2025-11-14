import { mockTeams } from "@app-utils/mockData/mockTeams";
import { Image } from "@components/atoms/Image";
import { AnimatePresence, motion } from 'framer-motion';
import {
  Award,
  Clock,
  Crown,
  Eye,
  Gamepad2,
  MapPin,
  Search,
  Send,
  Shield,
  Users
} from 'lucide-react';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface Team {
  id: string;
  name: string;
  avatar: string;
  rank: number;
  members: number;
  maxMembers: number;
  winRate: number;
  totalMatches: number;
  currentStreak: number;
  status: 'online' | 'offline' | 'in-match';
  location: string;
  lastActive: string;
  description: string;
  specialties: string[];
  achievements: string[];
  challengeStatus?: 'none' | 'pending' | 'accepted' | 'declined';
}

const ChallengeTeams: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRank, setFilterRank] = useState<'all' | 'top10' | 'top50' | 'top100'>('all');
  const [filterStatus, setFilterStatus] = useState<'all' | 'online' | 'offline' | 'in-match'>('all');
  const [sortBy, setSortBy] = useState<'rank' | 'winRate' | 'totalMatches' | 'streak'>('rank');

  const teams: Team[] = mockTeams as Team[];
  const navigate = useNavigate();

  const filteredTeams = teams
    .filter(team => {
      const matchesSearch = team.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        team.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        team.specialties.some(s => s.toLowerCase().includes(searchTerm.toLowerCase()));

      const matchesRank = filterRank === 'all' ||
        (filterRank === 'top10' && team.rank <= 10) ||
        (filterRank === 'top50' && team.rank <= 50) ||
        (filterRank === 'top100' && team.rank <= 100);

      const matchesStatus = filterStatus === 'all' || team.status === filterStatus;

      return matchesSearch && matchesRank && matchesStatus;
    })
    .sort((a, b) => {
      switch (sortBy) {
      case 'rank':
        return a.rank - b.rank;
      case 'winRate':
        return b.winRate - a.winRate;
      case 'totalMatches':
        return b.totalMatches - a.totalMatches;
      case 'streak':
        return b.currentStreak - a.currentStreak;
      default:
        return 0;
      }
    });

  const getStatusColor = (status: string) => {
    switch (status) {
    case 'online': return 'text-green-400 bg-green-400/20';
    case 'offline': return 'text-gray-400 bg-gray-400/20';
    case 'in-match': return 'text-yellow-400 bg-yellow-400/20';
    default: return 'text-gray-400 bg-gray-400/20';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
    case 'online': return <div className="w-2 h-2 bg-green-400 rounded-full"></div>;
    case 'offline': return <div className="w-2 h-2 bg-gray-400 rounded-full"></div>;
    case 'in-match': return <Gamepad2 className="w-4 h-4" />;
    default: return <div className="w-2 h-2 bg-gray-400 rounded-full"></div>;
    }
  };

  const getRankColor = (rank: number) => {
    if (rank <= 3) return 'text-yellow-400';
    if (rank <= 10) return 'text-purple-400';
    if (rank <= 25) return 'text-blue-400';
    if (rank <= 50) return 'text-green-400';
    return 'text-gray-400';
  };

  const handleSendChallenge = (teamId: string) => {
    console.log('Sending challenge to team:', teamId);
    navigate('/team-matches');
  };

  const handleViewProfile = (teamId: string) => {
    console.log('Viewing profile of team:', teamId);
    // Handle view profile logic
  };

  return (
    <div className="quicksand-font min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white p-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="p-3 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Challenge Teams
          </h1>
        </div>
        <p className="text-xl text-gray-300 max-w-2xl mx-auto">
          Discover worthy opponents, send challenges, and prove your team's dominance
        </p>
      </motion.div>

      <div className="max-w-7xl mx-auto">
        {/* Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-gradient-to-br from-gray-800/90 to-gray-700/90 backdrop-blur-md rounded-2xl p-6 border border-yellow-500/30 shadow-2xl mb-8"
        >
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search teams..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-yellow-500 transition-colors"
              />
            </div>

            {/* Filters */}
            <div className="flex gap-3">
              <select
                value={filterRank}
                onChange={(e) => setFilterRank(e.target.value as any)}
                className="px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-yellow-500 transition-colors"
              >
                <option value="all">All Ranks</option>
                <option value="top10">Top 10</option>
                <option value="top50">Top 50</option>
                <option value="top100">Top 100</option>
              </select>

              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value as any)}
                className="px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-yellow-500 transition-colors"
              >
                <option value="all">All Status</option>
                <option value="online">Online</option>
                <option value="offline">Offline</option>
                <option value="in-match">In Match</option>
              </select>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-yellow-500 transition-colors"
              >
                <option value="rank">Sort by Rank</option>
                <option value="winRate">Sort by Win Rate</option>
                <option value="totalMatches">Sort by Matches</option>
                <option value="streak">Sort by Streak</option>
              </select>
            </div>
          </div>
        </motion.div>

        {/* Teams Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence>
            {filteredTeams.map((team, index) => (
              <motion.div
                key={team.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
                className="bg-gradient-to-br from-gray-800/90 to-gray-700/90 backdrop-blur-md rounded-2xl p-6 border border-yellow-500/30 shadow-2xl hover:shadow-yellow-500/20 transition-all duration-300 hover:scale-105"
              >
                {/* Team Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-yellow-500">
                        <Image src={team.avatar} alt={team.name} className="w-full h-full object-cover" />
                      </div>
                      <div className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center ${getStatusColor(team.status)}`}>
                        {getStatusIcon(team.status)}
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white">{team.name}</h3>
                      <div className="flex items-center gap-2 text-sm">
                        <Crown className={`w-4 h-4 ${getRankColor(team.rank)}`} />
                        <span className={`font-medium ${getRankColor(team.rank)}`}>Rank #{team.rank}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Team Stats */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="text-center p-3 bg-gray-700/50 rounded-lg">
                    <div className="text-2xl font-bold text-white">{team.winRate}%</div>
                    <div className="text-xs text-gray-400">Win Rate</div>
                  </div>
                  <div className="text-center p-3 bg-gray-700/50 rounded-lg">
                    <div className="text-2xl font-bold text-white">{team.currentStreak}</div>
                    <div className="text-xs text-gray-400">Streak</div>
                  </div>
                </div>

                {/* Team Info */}
                <div className="space-y-3 mb-4">
                  <div className="flex items-center gap-2 text-sm text-gray-300">
                    <Users className="w-4 h-4 text-blue-400" />
                    <span>{team.members}/{team.maxMembers} Members</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-300">
                    <MapPin className="w-4 h-4 text-green-400" />
                    <span>{team.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-300">
                    <Clock className="w-4 h-4 text-yellow-400" />
                    <span>Active: {team.lastActive}</span>
                  </div>
                </div>

                {/* Specialties */}
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-gray-300 mb-2">Specialties</h4>
                  <div className="flex flex-wrap gap-2">
                    {team.specialties.map((specialty, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-1 bg-blue-500/20 text-blue-400 text-xs rounded-full border border-blue-500/30"
                      >
                        {specialty}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Achievements */}
                <div className="mb-6">
                  <h4 className="text-sm font-medium text-gray-300 mb-2">Recent Achievements</h4>
                  <div className="space-y-1">
                    {team.achievements.slice(0, 2).map((achievement, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs text-gray-400">
                        <Award className="w-3 h-3 text-yellow-400" />
                        <span>{achievement}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <button
                    onClick={() => handleSendChallenge(team.id)}
                    disabled={team.status === 'in-match'}
                    className="flex-1 bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 disabled:from-gray-600 disabled:to-gray-700 text-black font-bold py-2 px-4 rounded-lg transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2 disabled:cursor-not-allowed"
                  >
                    <Send className="w-4 h-4" />
                    Challenge
                  </button>
                  <button
                    onClick={() => handleViewProfile(team.id)}
                    className="px-4 py-2 bg-gray-700/50 hover:bg-gray-600/50 text-white rounded-lg transition-all duration-300 hover:scale-105 border border-gray-600/50 hover:border-yellow-500/50"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredTeams.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="text-center py-12 text-gray-400"
          >
            <Shield className="w-16 h-16 mx-auto mb-4 opacity-50" />
            <p className="text-lg">No teams found</p>
            <p className="text-sm">Try adjusting your search or filters</p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default ChallengeTeams;
