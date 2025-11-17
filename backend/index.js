import express from "express";
import dotenv from "dotenv";
import connectDb from "./config/db.js";
dotenv.config();
const app = express();
const port = process.env.PORT || 5000; // port = port number

app.listen(port, () => {
  connectDb();
  console.log(`Server Started at ${port}`);
});
