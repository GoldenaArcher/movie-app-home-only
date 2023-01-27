import React, { Dispatch, FC, SetStateAction } from 'react';

interface SearchBoxProps {
  setSearchTerm: Dispatch<SetStateAction<string>>;
  searchTerm: string;
}

const SearchBox: FC<SearchBoxProps> = ({ setSearchTerm, searchTerm }) => {
  return (
    <input
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value.trim().toLowerCase())}
      type="search"
      className="block p-4 pl-10 focus:outline-none text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:border-blue-500 dark:bg-gray-700 dark:placeholder-gray-400 dark:text-white"
      placeholder="Search..."
    />
  );
};

export default SearchBox;
