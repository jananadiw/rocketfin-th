import { useQuery } from "@tanstack/react-query";

export function useTickerSearch(ticker: string | null) {
  return useQuery({
    queryKey: ["ticker", ticker],
    queryFn: async () => {
      if (!ticker) return null;
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/search/${ticker}`);
      if (!response.ok) throw new Error("Failed to fetch ticker data");
      return response.json();
    },
    enabled: !!ticker,
  });
}
