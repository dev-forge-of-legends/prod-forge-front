export const PagePagination = ({ currentPage, totalPages, onPageChange }: {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}) => {
  const handlePageChange = (page: number) => {
    if (page !== currentPage && page > 0 && page <= totalPages) {
      onPageChange(page);
    }
  };

  return (
    <div className="flex items-center justify-center mt-4">
      <button
        className="px-3 py-1 bg-gray-200 rounded-l hover:bg-gray-300"
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Previous
      </button>
      <span className="mx-2">
        Page {currentPage} of {totalPages}
      </span>
      <button
        className="px-3 py-1 bg-gray-200 rounded-r hover:bg-gray-300"
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  );
}
