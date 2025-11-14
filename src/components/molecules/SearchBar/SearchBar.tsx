import { Search } from "lucide-react";
import React, { useCallback, useEffect, useState } from "react";
import useDebounce from "@hooks/useDebounce";

interface SearchBarProps {
  searchQuery: string;
  onSearch: (query: string) => void;
  debounceMs?: number;
}
export const SearchBar: React.FC<SearchBarProps> = ({
  searchQuery,
  onSearch,
  debounceMs = 300
}) => {
  const [value, setValue] = useState(searchQuery);
  const debounce = useDebounce();

  const debouncedSearch = useCallback(
    debounce((query: string) => {
      onSearch(query);
    }, debounceMs),
    [onSearch, debounceMs]
  );

  useEffect(() => {
    setValue(searchQuery);
  }, [searchQuery]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setValue(newValue);
    debouncedSearch(newValue);
  };

  const handleSearchClick = () => {
    onSearch(value);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onSearch(value);
    }
  };

  return (
    <div className="border-1 border-[#202432] bg-[#1f2230] rounded-lg shadow-md"
      style={{ boxShadow: '0 6px 13.2px 0 rgba(0, 0, 0, 0.25)' }}
    >
      <div className="relative flex items-center justify-center w-full px-2">
        <span
          className="cursor-pointer text-white"
          onClick={handleSearchClick}
        >
          <Search size={16} />
        </span>
        <input
          id="search"
          type="search"
          value={value}
          autoFocus={true}
          onChange={handleChange}
          onKeyPress={handleKeyPress}
          placeholder="Search in games..."
          className="max-w-[300px] bg-[#1f2230] text-white placeholder:text-gray-300 ml-2 h-10 text-sm focus:outline-none autofill:bg-[#1f2230] autofill:text-white autofill:border-none autofill:outline-none autofill:ring-0 border-none outline-none ring-0"
          style={{
            WebkitBoxShadow: '0 0 0 1000px #1f2230 inset',
            WebkitTextFillColor: 'white',
            border: 'none',
            outline: 'none',
          } as React.CSSProperties}
        />
      </div>
    </div>
  );
};
