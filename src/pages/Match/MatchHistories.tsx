import { motion } from 'framer-motion';
import {
  Calendar,
  Clock,
  Download,
  Eye,
  Search,
  Target,
  TrendingDown,
  Trophy,
  Users
} from 'lucide-react';
import React, { useState } from 'react';

interface MatchHistory {
  id: string;
  matchName: string;
  team1: string;
  team2: string;
  result: 'won' | 'lost' | 'draw';
  score: string;
  date: string;
  duration: string;
  gameType: string;
  prize: string;
  betAmount: string;
  participants: number;
  performance: number;
}

const MatchHistories: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'won' | 'lost' | 'draw'>('all');
  const [sortBy, setSortBy] = useState<'date' | 'performance' | 'prize'>('date');

  const matchHistories: MatchHistory[] = [
    {
      id: '1',
      matchName: 'Epic Team Showdown',
      team1: 'Shadow Warriors',
      team2: 'Phoenix Knights',
      result: 'won',
      score: '3-1',
      date: '2024-01-15',
      duration: '2h 15m',
      gameType: 'Tournament',
      prize: '2000 XP',
      betAmount: '100 XP',
      participants: 8,
      performance: 95
    },
    {
      id: '2',
      matchName: 'Legends Battle Royale',
      team1: 'Shadow Warriors',
      team2: 'Dragon Slayers',
      result: 'lost',
      score: '1-3',
      date: '2024-01-14',
      duration: '1h 45m',
      gameType: 'Quick Match',
      prize: '1000 XP',
      betAmount: '50 XP',
      participants: 4,
      performance: 78
    },
    {
      id: '3',
      matchName: 'Championship Challenge',
      team1: 'Shadow Warriors',
      team2: 'Thunder Lords',
      result: 'won',
      score: '2-0',
      date: '2024-01-12',
      duration: '3h 20m',
      gameType: 'Championship',
      prize: '3000 XP',
      betAmount: '200 XP',
      participants: 6,
      performance: 92
    },
    {
      id: '4',
      matchName: 'Elite Tournament',
      team1: 'Shadow Warriors',
      team2: 'Void Hunters',
      result: 'draw',
      score: '2-2',
      date: '2024-01-10',
      duration: '2h 30m',
      gameType: 'Elite',
      prize: '1500 XP',
      betAmount: '75 XP',
      participants: 6,
      performance: 85
    },
    {
      id: '5',
      matchName: 'Quick Battle',
      team1: 'Shadow Warriors',
      team2: 'Frost Giants',
      result: 'won',
      score: '3-0',
      date: '2024-01-08',
      duration: '1h 10m',
      gameType: 'Quick Match',
      prize: '800 XP',
      betAmount: '40 XP',
      participants: 4,
      performance: 98
    }
  ];

  const filteredMatches = matchHistories
    .filter(match => {
      const matchesSearch = match.matchName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        match.team1.toLowerCase().includes(searchTerm.toLowerCase()) ||
        match.team2.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesFilter = filterType === 'all' || match.result === filterType;
      return matchesSearch && matchesFilter;
    })
    .sort((a, b) => {
      switch (sortBy) {
      case 'date':
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      case 'performance':
        return b.performance - a.performance;
      case 'prize':
        return parseInt(b.prize) - parseInt(a.prize);
      default:
        return 0;
      }
    });

  const getResultColor = (result: string) => {
    switch (result) {
    case 'won': return 'text-green-400 bg-green-400/20';
    case 'lost': return 'text-red-400 bg-red-400/20';
    case 'draw': return 'text-yellow-400 bg-yellow-400/20';
    default: return 'text-gray-400 bg-gray-400/20';
    }
  };

  const getResultIcon = (result: string) => {
    switch (result) {
    case 'won': return <Trophy className="w-4 h-4" />;
    case 'lost': return <TrendingDown className="w-4 h-4" />;
    case 'draw': return <Target className="w-4 h-4" />;
    default: return <Clock className="w-4 h-4" />;
    }
  };

  const getPerformanceColor = (performance: number) => {
    if (performance >= 90) return 'text-green-400';
    if (performance >= 80) return 'text-yellow-400';
    if (performance >= 70) return 'text-orange-400';
    return 'text-red-400';
  };

  const stats = {
    total: matchHistories.length,
    won: matchHistories.filter(m => m.result === 'won').length,
    lost: matchHistories.filter(m => m.result === 'lost').length,
    draw: matchHistories.filter(m => m.result === 'draw').length,
    winRate: Math.round((matchHistories.filter(m => m.result === 'won').length / matchHistories.length) * 100),
    avgPerformance: Math.round(matchHistories.reduce((sum, m) => sum + m.performance, 0) / matchHistories.length)
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
          <div className="p-3 bg-gradient-to-br from-green-500 to-green-600 rounded-full">
            <Clock className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
            Match History
          </h1>
        </div>
        <p className="text-xl text-gray-300 max-w-2xl mx-auto">
          Track your team's performance, analyze results, and review past battles
        </p>
      </motion.div>

      <div className="max-w-7xl mx-auto">
        {/* Stats Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-6 gap-4 mb-8"
        >
          {[
            { label: 'Total Matches', value: stats.total, color: 'from-blue-500 to-blue-600' },
            { label: 'Wins', value: stats.won, color: 'from-green-500 to-green-600' },
            { label: 'Losses', value: stats.lost, color: 'from-red-500 to-red-600' },
            { label: 'Draws', value: stats.draw, color: 'from-yellow-500 to-yellow-600' },
            { label: 'Win Rate', value: `${stats.winRate}%`, color: 'from-purple-500 to-purple-600' },
            { label: 'Avg Performance', value: stats.avgPerformance, color: 'from-orange-500 to-orange-600' }
          ].map((stat) => (
            <div
              key={stat.label}
              className="bg-gradient-to-br from-gray-800/80 to-gray-700/80 backdrop-blur-sm rounded-xl p-4 border border-gray-600/50 hover:border-yellow-500/50 transition-all duration-300 hover:scale-105"
            >
              <div className="text-center">
                <div className={`inline-flex p-2 bg-gradient-to-br ${stat.color} rounded-lg mb-2`}>
                  <Trophy className="w-5 h-5 text-white" />
                </div>
                <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                <p className="text-gray-300 text-xs">{stat.label}</p>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-gradient-to-br from-gray-800/90 to-gray-700/90 backdrop-blur-md rounded-2xl p-6 border border-yellow-500/30 shadow-2xl mb-8"
        >
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search matches..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-yellow-500 transition-colors"
              />
            </div>

            {/* Filters */}
            <div className="flex gap-3">
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value as any)}
                className="px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-yellow-500 transition-colors"
              >
                <option value="all">All Results</option>
                <option value="won">Wins Only</option>
                <option value="lost">Losses Only</option>
                <option value="draw">Draws Only</option>
              </select>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-yellow-500 transition-colors"
              >
                <option value="date">Sort by Date</option>
                <option value="performance">Sort by Performance</option>
                <option value="prize">Sort by Prize</option>
              </select>
            </div>

            {/* Export Button */}
            <button className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-6 py-3 rounded-lg transition-all duration-300 hover:scale-105 flex items-center gap-2">
              <Download className="w-5 h-5" />
              Export
            </button>
          </div>
        </motion.div>

        {/* Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="bg-gradient-to-br from-gray-800/90 to-gray-700/90 backdrop-blur-md rounded-2xl border border-yellow-500/30 shadow-2xl overflow-hidden"
        >
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-700/50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Match Details</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Result</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Score</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Date & Duration</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Game Info</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Performance</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700/50">
                {filteredMatches.map((match, index) => (
                  <motion.tr
                    key={match.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.8 + index * 0.1 }}
                    className="hover:bg-gray-700/30 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div>
                        <div className="text-sm font-medium text-white">{match.matchName}</div>
                        <div className="text-sm text-gray-400">
                          {match.team1} vs {match.team2}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getResultColor(match.result)}`}>
                        {getResultIcon(match.result)}
                        <span className="ml-1">{match.result.toUpperCase()}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-lg font-bold text-white">{match.score}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-300">
                        <div className="flex items-center gap-1 mb-1">
                          <Calendar className="w-4 h-4" />
                          {new Date(match.date).toLocaleDateString()}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {match.duration}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-300 space-y-1">
                        <div className="flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          {match.participants} players
                        </div>
                        <div className="flex items-center gap-1">
                          <Target className="w-4 h-4" />
                          {match.gameType}
                        </div>
                        <div className="text-yellow-400 font-medium">
                          {match.prize} • {match.betAmount}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className={`text-lg font-bold ${getPerformanceColor(match.performance)}`}>
                        {match.performance}%
                      </div>
                      <div className="w-full bg-gray-600 rounded-full h-2 mt-1">
                        <div
                          className={`h-2 rounded-full ${getPerformanceColor(match.performance).replace('text-', 'bg-')}`}
                          style={{ width: `${match.performance}%` }}
                        ></div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <button className="text-blue-400 hover:text-blue-300 transition-colors p-2 rounded-lg hover:bg-blue-500/20">
                        <Eye className="w-5 h-5" />
                      </button>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredMatches.length === 0 && (
            <div className="text-center py-12 text-gray-400">
              <Clock className="w-16 h-16 mx-auto mb-4 opacity-50" />
              <p className="text-lg">No matches found</p>
              <p className="text-sm">Try adjusting your search or filters</p>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default MatchHistories;
