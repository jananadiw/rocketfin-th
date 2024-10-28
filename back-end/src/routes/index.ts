import express from "express";
import { searchInstrument, buyShares, sellShares } from "../controllers";

const router = express.Router();

router.get("/search/:ticker", searchInstrument);
router.post("/buy", buyShares);
router.post("/sell", sellShares);

export default router;
