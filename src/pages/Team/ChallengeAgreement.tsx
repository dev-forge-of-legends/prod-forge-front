import { motion } from 'framer-motion';
import {
  Calendar,
  Clock,
  Crown,
  DollarSign,
  Gamepad2,
  MessageCircle,
  Play,
  Send,
  Shield,
  Trophy,
  Users,
  X
} from 'lucide-react';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import { Image } from "@components/atoms/Image";
import { mockTeams } from "@app-utils/mockData/mockTeams";
import { Image } from "@components/atoms/Image";

interface ChatMessage {
  id: string;
  sender: string;
  message: string;
  timestamp: string;
  type: 'team' | 'leader';
}

interface MatchTerms {
  duration: string;
  startTime: string;
  betAmount: string;
  gameType: string;
  maxPlayers: number;
  prize: string;
  rules: string[];
}

type TeamStatus = 'pending' | 'ready' | 'accepted' | 'quit' | 'started';

const ChallengeAgreement: React.FC = () => {
  const [teamChatMessage, setTeamChatMessage] = useState('');
  const [leaderChatMessage, setLeaderChatMessage] = useState('');
  const [myTeamStatus, setMyTeamStatus] = useState<TeamStatus>('pending');
  const [otherTeamStatus, setOtherTeamStatus] = useState<TeamStatus>('ready');
  const [myTeamTerms, setMyTeamTerms] = useState<MatchTerms>({
    duration: '2 hours',
    startTime: 'Tomorrow 8:00 PM',
    betAmount: '200 XP',
    gameType: 'Tournament',
    maxPlayers: 2,
    prize: '800 XP',
    rules: ['Standard tournament rules', 'Best of 3 matches', 'No external assistance']
  });
  const [otherTeamTerms] = useState<MatchTerms>({
    duration: '1.5 hours',
    startTime: 'Tomorrow 8:00 PM',
    betAmount: '200 XP',
    gameType: 'Quick Match',
    maxPlayers: 4,
    prize: '800 XP',
    rules: ['Quick match rules', 'Best of 2 matches', 'No external assistance']
  });
  const navigate = useNavigate();

  const team1 = mockTeams[0];
  const team2 = mockTeams[1];

  // Check if both teams have matching terms
  const areTermsMatching = () => {
    return (
      myTeamTerms.duration === otherTeamTerms.duration &&
      myTeamTerms.startTime === otherTeamTerms.startTime &&
      myTeamTerms.betAmount === otherTeamTerms.betAmount &&
      myTeamTerms.gameType === otherTeamTerms.gameType &&
      myTeamTerms.maxPlayers === otherTeamTerms.maxPlayers &&
      myTeamTerms.prize === otherTeamTerms.prize
    );
  };

  // Check if both teams are ready
  const canStartMatch = () => {
    return myTeamStatus === 'ready' && otherTeamStatus === 'ready';
  };

  const getStatusColor = (status: TeamStatus) => {
    switch (status) {
    case 'pending': return 'text-yellow-400 bg-yellow-400/20';
    case 'ready': return 'text-green-400 bg-green-400/20';
    case 'accepted': return 'text-blue-400 bg-blue-400/20';
    case 'quit': return 'text-red-400 bg-red-400/20';
    case 'started': return 'text-purple-400 bg-purple-400/20';
    default: return 'text-gray-400 bg-gray-400/20';
    }
  };

  const getStatusIcon = (status: TeamStatus) => {
    switch (status) {
    case 'pending': return <Clock className="w-4 h-4" />;
    case 'ready': return <Shield className="w-4 h-4" />;
    case 'accepted': return <Crown className="w-4 h-4" />;
    case 'quit': return <X className="w-4 h-4" />;
    case 'started': return <Play className="w-4 h-4" />;
    default: return <Clock className="w-4 h-4" />;
    }
  };

  const teamChat: ChatMessage[] = [
    { id: '1', sender: 'Alex "Shadow" Chen', message: 'Great to be working with Phoenix Knights!', timestamp: '2 min ago', type: 'team' },
    { id: '2', sender: 'David "Phoenix" Lee', message: 'Likewise! This should be an epic match.', timestamp: '2 min ago', type: 'team' },
    { id: '3', sender: 'Sarah "Valkyrie" Kim', message: 'What game mode are you thinking?', timestamp: '1 min ago', type: 'team' },
    { id: '4', sender: 'Lisa "Storm" Wang', message: 'Tournament style would be perfect!', timestamp: '1 min ago', type: 'team' }
  ];

  const leaderChat: ChatMessage[] = [
    { id: '1', sender: 'Alex "Shadow" Chen', message: 'I suggest we start with a 200 XP bet, what do you think?', timestamp: '5 min ago', type: 'leader' },
    { id: '2', sender: 'David "Phoenix" Lee', message: 'That sounds fair. How about the match duration?', timestamp: '4 min ago', type: 'leader' },
    { id: '3', sender: 'Alex "Shadow" Chen', message: '2 hours should give us enough time for a proper tournament.', timestamp: '3 min ago', type: 'leader' },
    { id: '4', sender: 'David "Phoenix" Lee', message: 'Perfect! Let\'s set it for tomorrow evening.', timestamp: '2 min ago', type: 'leader' }
  ];

  const handleSendTeamMessage = () => {
    if (teamChatMessage.trim()) {
      console.log('Sending team message:', teamChatMessage);
      setTeamChatMessage('');
    }
  };

  const handleSendLeaderMessage = () => {
    if (leaderChatMessage.trim()) {
      console.log('Sending leader message:', leaderChatMessage);
      setLeaderChatMessage('');
    }
  };

  const handleReady = () => {
    if (areTermsMatching()) {
      setMyTeamStatus('ready');
      console.log('Team is ready!');
    } else {
      console.log('Terms must match before being ready');
    }
  };

  const handleQuit = () => {
    setMyTeamStatus('quit');
    console.log('Team quit the match');
    navigate('/team-matches');
  };

  const handleStart = () => {
    if (canStartMatch()) {
      setMyTeamStatus('started');
      setOtherTeamStatus('started');
      console.log('Match started!');
      navigate('/ludo-game');
    }
  };

  const renderChat = (messages: ChatMessage[], messageInput: string, setMessageInput: (value: string) => void, onSend: () => void, placeholder: string) => (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto space-y-3 mb-4">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.sender.includes('Shadow') ? 'justify-start' : 'justify-end'}`}>
            <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${msg.sender.includes('Shadow')
              ? 'bg-blue-600/30 border border-blue-500/50'
              : 'bg-purple-600/30 border border-purple-500/50'
              }`}>
              <div className="text-xs text-gray-400 mb-1">{msg.sender}</div>
              <div className="text-white">{msg.message}</div>
              <div className="text-xs text-gray-500 mt-1">{msg.timestamp}</div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        <input
          type="text"
          value={messageInput}
          onChange={(e) => setMessageInput(e.target.value)}
          placeholder={placeholder}
          className="flex-1 bg-gray-700/50 border border-gray-600 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-yellow-500 transition-colors"
          onKeyPress={(e) => e.key === 'Enter' && onSend()}
        />
        <button
          onClick={onSend}
          className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-black px-4 py-2 rounded-lg transition-all duration-300 hover:scale-105"
        >
          <Send className="w-4 h-4" />
        </button>
      </div>
    </div>
  );

  return (
    <div className="quicksand-font min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white p-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-8"
      >
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="p-3 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-full">
            <Shield className="w-8 h-8 text-black" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
            Challenge Agreement
          </h1>
        </div>
        <p className="text-xl text-gray-300 max-w-2xl mx-auto">
          Shadow Warriors vs Phoenix Knights - Finalize match terms and discuss strategy
        </p>
      </motion.div>

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Team Cards with Match Terms */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="lg:col-span-2 space-y-6"
          >
            {/* My Team Card */}
            <div className="bg-gradient-to-br from-gray-800/90 to-gray-700/90 backdrop-blur-md rounded-2xl p-6 border border-blue-500/30 shadow-2xl">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full overflow-hidden border-4 border-blue-500">
                    <Image src={team1.avatar} alt={team1.name} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-2">{team1.name} (Your Team)</h3>
                    <div className={`px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 w-fit ${getStatusColor(myTeamStatus)}`}>
                      {getStatusIcon(myTeamStatus)}
                      {myTeamStatus.charAt(0).toUpperCase() + myTeamStatus.slice(1)}
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  {myTeamStatus === 'pending' && (
                    <>
                      <button
                        onClick={handleReady}
                        disabled={!areTermsMatching()}
                        className={`px-4 py-2 rounded-lg transition-all duration-300 flex items-center gap-2 ${areTermsMatching()
                          ? 'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white hover:scale-105'
                          : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                          }`}
                      >
                        <Shield className="w-4 h-4" />
                        Ready
                      </button>
                      <button
                        onClick={handleQuit}
                        className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-4 py-2 rounded-lg transition-all duration-300 hover:scale-105 flex items-center gap-2"
                      >
                        <X className="w-4 h-4" />
                        Quit
                      </button>
                    </>
                  )}
                  {myTeamStatus === 'ready' && otherTeamStatus === 'ready' && (
                    <button
                      onClick={handleStart}
                      className="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white px-4 py-2 rounded-lg transition-all duration-300 hover:scale-105 flex items-center gap-2"
                    >
                      <Play className="w-4 h-4" />
                      Start Match
                    </button>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Duration</label>
                    <select
                      value={myTeamTerms.duration}
                      onChange={(e) => setMyTeamTerms({ ...myTeamTerms, duration: e.target.value })}
                      className="w-full bg-gray-700/50 border border-gray-600 rounded-lg p-3 text-white focus:outline-none focus:border-blue-500 transition-colors"
                    >
                      <option value="30 minutes">30 minutes</option>
                      <option value="1 hour">1 hour</option>
                      <option value="1.5 hours">1.5 hours</option>
                      <option value="2 hours">2 hours</option>
                      <option value="3 hours">3 hours</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Start Time</label>
                    <select
                      value={myTeamTerms.startTime}
                      onChange={(e) => setMyTeamTerms({ ...myTeamTerms, startTime: e.target.value })}
                      className="w-full bg-gray-700/50 border border-gray-600 rounded-lg p-3 text-white focus:outline-none focus:border-blue-500 transition-colors"
                    >
                      <option value="Today 6:00 PM">Today 6:00 PM</option>
                      <option value="Today 8:00 PM">Today 8:00 PM</option>
                      <option value="Tomorrow 6:00 PM">Tomorrow 6:00 PM</option>
                      <option value="Tomorrow 8:00 PM">Tomorrow 8:00 PM</option>
                      <option value="Tomorrow 10:00 PM">Tomorrow 10:00 PM</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Bet Amount</label>
                    <select
                      value={myTeamTerms.betAmount}
                      onChange={(e) => setMyTeamTerms({ ...myTeamTerms, betAmount: e.target.value })}
                      className="w-full bg-gray-700/50 border border-gray-600 rounded-lg p-3 text-white focus:outline-none focus:border-blue-500 transition-colors"
                    >
                      <option value="100 XP">100 XP</option>
                      <option value="150 XP">150 XP</option>
                      <option value="200 XP">200 XP</option>
                      <option value="300 XP">300 XP</option>
                      <option value="500 XP">500 XP</option>
                    </select>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Game Type</label>
                    <select
                      value={myTeamTerms.gameType}
                      onChange={(e) => setMyTeamTerms({ ...myTeamTerms, gameType: e.target.value })}
                      className="w-full bg-gray-700/50 border border-gray-600 rounded-lg p-3 text-white focus:outline-none focus:border-blue-500 transition-colors"
                    >
                      <option value="Quick Match">Quick Match</option>
                      <option value="Standard Match">Standard Match</option>
                      <option value="Tournament">Tournament</option>
                      <option value="Custom Rules">Custom Rules</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Max Players</label>
                    <select
                      value={myTeamTerms.maxPlayers}
                      onChange={(e) => setMyTeamTerms({ ...myTeamTerms, maxPlayers: parseInt(e.target.value) })}
                      className="w-full bg-gray-700/50 border border-gray-600 rounded-lg p-3 text-white focus:outline-none focus:border-blue-500 transition-colors"
                    >
                      <option value="2">2 Players</option>
                      <option value="4">4 Players</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Prize Pool</label>
                    <select
                      value={myTeamTerms.prize}
                      onChange={(e) => setMyTeamTerms({ ...myTeamTerms, prize: e.target.value })}
                      className="w-full bg-gray-700/50 border border-gray-600 rounded-lg p-3 text-white focus:outline-none focus:border-blue-500 transition-colors"
                    >
                      <option value="500 XP">500 XP</option>
                      <option value="800 XP">800 XP</option>
                      <option value="1000 XP">1000 XP</option>
                      <option value="1500 XP">1500 XP</option>
                      <option value="2000 XP">2000 XP</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Terms Matching Status */}
              {!areTermsMatching() && (
                <div className="mt-4 p-3 bg-yellow-500/20 border border-yellow-500/50 rounded-lg">
                  <div className="flex items-center gap-2 text-yellow-400">
                    <Clock className="w-4 h-4" />
                    <span className="text-sm font-medium">Terms don't match - adjust your terms to match the other team</span>
                  </div>
                </div>
              )}

              {areTermsMatching() && myTeamStatus === 'pending' && (
                <div className="mt-4 p-3 bg-green-500/20 border border-green-500/50 rounded-lg">
                  <div className="flex items-center gap-2 text-green-400">
                    <Shield className="w-4 h-4" />
                    <span className="text-sm font-medium">Terms match! You can now mark yourself as ready</span>
                  </div>
                </div>
              )}
            </div>

            {/* Other Team Card */}
            <div className="bg-gradient-to-br from-gray-800/90 to-gray-700/90 backdrop-blur-md rounded-2xl p-6 border border-purple-500/30 shadow-2xl">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-full overflow-hidden border-4 border-purple-500">
                  <Image src={team2.avatar} alt={team2.name} className="w-full h-full object-cover" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2">{team2.name}</h3>
                  <div className={`px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 w-fit ${getStatusColor(otherTeamStatus)}`}>
                    {getStatusIcon(otherTeamStatus)}
                    {otherTeamStatus.charAt(0).toUpperCase() + otherTeamStatus.slice(1)}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-3 bg-gray-700/50 rounded-lg">
                    <Clock className="w-5 h-5 text-blue-400" />
                    <div>
                      <div className="text-sm text-gray-400">Duration</div>
                      <div className="text-white font-medium">{otherTeamTerms.duration}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-gray-700/50 rounded-lg">
                    <Calendar className="w-5 h-5 text-green-400" />
                    <div>
                      <div className="text-sm text-gray-400">Start Time</div>
                      <div className="text-white font-medium">{otherTeamTerms.startTime}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-gray-700/50 rounded-lg">
                    <DollarSign className="w-5 h-5 text-yellow-400" />
                    <div>
                      <div className="text-sm text-gray-400">Bet Amount</div>
                      <div className="text-white font-medium">{otherTeamTerms.betAmount}</div>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-3 bg-gray-700/50 rounded-lg">
                    <Gamepad2 className="w-5 h-5 text-purple-400" />
                    <div>
                      <div className="text-sm text-gray-400">Game Type</div>
                      <div className="text-white font-medium">{otherTeamTerms.gameType}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-gray-700/50 rounded-lg">
                    <Users className="w-5 h-5 text-orange-400" />
                    <div>
                      <div className="text-sm text-gray-400">Max Players</div>
                      <div className="text-white font-medium">{otherTeamTerms.maxPlayers}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-gray-700/50 rounded-lg">
                    <Trophy className="w-5 h-5 text-red-400" />
                    <div>
                      <div className="text-sm text-gray-400">Prize Pool</div>
                      <div className="text-white font-medium">{otherTeamTerms.prize}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column - Team Chat */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="lg:col-span-1"
          >
            <div className="bg-gradient-to-br from-gray-800/90 to-gray-700/90 backdrop-blur-md rounded-2xl p-6 border border-yellow-500/30 shadow-2xl h-full">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <MessageCircle className="w-5 h-5 text-blue-400" />
                Team Chat
              </h3>
              {renderChat(teamChat, teamChatMessage, setTeamChatMessage, handleSendTeamMessage, 'Message the team...')}
            </div>
          </motion.div>
        </div>

        {/* Bottom Section - Leaders Chat */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-8"
        >
          <div className="bg-gradient-to-br from-gray-800/90 to-gray-700/90 backdrop-blur-md rounded-2xl p-6 border border-yellow-500/30 shadow-2xl">
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
              <Crown className="w-6 h-6 text-yellow-400" />
              Leaders Chat
            </h3>
            <div className="h-80">
              {renderChat(leaderChat, leaderChatMessage, setLeaderChatMessage, handleSendLeaderMessage, 'Message the other leader...')}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ChallengeAgreement;
