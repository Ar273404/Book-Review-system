import { validationResult } from "express-validator";

import Book from "../models/Book.js";

export const addBook = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { title, author, genre } = req.body;

    const book = new Book({ title, author, genre });
    await book.save();

    res.status(201).json(book);
  } catch (error) {
    next(error);
  }
};

export const getAllBooks = async (req, res, next) => {
  try {
    const { page = 1, limit = 10, author, genre } = req.query;

    const query = {};
    if (author) query.author = author;
    if (genre) query.genre = genre;

    // Pagination logic
    const books = await Book.find(query)
      .skip((page - 1) * limit)
      .limit(Number(limit))
      .populate("reviews", "rating comment user");   //  this line populates review details

    const totalCount = await Book.countDocuments(query);

    res.json({ totalCount, books });
  } catch (error) {
    next(error);
  }
};

export const getBookById = async (req, res, next) => {
  try {
    const book = await Book.findById(req.params.id).populate(
      "reviews",
      "rating comment user"
    );

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    // Calculate average rating
    const averageRating =
      book.reviews.length > 0
        ? book.reviews.reduce((acc, review) => acc + review.rating, 0) /
          book.reviews.length
        : 0;

    res.json({ ...book.toObject(), averageRating });
  } catch (error) {
    next(error);
  }
};

// export const searchBooks = async (req, res, next) => {
//   try {
//     const { query } = req.query;
//     if (!query) {
//       return res.status(400).json({ message: "Search query is required" });
//     }

//     const regex = new RegExp(query, "i"); // case-insensitive
//     const books = await Book.find({
//       $or: [{ title: regex }, { author: regex }],
//     });

//     res.json({ total: books.length, books });
//   } catch (error) {
//     next(error);
//   }
// };

export const searchBooks = async (req, res, next) => {
  try {
    const { query } = req.query;

    if (!query) {
      return res.status(400).json({ message: "Search query is required" });
    }

    const regex = new RegExp(query, "i"); // case-insensitive regex

    const books = await Book.find({
      $or: [
        { title: regex },
        { author: regex },
        { genre: regex }, // Now supports genre too
      ],
    });

    res.json({ total: books.length, books });
  } catch (error) {
    next(error);
  }
};
