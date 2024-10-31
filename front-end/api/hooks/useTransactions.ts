import { useQuery } from "@tanstack/react-query";

export function useTransactions(symbol?: string) {
  return useQuery({
    queryKey: ["transactions", symbol],
    queryFn: async () => {
      const url = symbol
        ? `${process.env.NEXT_PUBLIC_API_URL}/transactions?symbol=${symbol}`
        : `${process.env.NEXT_PUBLIC_API_URL}/transactions`;
      const response = await fetch(url);
      if (!response.ok) throw new Error("Failed to fetch transaction data");
      return response.json();
    },
  });
}
