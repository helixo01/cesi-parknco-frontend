import React from 'react';
import { FaSearch } from 'react-icons/fa';

interface SearchBarProps {
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  placeholder = 'Rechercher...',
  value,
  onChange,
}) => {
  return (
    <div className="relative w-full">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-white text-gray-800 rounded-lg pl-4 pr-12 py-3 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
        <FaSearch className="text-gray-400 text-lg" />
      </div>
    </div>
  );
};

export default SearchBar; 