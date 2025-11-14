import { TeamMember } from "@app-types/interfaces";
import { MemberBox } from "@components/organisms/MemberBox/MemberBox";
import { useEffect, useState } from "react";

interface PaginatedMembersProps {
  members: TeamMember[];
  itemsPerPage?: number; // Optional prop, defaults to 10
}

const PaginatedMembers: React.FC<PaginatedMembersProps> = ({
  members,
  itemsPerPage = 10,
}) => {
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate the total number of pages
  const totalPages = Math.ceil(members.length / itemsPerPage);

  // Get current members for the displayed page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentMembers = members.slice(indexOfFirstItem, indexOfLastItem);

  // Handle page change
  const handlePageChange = (pageNumber: number) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  // Reset to first page if members or itemsPerPage changes
  useEffect(() => {
    setCurrentPage(1);
  }, [members, itemsPerPage]);

  // Generate page numbers for navigation
  const pageNumbers = [];
  // Only show a limited range of page numbers around the current page for better UX
  const maxPageNumbersToShow = 5;
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
    <div>
      {/* Display Current Members */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
        {currentMembers.length > 0 ? (
          currentMembers.map((member) => (
            <MemberBox
              key={member.id}
              name={member.userName}
              level={member.level}
              avatar={member.avatar}
            />
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500 text-lg">
            No members to display.
          </p>
        )}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <nav className="flex justify-center items-center space-x-2 mt-8">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 border rounded-md text-white hover:bg-yellow-700 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
          >
            {"<"}
          </button>

          {startPage > 1 && (
            <>
              <button
                onClick={() => handlePageChange(1)}
                className={`px-4 py-2 border rounded-md text-white hover:bg-gray-100 shadow-sm`}
              >
                1
              </button>
              {startPage > 2 && <span className="px-2">...</span>}
            </>
          )}

          {pageNumbers.map((number) => (
            <button
              key={number}
              onClick={() => handlePageChange(number)}
              className={`px-4 py-2 border rounded-md shadow-sm ${
                currentPage === number
                  ? "bg-yellow-900 text-white font-semibold"
                  : " text-white hover:bg-yellow-700"
              }`}
            >
              {number}
            </button>
          ))}

          {endPage < totalPages && (
            <>
              {endPage < totalPages - 1 && <span className="px-2">...</span>}
              <button
                onClick={() => handlePageChange(totalPages)}
                className={`px-4 py-2 border rounded-md text-gray-700 hover:bg-gray-100 shadow-sm`}
              >
                {totalPages}
              </button>
            </>
          )}

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-4 py-2 border rounded-md text-white hover:bg-yellow-700 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
          >
            {">"}
          </button>
        </nav>
      )}
    </div>
  );
};

export default PaginatedMembers;
