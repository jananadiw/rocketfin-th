"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { usePortfolio } from "../../api/hooks/usePortfolio";
import Table, { Column } from "../components/Table";
import ErrorComponent from "../components/atoms/Error";
import LoadingComponent from "../components/atoms/Loading";
import { PortfolioData } from "../types";

const Portfolio: React.FC = () => {
  const router = useRouter();
  const { data: portfolioData, isLoading, error } = usePortfolio();

  if (isLoading) return <LoadingComponent />;
  if (error) return <ErrorComponent message={error.message} />;

  const positions: PortfolioData[] = portfolioData?.positions || [];

  const columns: Column<PortfolioData>[] = [
    {
      header: "Symbol",
      accessor: "symbol",
      className: "font-medium text-blue-600",
    },
    {
      header: "Shares",
      accessor: "totalShares",
    },
    {
      header: "Cost Basis",
      accessor: (position: PortfolioData) =>
        `$${position.cost_basis.toFixed(2)}`,
    },
    {
      header: "Market Value",
      accessor: (position: PortfolioData) =>
        `$${position.market_value.toFixed(2)}`,
    },
    {
      header: "Return Rate",
      accessor: (position: PortfolioData) => (
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
      accessor: (position: PortfolioData) => (
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

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-center mb-8">
        Portfolio & Holdings
      </h1>
      <Table
        columns={columns}
        data={positions}
        onRowClick={(position) => router.push(`/portfolio/${position.symbol}`)}
      />
    </div>
  );
};

export default Portfolio;
