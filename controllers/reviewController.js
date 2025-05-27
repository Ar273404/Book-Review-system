import { validationResult } from "express-validator";

import Review from "../models/Review.js";
import Book from "../models/Book.js";

export const submitReview = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { rating, comment } = req.body;

    // Check if user already reviewed this book
    const existingReview = await Review.findOne({
      book: req.params.id,
      user: req.user.id,
    });
    if (existingReview) {
      return res
        .status(400)
        .json({ message: "You have already reviewed this book" });
    }

    const review = new Review({
      book: req.params.id,
      user: req.user.id,
      rating,
      comment,
    });
    await review.save();

    await Book.findByIdAndUpdate(req.params.id, {
      $push: { reviews: review._id },
    });

    res.status(201).json(review);
  } catch (error) {
    next(error);
  }
};

export const updateReview = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const review = await Review.findById(req.params.id);
    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }
    if (review.user.toString() !== req.user.id) {
      return res.status(403).json({ message: "Forbidden" });
    }

    review.rating = req.body.rating ?? review.rating;
    review.comment = req.body.comment ?? review.comment;

    await review.save();

    res.json(review);
  } catch (error) {
    next(error);
  }
};

export const deleteReview = async (req, res, next) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }
    if (review.user.toString() !== req.user.id) {
      return res.status(403).json({ message: "Forbidden" });
    }

    await review.remove();

    res.json({ message: "Review deleted successfully" });
  } catch (error) {
    next(error);
  }
};

// getReviewByBook FUNCTION 