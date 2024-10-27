import React, { useState } from "react";

interface TickerSearchProps {
  onSearch: (ticker: string) => void;
}

const TickerSearch: React.FC<TickerSearchProps> = ({ onSearch }) => {
  const [ticker, setTicker] = useState("");

  const handleSearch = () => {
    if (ticker.trim() !== "") {
      onSearch(ticker.trim());
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="flex justify-center m-4">
      <input
        type="search"
        className="w-full px-4 py-2 mx-2 text-gray-700 border border-gray-700 rounded focus:outline-none focus:ring-0"
        placeholder="ex: AAPL"
        value={ticker}
        onChange={(e) => setTicker(e.target.value)}
        onKeyPress={handleKeyPress}
      />
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={handleSearch}
      >
        Search
      </button>
    </div>
  );
};

export default TickerSearch;
