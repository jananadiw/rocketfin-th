import { useQuery, QueryClientProvider } from "@tanstack/react-query";

export function usePortfolio() {
  return useQuery({
    queryKey: ["portfolio"],
    queryFn: async () => {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/portfolio`);
      if (!response.ok) throw new Error("Failed to fetch portfolio data");
      return response.json();
    },
  });
}
