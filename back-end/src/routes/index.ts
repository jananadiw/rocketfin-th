import express from "express";
import { searchInstrument } from "../controllers";

const router = express.Router();

router.get("/search/:ticker", searchInstrument);

export default router;
