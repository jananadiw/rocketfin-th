"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { usePortfolio } from "../../api/hooks/usePortfolio";
import ErrorComponent from "../components/atoms/Error";
import LoadingComponent from "../components/atoms/Loading";
import { PortfolioData } from "../types/";

const Portfolio: React.FC = () => {
  const router = useRouter();
  const { data: portfolioData, isLoading, error } = usePortfolio();

  if (isLoading) return <LoadingComponent />;
  if (error) return <ErrorComponent message={error.message} />;

  const positions: PortfolioData[] = portfolioData?.positions || [];

  const handlePositionClick = (symbol: string) => {
    router.push(`/portfolio/${symbol}`);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-center mb-8">
        Portfolio & Holdings
      </h1>

      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Symbol
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Shares
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
            {positions.map((position) => (
              <tr
                key={position.symbol}
                onClick={() => handlePositionClick(position.symbol)}
                className="hover:bg-gray-50 cursor-pointer transition-colors duration-150"
              >
                <td className="px-6 py-4 whitespace-nowrap font-medium text-blue-600">
                  {position.symbol}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {position.totalShares}
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
  );
};

export default Portfolio;
