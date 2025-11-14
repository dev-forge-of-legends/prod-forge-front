import {
  apiCheckRewardAvailable,
  apiGetClaimedReward,
} from "@apis/achievement";
import { AchieveItem } from "@app-types/interfaces";
import AchievementPagination from "@components/molecules/AchievementPagination/AchievementPagination";
import { useEffect, useState } from "react";

const AchievementPage: React.FC = () => {
  const [achieves, setAchieves] = useState<AchieveItem[]>([]);

  useEffect(() => {
    fetchAchievement();
  }, []);

  const fetchAchievement = async () => {
    await apiCheckRewardAvailable();
    const item = await apiGetClaimedReward();

    setAchieves(item);
  };

  return (
    <div className="min-h-[90vh] max-h-[90vh] overflow-y-auto bg-gradient-to-br">
      <div className="container px-4 sm:px-6 py-6 sm:py-8 max-w-6xl ml-6">
        <h1 className="font-vastagoRegular text-xl md:text-3xl text-left mb-4 text-white">
          Achievements
        </h1>
      </div>

      {/* Achievements Content */}
      <div className="px-3 sm:px-4 pb-4">
        {achieves.length > 0 ? (
          <div className="bg-gray-800/20 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-gray-700/30 mx-2 sm:mx-0">
            <AchievementPagination achieves={achieves} itemsPerPage={6} />
          </div>
        ) : (
          <div className="text-center py-8 sm:py-12 bg-gray-800/30 backdrop-blur-sm rounded-xl sm:rounded-2xl border border-gray-700/30 mx-2 sm:mx-0">
            <div className="w-16 h-16 sm:w-24 sm:h-24 mx-auto mb-4 sm:mb-6 bg-gray-700/50 rounded-full flex items-center justify-center">
              <svg
                className="w-8 h-8 sm:w-12 sm:h-12 text-gray-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-gray-400 mb-2 px-4">
              No Achievements Found!
            </h1>
            <p className="text-gray-500 max-w-md mx-auto px-4 text-sm sm:text-base">
              Try adjusting your search criteria or filter settings to discover
              more achievements.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AchievementPage;
