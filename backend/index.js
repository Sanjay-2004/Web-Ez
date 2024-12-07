import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

import authRouter from "./routes/Auth.js";
import userRouter from "./routes/Users.js";
import projectRouter from "./routes/Projects.js";

const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI;

mongoose
  .connect(MONGODB_URI + "/Anti-Tess")
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log(err);
  });

app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);
app.use("/api/project", projectRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
