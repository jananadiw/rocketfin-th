"use client";

import React from "react";
import { useParams, useRouter } from "next/navigation";
import { useTransactions } from "../../../api/hooks/useTransactions";
import LoadingComponent from "../../components/atoms/Loading";
import ErrorComponent from "../../components/atoms/Error";
import { Transaction } from "../../types/";
import Table from "../../components/Table";

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
      <Table
        columns={[
          {
            header: "Date",
            accessor: (transaction: Transaction) =>
              new Date(transaction.date).toLocaleDateString(),
          },
          {
            header: "Type",
            accessor: (transaction: Transaction) => (
              <span
                className={`px-2 py-1 rounded text-xs font-medium ${
                  transaction.operation === "buy"
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {transaction.operation.toUpperCase()}
              </span>
            ),
          },
          {
            header: "Shares",
            accessor: "shares_traded",
          },
          {
            header: "Value",
            accessor: (transaction: Transaction) =>
              `$${transaction.value.toFixed(2)}`,
          },
        ]}
        data={transactions}
      />
    </div>
  );
};

export default InstrumentDetail;
