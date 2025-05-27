import express from "express";
import {
  submitReview,
  updateReview,
  deleteReview,
} from "../controllers/reviewController.js";
import { authenticate } from "../middleware/authMiddleware.js";

const router = express.Router();

// Submit a review for a book (bookId in URL)
router.post("/:id", authenticate, submitReview);

// Update a review by ID
router.put("/:id", authenticate, updateReview);

// Delete a review by ID
router.delete("/:id", authenticate, deleteReview);

export default router;
