import express from "express";
import dotenv from "dotenv";
import helmet from "helmet";
import cors from "cors";

import connectDB from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import bookRoutes from "./routes/bookRoutes.js";
import reviewRoutes from "./routes/reviewRoutes.js";

import errorMiddleware from "./middleware/errorMiddleware.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(helmet());
app.use(cors());

// Connect to MongoDB
connectDB();

// API routes
app.use("/api/auth", authRoutes);
app.use("/api/books", bookRoutes);
app.use("/api/reviews", reviewRoutes);

// Error handling middleware 
app.use(errorMiddleware);

const PORT = process.env.PORT || 5000;

app.get("/",(req,res)=>{
  res.send("Welcome to the Book Review API");
})


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
