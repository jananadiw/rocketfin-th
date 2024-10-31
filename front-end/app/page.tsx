"use client";

import React from "react";
import { usePortfolio } from "../api/hooks/usePortfolio";
import { useTransactions } from "../api/hooks/useTransactions";
import LoadingComponent from "./components/atoms/Loading";
import ErrorComponent from "./components/atoms/Error";
import Table from "./components/Table";
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

  const portfolioColumns = [
    {
      header: "Symbol",
      accessor: "symbol",
    },
    {
      header: "Cost Basis",
      accessor: (position: Position) => `$${position.cost_basis.toFixed(2)}`,
    },
    {
      header: "Market Value",
      accessor: (position: Position) => `$${position.market_value.toFixed(2)}`,
    },
    {
      header: "Return Rate",
      accessor: (position: Position) => (
        <span
          className={
            position.unrealized_return_rate >= 0
              ? "text-green-500"
              : "text-red-500"
          }
        >
          {position.unrealized_return_rate.toFixed(2)}%
        </span>
      ),
    },
    {
      header: "P/L",
      accessor: (position: Position) => (
        <span
          className={
            position.unrealized_profit_loss >= 0
              ? "text-green-500"
              : "text-red-500"
          }
        >
          ${position.unrealized_profit_loss.toFixed(2)}
        </span>
      ),
    },
  ];

  const transactionColumns = [
    {
      header: "Instrument",
      accessor: "instrument_name",
    },
    {
      header: "Shares",
      accessor: (position: Transaction) => `${position.shares_traded}`,
    },
    {
      header: "Operation",
      accessor: (transaction: Transaction) => (
        <span
          className={
            transaction.operation === "buy" ? "text-green-500" : "text-red-500"
          }
        >
          {transaction.operation.toUpperCase()}
        </span>
      ),
    },
    {
      header: "Value",
      accessor: (transaction: Transaction) =>
        `$${transaction.value.toFixed(2)}`,
    },
    {
      header: "Date",
      accessor: (transaction: Transaction) =>
        new Date(transaction.date).toLocaleDateString(),
    },
  ];

  return (
    <div className="flex flex-col items-center h-full bg-gray-100 p-4">
      {/* Portfolio Section */}
      <div className="w-full max-w-4xl my-4 p-6 bg-white shadow-md rounded">
        <h1 className="font-bold text-xl text-center mb-6">
          Current Portfolio Status
        </h1>
        <Table columns={portfolioColumns} data={positions} />
      </div>

      {/* Recent Transactions Section */}
      <div className="w-full max-w-4xl my-4 p-6 bg-white shadow-md rounded">
        <h2 className="font-bold text-xl text-center mb-6">
          Recent Transactions
        </h2>
        <Table columns={transactionColumns} data={transactions} />
      </div>
    </div>
  );
};

export default Home;
