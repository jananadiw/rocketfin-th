import { StatusCodes } from "http-status-codes";
import { fetchStockData } from "../../utils/fetchStockData";
import dotenv from "dotenv";

dotenv.config();

// controller for /search/:ticker endpoint
export const searchInstrument = async (req, res) => {
  const { ticker } = req.params;

  try {
    const stockData = await fetchStockData(ticker);

    if (!stockData) {
      return res.status(StatusCodes.NOT_FOUND).json({
        message: "Instrument not found",
      });
    }
    const {
      symbol,
      longName,
      bid,
      ask,
      regularMarketPrice,
      regularMarketChange,
      regularMarketChangePercent,
    } = stockData;

    res.status(StatusCodes.OK).json({
      symbol: symbol,
      name: longName,
      bid,
      ask,
      currentPrice: regularMarketPrice,
      changeValue: regularMarketChange,
      changePercent: regularMarketChangePercent,
    });
  } catch (error) {
    console.error("Error searching instrument", error);
  }
};
