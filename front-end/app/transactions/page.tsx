"use client";

import React, { useState } from "react";
import TickerSearch from "../components/TickerSearch";

interface TickerData {
  symbol: string;
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
  const [shares, setShares] = useState<number>(0);
  const [transactionStatus, setTransactionStatus] = useState<string>("");

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

  const handleTransaction = async (type: "buy" | "sell") => {
    if (!data || shares <= 0) {
      setTransactionStatus("Please enter a valid number of shares");
      return;
    }

    try {
      const response = await fetch(`http://localhost:8080/${type}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          symbol: data.symbol,
          shares: shares,
        }),
      });
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || `Failed to ${type} shares`);
      }

      setTransactionStatus(
        `Successfully ${type === "buy" ? "bought" : "sold"} ${shares} shares`,
      );
      setShares(0); // Reset shares input after successful transaction
    } catch (err) {
      console.error(`Error ${type}ing shares:`, err);
      setTransactionStatus(
        err instanceof Error ? err.message : `Failed to ${type} shares`,
      );
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

            <div className="mt-4">
              <input
                type="number"
                min="1"
                value={shares}
                onChange={(e) => setShares(parseInt(e.target.value) || 0)}
                className="w-full p-2 border rounded mb-4"
                placeholder="Enter number of shares"
              />

              <div className="flex gap-4 justify-center">
                <button
                  className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded disabled:opacity-50 disabled:cursor-not-allowed"
                  onClick={() => handleTransaction("buy")}
                  disabled={loading || !!error || shares <= 0}
                >
                  Buy
                </button>
                <button
                  className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded disabled:opacity-50 disabled:cursor-not-allowed"
                  onClick={() => handleTransaction("sell")}
                  disabled={loading || !!error || shares <= 0}
                >
                  Sell
                </button>
              </div>

              {transactionStatus && (
                <p
                  className={`text-center mt-2 ${
                    transactionStatus.includes("Successfully")
                      ? "text-green-500"
                      : "text-red-500"
                  }`}
                >
                  {transactionStatus}
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Transactions;
