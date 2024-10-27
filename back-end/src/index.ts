import http from "http";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import routes from "./routes";

import "./database";

dotenv.config();
const app = express();
const httpServer = http.createServer(app);

app.use(cors());
app.use(routes);

app.get("/", (_, res) => {
  res.send("Health check OK");
});

httpServer.listen(process.env.PORT, async () => {
  console.log(`Server started on port http://localhost:${process.env.PORT}`);
});

process.on("uncaughtException", (err) => {
  console.error(err, "Uncaught exception");
});

process.on("unhandledRejection", (reason, promise) => {
  console.error({ promise, reason }, "Unhandled Rejection at: Promise");
});
