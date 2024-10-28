import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

export const fetchStockData = async (symbol: string) => {
  try {
    const response = await axios.get(
      `${process.env.BASE_URL}/v6/finance/quote?region=US&lang=en&symbols=${symbol}`,
      {
        headers: {
          "x-api-key": process.env.YF_API_KEY,
        },
      },
    );
    return response.data.quoteResponse.result[0];
  } catch (error) {
    console.error("Error fetching stock data:", error);
    throw error;
  }
};
