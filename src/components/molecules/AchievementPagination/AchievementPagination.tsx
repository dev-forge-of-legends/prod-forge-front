import { AchieveItem } from "@app-types/interfaces";
import { AchieveBox } from "@components/organisms";
import { useEffect, useState } from "react";

interface AchievementPaginationProps {
  achieves: AchieveItem[];
  itemsPerPage?: number;
}

const AchievementPagination: React.FC<AchievementPaginationProps> = ({
  achieves,
  itemsPerPage = 6,
}) => {
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate the total number of pages
  const totalPages = Math.ceil(achieves.length / itemsPerPage);

  // Get current members for the displayed page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentAchieves = achieves.slice(indexOfFirstItem, indexOfLastItem);

  // Handle page change
  const handlePageChange = (pageNumber: number) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  // Reset to first page if members or itemsPerPage changes
  useEffect(() => {
    setCurrentPage(1);
  }, [achieves, itemsPerPage]);

  // Generate page numbers for navigation
  const pageNumbers = [];
  const maxPageNumbersToShow = window.innerWidth < 768 ? 3 : 5;
  let startPage = Math.max(
    1,
    currentPage - Math.floor(maxPageNumbersToShow / 2)
  );
  const endPage = Math.min(totalPages, startPage + maxPageNumbersToShow - 1);

  // Adjust startPage if we're at the end of the total pages
  if (
    endPage - startPage + 1 < maxPageNumbersToShow &&
    totalPages > maxPageNumbersToShow
  ) {
    startPage = Math.max(1, endPage - maxPageNumbersToShow + 1);
  }

  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="p-2 sm:p-4">
      {/* Display Current Members */}
      <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
        {currentAchieves.length > 0 ? (
          currentAchieves.map((achieve) => (
            <AchieveBox
              key={achieve._id}
              id={achieve._id}
              icon={achieve.avatar}
              title={achieve.description}
              winCount={achieve.winCount}
              status={achieve.isAchieved}
              xp={achieve.priceXp}
              coin={achieve.priceCoin}
            />
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500 text-base sm:text-lg py-4">
            No Achievements to display.
          </p>
        )}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <nav className="flex justify-center items-center space-x-1 sm:space-x-2 mt-6 sm:mt-8">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-3 py-2 sm:px-4 sm:py-2 border rounded-md text-white hover:bg-yellow-700 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm text-sm sm:text-base"
          >
            {"<"}
          </button>

          {startPage > 1 && (
            <>
              <button
                onClick={() => handlePageChange(1)}
                className={`px-3 py-2 sm:px-4 sm:py-2 border rounded-md text-white hover:bg-yellow-700 shadow-sm text-sm sm:text-base`}
              >
                1
              </button>
              {startPage > 2 && (
                <span className="px-1 sm:px-2 text-white">...</span>
              )}
            </>
          )}

          {pageNumbers.map((number) => (
            <button
              key={number}
              onClick={() => handlePageChange(number)}
              className={`px-3 py-2 sm:px-4 sm:py-2 border rounded-md shadow-sm text-sm sm:text-base ${
                currentPage === number
                  ? "bg-yellow-900 text-white font-semibold"
                  : "text-white hover:bg-yellow-700"
              }`}
            >
              {number}
            </button>
          ))}

          {endPage < totalPages && (
            <>
              {endPage < totalPages - 1 && (
                <span className="px-1 sm:px-2 text-white">...</span>
              )}
              <button
                onClick={() => handlePageChange(totalPages)}
                className={`px-3 py-2 sm:px-4 sm:py-2 border rounded-md text-white hover:bg-yellow-700 shadow-sm text-sm sm:text-base`}
              >
                {totalPages}
              </button>
            </>
          )}

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-3 py-2 sm:px-4 sm:py-2 border rounded-md text-white hover:bg-yellow-700 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm text-sm sm:text-base"
          >
            {">"}
          </button>
        </nav>
      )}
    </div>
  );
};

export default AchievementPagination;
