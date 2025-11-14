import { useState } from "react";

interface PaginationProps {
  setPage: React.Dispatch<React.SetStateAction<number>>;
  page: number;
  totalItems: number;
  limit: number;
  setLimit: React.Dispatch<React.SetStateAction<number>>;
}

export const Pagination = ({
  setPage,
  page,
  totalItems,
  limit,
  setLimit,
}: PaginationProps) => {
  const totalPages = Math.ceil(totalItems / limit);
  const [goToValue, setGoToValue] = useState<number | "">("");

  const handleLimitChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLimit(Number(e.target.value));
    setPage(1); // reset to page 1 when limit changes
  };

  const handleGoToPage = () => {
    if (typeof goToValue === "number" && goToValue >= 1 && goToValue <= totalPages) {
      setPage(goToValue);
    }
  };

  return (
    <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-4 text-white">
      {/* Prev / Next Controls */}
      <div className="flex gap-2 flex-wrap items-center">
        <button
          onClick={() => setPage(1)}
          disabled={page === 1}
          className="px-3 py-2 bg-primary-yellow text-primary-dark rounded disabled:opacity-50"
        >
          « First
        </button>

        <button
          onClick={() => setPage((p) => Math.max(p - 1, 1))}
          disabled={page === 1}
          className="px-3 py-2 bg-primary-yellow text-primary-dark rounded disabled:opacity-50"
        >
          Prev
        </button>

        <span className="px-4 py-2 bg-zinc-800 rounded">
          Page {page} of {totalPages}
        </span>

        <button
          onClick={() => setPage((p) => (p < totalPages ? p + 1 : p))}
          disabled={page >= totalPages}
          className="px-3 py-2 bg-primary-yellow text-primary-dark rounded disabled:opacity-50"
        >
          Next
        </button>

        <button
          onClick={() => setPage(totalPages)}
          disabled={page >= totalPages}
          className="px-3 py-2 bg-primary-yellow text-primary-dark rounded disabled:opacity-50"
        >
          Last »
        </button>
      </div>

      {/* Go to Page */}
      <div className="flex items-center gap-2">
        <label htmlFor="goto" className="text-sm text-gray-300">
          Go to page:
        </label>
        <input
          id="goto"          
          min={1}
          max={totalPages}
          value={goToValue}
          onChange={(e) =>
            setGoToValue(Number(e.target.value) <= totalPages ? Number(e.target.value) : "")
          }
          className="w-16 px-2 py-1 bg-black text-white rounded"
        />
        <button
          onClick={handleGoToPage}
          className="px-3 py-1 bg-primary-yellow text-primary-dark rounded"
        >
          Go
        </button>
      </div>

      {/* Records per page */}
      <div className="flex items-center gap-2">
        <label htmlFor="records" className="text-sm text-gray-300">
          Records per page:
        </label>
        <select
          id="records"
          value={limit}
          onChange={handleLimitChange}
          className="px-3 py-1 bg-black text-white rounded"
        >
          {[10, 25, 50, 100].map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};
