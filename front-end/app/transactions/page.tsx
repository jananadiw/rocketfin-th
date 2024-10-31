"use client";

import React, { useState } from "react";
import TickerSearch from "../components/TickerSearch";
import { useTickerSearch } from "../../api/hooks/useTickerSearch";
import { useTransactionMutation } from "../../api/hooks/useTransactionMutation";
import LoadingComponent from "../components/atoms/Loading";
import ErrorComponent from "../components/atoms/Error";

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
  const [ticker, setTicker] = useState<string | null>(null);
  const [shares, setShares] = useState<number>(0);

  const {
    data: tickerData,
    isLoading: isSearching,
    error: searchError,
  } = useTickerSearch(ticker);

  const buyMutation = useTransactionMutation("buy");
  const sellMutation = useTransactionMutation("sell");

  const handleSearch = (newTicker: string) => {
    setTicker(newTicker);
    setShares(0); // Reset shares when searching new ticker
  };

  const handleTransaction = async (type: "buy" | "sell") => {
    if (!tickerData || shares <= 0) return;

    const mutation = type === "buy" ? buyMutation : sellMutation;
    try {
      await mutation.mutateAsync({
        symbol: tickerData.symbol,
        shares,
      });
      setShares(0);
    } catch (error) {
      // Error handling is managed by the mutation
      console.error(`Failed to ${type} shares:`, error);
    }
  };

  return (
    <div className="flex justify-center items-center h-full bg-gray-100">
      <div className="my-4 p-6 bg-white shadow-md rounded">
        <h1 className="font-bold text-lg text-center mb-4">
          Search for symbols, Buy & Sell Stocks
        </h1>

        <TickerSearch onSearch={handleSearch} isLoading={isSearching} />

        {searchError && <ErrorComponent message={searchError.message} />}

        {tickerData && (
          <div className="mt-4 p-4 border rounded bg-gray-50">
            <h2 className="text-xl font-semibold">
              {tickerData.name} ({tickerData.symbol})
            </h2>
            <p className="mt-2">Bid: ${tickerData.bid}</p>
            <p className="mt-2">Ask: ${tickerData.ask}</p>
            <p className="mt-2">Current Price: ${tickerData.currentPrice}</p>
            <p className="mt-2">Change Value: ${tickerData.changeValue}</p>
            <p className="mt-2">Change Percent: {tickerData.changePercent}%</p>

            <div className="mt-4">
              <input
                type="number"
                min="1"
                value={shares}
                onChange={(e) => setShares(parseInt(e.target.value) || 0)}
                className="w-full p-2 border rounded mb-4"
                placeholder="Enter number of shares"
                disabled={buyMutation.isPending || sellMutation.isPending}
              />

              <div className="flex gap-4 justify-center">
                <button
                  className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded disabled:opacity-50 disabled:cursor-not-allowed"
                  onClick={() => handleTransaction("buy")}
                  disabled={isSearching || buyMutation.isPending || shares <= 0}
                >
                  {buyMutation.isPending ? "Buying..." : "Buy"}
                </button>
                <button
                  className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded disabled:opacity-50 disabled:cursor-not-allowed"
                  onClick={() => handleTransaction("sell")}
                  disabled={
                    isSearching || sellMutation.isPending || shares <= 0
                  }
                >
                  {sellMutation.isPending ? "Selling..." : "Sell"}
                </button>
              </div>

              {(buyMutation.error || sellMutation.error) && (
                <p className="text-center mt-2 text-red-500">
                  {(buyMutation.error || sellMutation.error)?.message}
                </p>
              )}

              {(buyMutation.isSuccess || sellMutation.isSuccess) && (
                <p className="text-center mt-2 text-green-500">
                  Transaction completed successfully
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
