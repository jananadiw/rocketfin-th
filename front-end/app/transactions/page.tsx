"use client";

import React, { useState } from "react";
import TickerSearch from "../components/TickerSearch";

interface TickerData {
  name: string;
  bid: number;
  ask: number;
  currentPrice: number;
  changeValue: number;
  changePercent: number;
}

const Transactions: React.FC = () => {
  const [data, setData] = useState<TickerData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSearch = async (ticker: string) => {
    setLoading(true);
    setError(null);
    setData(null);

    try {
      const response = await fetch(`http://localhost:8080/search/${ticker}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.error || "An unexpected error occurred.");
        return;
      }

      const result: TickerData = await response.json();
      setData(result);
    } catch (err) {
      console.error("Error fetching ticker data:", err);
      setError("Failed to fetch data. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-full bg-gray-100">
      <div className="my-4 p-6 bg-white shadow-md rounded">
        <h1 className="font-bold text-lg text-center mb-4">
          Search for symbols, Buy & Sell Stocks
        </h1>
        <TickerSearch onSearch={handleSearch} />
        {loading && <p className="text-center text-blue-500">Loading...</p>}
        {error && <p className="text-center text-red-500 mt-2">{error}</p>}
        {data && (
          <div className="mt-4 p-4 border rounded bg-gray-50">
            <h2 className="text-xl font-semibold">
              {data.name} ({data.name})
            </h2>
            <p className="mt-2">Bid:{data.bid}</p>
            <p className="mt-2">Ask:{data.ask}</p>
            <p className="mt-2">Current Price:{data.currentPrice}</p>
            <p className="mt-2">Change Value:{data.changeValue}</p>
            <p className="mt-2">Change Percent:{data.changePercent}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Transactions;
