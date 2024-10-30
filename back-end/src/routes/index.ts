import express from "express";
import {
  searchInstrument,
  buyShares,
  sellShares,
  getTransactions,
} from "../controllers";

const router = express.Router();

router.get("/search/:ticker", searchInstrument);
router.post("/buy", buyShares);
router.post("/sell", sellShares);
router.get("/transactions", getTransactions);

export default router;
