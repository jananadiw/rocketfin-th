import { StatusCodes } from "http-status-codes";
import db from "../../database/models";
import { fetchStockData } from "../../utils/fetchStockData";

export const getPortfolio = async (req, res) => {
  const { symbol } = req.query;

  try {
    const query = symbol ? { symbol } : {};
    const portfolioItems = await db.portfolio.find(query);

    const positions = await Promise.all(
      portfolioItems.map(async (item) => {
        const stockData = await fetchStockData(item.symbol);
        const currentPrice = stockData.regularMarketPrice;
        const marketValue = currentPrice * item.totalShares;
        const unrealizedProfitLoss = marketValue - item.costBasis;
        const unrealizedReturnRate =
          (unrealizedProfitLoss / item.costBasis) * 100;

        return {
          symbol: item.symbol,
          cost_basis: Number(item.costBasis.toFixed(2)),
          market_value: Number(marketValue.toFixed(2)),
          unrealized_return_rate: Number(unrealizedReturnRate.toFixed(2)),
          unrealized_profit_loss: Number(unrealizedProfitLoss.toFixed(2)),
        };
      }),
    );

    res.status(StatusCodes.OK).json({ positions });
  } catch (error) {
    console.error("Error fetching portfolio data", Error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Failed to fetch portfolio data" });
  }
};
