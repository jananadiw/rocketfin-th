import React, { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";

interface TickerSearchProps {
  onSearch: (ticker: string) => void;
  isLoading?: boolean;
}

const TickerSearch: React.FC<TickerSearchProps> = ({
  onSearch,
  isLoading = false,
}) => {
  const [ticker, setTicker] = useState("");
  const queryClient = useQueryClient();

  const handleSearch = () => {
    const trimmedTicker = ticker.trim().toUpperCase();
    if (trimmedTicker !== "") {
      // Prefetch the ticker data
      queryClient.prefetchQuery({
        queryKey: ["ticker", trimmedTicker],
        queryFn: async () => {
          const response = await fetch(
            `http://localhost:8080/search/${trimmedTicker}`,
          );
          if (!response.ok) throw new Error("Failed to fetch ticker data");
          return response.json();
        },
      });

      onSearch(trimmedTicker);
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
        disabled={isLoading}
      />
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50 disabled:cursor-not-allowed"
        onClick={handleSearch}
        disabled={isLoading || !ticker.trim()}
      >
        {isLoading ? (
          <div className="flex items-center">
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
            Searching...
          </div>
        ) : (
          "Search"
        )}
      </button>
    </div>
  );
};

export default TickerSearch;
