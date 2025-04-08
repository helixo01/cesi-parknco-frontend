import React, { useEffect, useState } from 'react';
import { AiFillStar, AiOutlineStar, AiFillTrophy } from 'react-icons/ai';
import { MdLeaderboard, MdStars, MdEmojiEvents } from 'react-icons/md';
import { FaMedal, FaCrown, FaLock } from 'react-icons/fa';
import { getUserStats, getAllUsersStats, UserStats as IUserStats } from '@/services/statsService';
import { toast } from 'react-hot-toast';

interface UserPointsProps {
  userId: string;
}

interface LeaderboardEntry {
  id: string;
  name: string;
  points: number;
  rank: number;
  role: string;
}

interface UserStats {
  totalPoints: number;
  averageRating: number;
  rank: number;
  leaderboard: LeaderboardEntry[];
  role?: string;
}

const UserPoints: React.FC<UserPointsProps> = ({ userId }) => {
  const [stats, setStats] = useState<IUserStats>({
    totalPoints: 0,
    averageRating: 0,
    rank: 0,
    leaderboard: []
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        const data = await getUserStats(userId);
        setStats(data);
      } catch (error) {
        console.error('Error fetching stats:', error);
        toast.error('Erreur lors du chargement des statistiques');
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [userId]);

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(
          <AiFillStar
            key={i}
            className="text-yellow-400 inline-block transform hover:scale-110 transition-transform"
            size={28}
          />
        );
      } else if (i === fullStars + 1 && hasHalfStar) {
        stars.push(
          <AiFillStar
            key={i}
            className="text-yellow-400 inline-block transform hover:scale-110 transition-transform"
            size={28}
            style={{ clipPath: 'inset(0 50% 0 0)' }}
          />
        );
      } else {
        stars.push(
          <AiOutlineStar
            key={i}
            className="text-yellow-400 inline-block transform hover:scale-110 transition-transform"
            size={28}
          />
        );
      }
    }
    return stars;
  };

  const getMedalIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <FaCrown className="text-yellow-400 text-2xl" />;
      case 2:
        return <FaMedal className="text-gray-400 text-2xl" />;
      case 3:
        return <FaMedal className="text-amber-600 text-2xl" />;
      default:
        return rank;
    }
  };

  const getMedalColor = (rank: number) => {
    switch (rank) {
      case 1:
        return 'bg-gradient-to-r from-yellow-900 to-yellow-700 shadow-lg shadow-yellow-900/50';
      case 2:
        return 'bg-gradient-to-r from-gray-800 to-gray-600 shadow-lg shadow-gray-900/50';
      case 3:
        return 'bg-gradient-to-r from-amber-900 to-amber-700 shadow-lg shadow-amber-900/50';
      default:
        return 'bg-gradient-to-r from-gray-800 to-gray-700';
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-white border-t-transparent"></div>
      </div>
    );
  }

  // Si l'utilisateur est un admin_user, afficher un message spécial
  if (stats.role === 'admin_user') {
    return (
      <div className="flex flex-col items-center justify-center h-64 space-y-4">
        <FaLock className="text-gray-400 text-6xl" />
        <p className="text-gray-400 text-xl">Les administrateurs n'apparaissent pas dans le classement</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-4">
      {/* Points de l'utilisateur */}
      <div className="bg-gradient-to-br from-gray-800 via-gray-900 to-gray-800 rounded-xl p-8 shadow-xl transform hover:scale-[1.02] transition-all duration-300">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white flex items-center">
            <MdStars className="mr-2 text-yellow-400 text-3xl" />
            Mes points
          </h2>
          <div className="bg-blue-900 px-4 py-2 rounded-full">
            <span className="text-sm text-gray-300">Rang</span>
            <span className="ml-2 text-xl font-bold text-white">#{stats.rank}</span>
          </div>
        </div>
        <div className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 text-center mb-4">
          {Number(stats.totalPoints).toFixed(2)}
          <div className="text-gray-400 text-base mt-2 font-normal">points</div>
        </div>
        <div className="mt-6 text-center space-y-2">
          <div className="flex justify-center space-x-1">
            {renderStars(stats.averageRating)}
          </div>
          <div className="text-gray-400 text-sm">
            Note moyenne : <span className="text-white font-semibold">{stats.averageRating.toFixed(1)}/5</span>
          </div>
        </div>
      </div>

      {/* Classement */}
      <div className="bg-gradient-to-br from-gray-800 via-gray-900 to-gray-800 rounded-xl p-8 shadow-xl">
        <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
          <MdEmojiEvents className="mr-2 text-yellow-400 text-3xl" />
          Classement
        </h2>
        <div className="space-y-4">
          {stats.leaderboard.map((user) => (
            <div
              key={user.id}
              className={`flex items-center justify-between p-4 rounded-lg ${
                user.id === userId 
                  ? 'bg-gradient-to-r from-blue-900 to-blue-800 shadow-lg shadow-blue-900/50 border border-blue-700'
                  : getMedalColor(user.rank)
              } transform hover:scale-[1.02] transition-all duration-300`}
            >
              <div className="flex items-center">
                <div className="w-10 h-10 flex items-center justify-center rounded-full bg-opacity-30 bg-black mr-4 font-bold">
                  {getMedalIcon(user.rank)}
                </div>
                <span className="text-white font-medium">{user.name}</span>
              </div>
              <div className="flex items-center">
                <span className="text-white font-bold bg-black bg-opacity-30 px-3 py-1 rounded-full">
                  {Number(user.points).toFixed(2)} pts
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserPoints; 