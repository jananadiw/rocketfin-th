import { StatusCodes } from "http-status-codes";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

// fetch stock data from yahoo finance api
// TODO: resuse
const fetchStockData = async (symbol: string) => {
  try {
    const response = await axios.get(
      `${process.env.BASE_URL}/v6/finance/quote?region=US&lang=en&symbols=${symbol}`,
      {
        headers: {
          "x-api-key": process.env.YF_API_KEY,
        },
      },
    );
    console.log(response.data.quoteResponse.result[0]);
    return response.data.quoteResponse.result[0];
  } catch (error) {
    console.error("Error fetching stock data", error);
    throw error;
  }
};

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
      longName,
      bid,
      ask,
      regularMarketPrice,
      regularMarketChange,
      regularMarketChangePercent,
    } = stockData;

    res.status(StatusCodes.OK).json({
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
