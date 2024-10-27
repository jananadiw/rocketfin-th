import mongoose from "mongoose";

const schema = new mongoose.Schema({
  symbol: {
    type: String,
    required: true,
    unique: true,
  },
  totalShares: {
    type: Number,
    required: true,
  },
  costBasis: {
    type: Number,
    required: true,
  },
  marketValue: {
    type: Number,
    required: true,
  },
  unrealizedProfitLoss: {
    type: Number,
    required: true,
  },
  unrealizedReturnRate: {
    type: Number,
    required: true,
  },
});

export default mongoose.model("portfolio", schema);
