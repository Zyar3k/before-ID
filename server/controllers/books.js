const Book = require("../models/Book");
const { BadRequestError, NotFoundError } = require("../errors");
const { StatusCodes } = require("http-status-codes");

const getAllBooks = async (req, res) => {
  const books = await Book.find({ createdBy: req.user.userId }).sort(
    "createdAt"
  );

  res.status(StatusCodes.OK).json({ count: books.length, books });
};

const getBook = async (req, res) => {
  const {
    user: { userId },
    params: { id: bookId },
  } = req;
  const book = await Book.findOne({ _id: bookId, createdBy: userId });
  if (!book) throw new NotFoundError(`Book with id ${bookId} not found`);
  res.status(StatusCodes.OK).json({ book });
};

const createBook = async (req, res) => {
  req.body.createdBy = req.user.userId;
  const book = await Book.create(req.body);
  res.status(StatusCodes.CREATED).json({ book });
};

const updateBook = async (req, res) => {
  res.send("update book");
};

const deleteBook = async (req, res) => {
  res.send("delete book");
};

module.exports = {
  createBook,
  getAllBooks,
  getBook,
  updateBook,
  deleteBook,
};
