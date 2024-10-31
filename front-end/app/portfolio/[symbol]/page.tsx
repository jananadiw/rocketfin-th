"use client";

import React from "react";
import { useParams, useRouter } from "next/navigation";
import { useTransactions } from "../../../api/hooks/useTransactions";
import LoadingComponent from "../../components/atoms/Loading";
import ErrorComponent from "../../components/atoms/Error";
import { Transaction } from "../../types/";

const InstrumentDetail: React.FC = () => {
  const params = useParams();
  const router = useRouter();
  const { data, isLoading, error } = useTransactions(params.symbol as string);

  const transactions: Transaction[] = data || [];

  if (isLoading) return <LoadingComponent />;
  if (error) return <ErrorComponent message={error.message} />;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center mb-8">
        <button
          onClick={() => router.back()}
          className="mr-4 px-4 py-2 text-sm text-blue-600 hover:text-blue-800"
        >
          ← Back to Portfolio
        </button>
        <h1 className="text-2xl font-bold">
          Transaction History: {params.symbol}
        </h1>
      </div>

      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Type
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Shares
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Value
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {transactions.map((transaction, index) => (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-nowrap">
                  {new Date(transaction.date).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 py-1 rounded text-xs font-medium ${
                      transaction.operation === "buy"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {transaction.operation.toUpperCase()}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {transaction.shares_traded}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  ${transaction.value.toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InstrumentDetail;
