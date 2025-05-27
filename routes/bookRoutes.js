import express from "express";
import {
  addBook,
  getAllBooks,
  getBookById,
  searchBooks,
} from "../controllers/bookController.js";
import { authenticate } from "../middleware/authMiddleware.js";

const router = express.Router();


// Protected: Add a new book
router.post("/", authenticate, addBook);

 // New search route
 router.get("/search", searchBooks);

// Public: Get all books
router.get("/", getAllBooks);

// Public: Get a single book by ID
router.get("/:id", getBookById);


export default router;
