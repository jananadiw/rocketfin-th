import mongoose from "mongoose";
import dotenv from "dotenv";

// Enabling strict mode for queries to ensure that only the fields that exist in the schema are queried.
mongoose.set("strictQuery", true);

dotenv.config();

mongoose
  .connect(process.env.MONGODB_URI, {
    connectTimeoutMS: 10000,
    socketTimeoutMS: 60000,
  })
  .then(() => {
    console.log("Connection to DB successful");
  })
  .catch((error) => {
    console.log(process.env.MONGODB_URI);
    console.error(error);
    process.exit(1);
  });
