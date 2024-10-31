import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useTransactionMutation(type: "buy" | "sell") {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      symbol,
      shares,
    }: {
      symbol: string;
      shares: number;
    }) => {
      const response = await fetch(`http://localhost:8080/${type}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ symbol, shares }),
      });
      if (!response.ok) throw new Error(`Failed to ${type} shares`);
      return response.json();
    },
    onSuccess: () => {
      // Invalidate and refetch relevant queries
      queryClient.invalidateQueries({ queryKey: ["portfolio"] });
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
    },
  });
}
