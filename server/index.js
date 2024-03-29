import dotenv from "dotenv";
dotenv.config();
import express, { urlencoded } from "express";
import mongoose from "mongoose";
// router imports
import { userRouter } from "./src/routes/user-route.js";
import { authRouter } from "./src/routes/auth-routes.js";
import { ListingRouter } from "./src/routes/listing-router.js";
import cookieParser from "cookie-parser";
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use("/api/users", userRouter);
app.use("/api/users", authRouter);
app.use("/api/listing", ListingRouter);
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("database is connected ");
    app.listen(3000, () => {
      console.log("Server is running on port 3000");
    });
  })
  .catch((e) => {
    console.log(`something went wrong :${e}`);
  });
