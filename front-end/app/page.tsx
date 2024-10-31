"use client";

import React from "react";
import { usePortfolio } from "../api/hooks/usePortfolio";
import { useTransactions } from "../api/hooks/useTransactions";
import LoadingComponent from "./components/atoms/Loading";
import ErrorComponent from "./components/atoms/Error";
import { Position, Transaction } from "./types/";

const Home: React.FC = () => {
  const {
    data: portfolioData,
    isLoading: portfolioLoading,
    error: portfolioError,
  } = usePortfolio();
  const {
    data: transactionsData,
    isLoading: transactionsLoading,
    error: transactionsError,
  } = useTransactions();

  if (portfolioLoading || transactionsLoading) return <LoadingComponent />;
  if (portfolioError || transactionsError)
    return (
      <ErrorComponent
        message={
          (portfolioError || transactionsError)?.message ||
          "Failed to fetch data"
        }
      />
    );

  const positions: Position[] = portfolioData?.positions || [];
  const transactions: Transaction[] = (transactionsData || []).slice(0, 5);

  return (
    <div className="flex flex-col items-center h-full bg-gray-100 p-4">
      {/* Portfolio Section */}
      <div className="w-full max-w-4xl my-4 p-6 bg-white shadow-md rounded">
        <h1 className="font-bold text-xl text-center mb-6">
          Current Portfolio Status
        </h1>
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Symbol
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Cost Basis
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Market Value
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Return Rate
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  P/L
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {positions.map((position, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {position.symbol}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    ${position.cost_basis.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    ${position.market_value.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={
                        position.unrealized_return_rate >= 0
                          ? "text-green-500"
                          : "text-red-500"
                      }
                    >
                      {position.unrealized_return_rate.toFixed(2)}%
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={
                        position.unrealized_profit_loss >= 0
                          ? "text-green-500"
                          : "text-red-500"
                      }
                    >
                      ${position.unrealized_profit_loss.toFixed(2)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Recent Transactions Section */}
      <div className="w-full max-w-4xl my-4 p-6 bg-white shadow-md rounded">
        <h2 className="font-bold text-xl text-center mb-6">
          Recent Transactions
        </h2>
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Instrument
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Shares
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Operation
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Value
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {transactions.map((transaction, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {transaction.instrument_name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {transaction.shares_traded}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={
                        transaction.operation === "buy"
                          ? "text-green-500"
                          : "text-red-500"
                      }
                    >
                      {transaction.operation.toUpperCase()}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    ${transaction.value.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {new Date(transaction.date).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Home;
