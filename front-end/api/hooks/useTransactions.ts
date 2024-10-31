import { useQuery } from "@tanstack/react-query";

export function useTransactions(symbol?: string) {
  return useQuery({
    queryKey: ["transactions", symbol],
    queryFn: async () => {
      const url = symbol
        ? `http://localhost:8080/transactions?symbol=${symbol}`
        : "http://localhost:8080/transactions";
      const response = await fetch(url);
      if (!response.ok) throw new Error("Failed to fetch transaction data");
      return response.json();
    },
  });
}
