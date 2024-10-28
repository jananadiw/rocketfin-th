import db from "../../database/models";
import { fetchStockData } from "../../utils/fetchStockData";
import { StatusCodes } from "http-status-codes";

export const buyShares = async (req, res) => {
  console.log("Request body:", req.body);
  const { symbol, shares } = req.body;

  if (!symbol || !shares) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ error: "Symbol and shares are required." });
  }

  try {
    // Fetch the latest price data for the symbol
    const stockData = await fetchStockData(symbol);
    const price = stockData.regularMarketPrice;

    // Record the transaction
    const transaction = await db.transaction.create({
      symbol,
      shares,
      price,
      transactionType: "buy",
      date: new Date(),
    });

    // Update the portfolio
    const existingPortfolio = await db.portfolio.findOne({ symbol });
    if (existingPortfolio) {
      existingPortfolio.totalShares += shares;
      existingPortfolio.costBasis += shares * price;
    } else {
      await db.portfolio.create({
        symbol,
        totalShares: shares,
        costBasis: shares * price,
        marketValue: shares * price,
        unrealizedProfitLoss: 0,
        unrealizedReturnRate: 0,
      });
    }

    await existingPortfolio?.save();
    res
      .status(StatusCodes.CREATED)
      .json({ message: "Shares purchased successfully", transaction });
  } catch (error) {
    console.error(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Failed to purchase shares" });
  }
};

export const sellShares = async (req, res) => {
  const { symbol, shares } = req.body;

  try {
    const stockData = await fetchStockData(symbol);
    const price = stockData.regularMarketPrice;

    const transaction = await db.transaction.create({
      symbol,
      shares,
      price,
      transactionType: "sell",
      date: new Date(),
    });

    const portfolio = await db.portfolio.findOne({ symbol });
    if (!portfolio || portfolio.totalShares < shares) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: "Insufficient shares to sell" });
    }

    portfolio.totalShares -= shares;
    portfolio.costBasis -= shares * price;

    if (portfolio.totalShares === 0) {
      await db.portfolio.deleteOne({ symbol });
    } else {
      await portfolio.save();
    }

    res
      .status(StatusCodes.CREATED)
      .json({ message: "Shares sold successfully", transaction });
  } catch (error) {
    console.error(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Failed to sell shares" });
  }
};
