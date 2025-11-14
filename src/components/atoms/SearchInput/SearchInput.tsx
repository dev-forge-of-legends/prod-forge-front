import { Search } from "lucide-react";

interface SearchInputProps {
  text: string;
  setText: (text: string) => void;
  className?: string;
}

export const SearchInput: React.FC<SearchInputProps> = ({ text, setText, className }) => {
  return (
    <div className={`relative ${className}`}>
      <Search size={16} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
      <input
        type="text"
        placeholder="Search"
        className="font-vastagoRegular text-white text-[18px] bg-[#160B04] px-4 pl-10 py-3 rounded-md border border-1 border-gray-600 focus:outline-none focus:ring-1 focus:ring-gray-500 focus:border-transparent w-full"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
    </div>
  )
}