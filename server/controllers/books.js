const Book = require("../models/Book");
const { BadRequestError, NotFoundError } = require("../errors");
const { StatusCodes } = require("http-status-codes");

const getAllBooks = async (req, res) => {
  // const books = await Book.find({ createdBy: req.user.userId }).sort(
  //   "createdAt"
  // );
  const books = await Book.find().sort("createdAt");

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
  const {
    body: { title, author, list, readed, available, link, page, desc },
    user: { userId },
    params: { id: bookId },
  } = req;
  if (!title && !author && !list && !readed && !available && !link && !page)
    throw new BadRequestError("Please provide at least one field to update");

  const book = await Book.findOneAndUpdate(
    { _id: bookId, createdBy: userId },
    req.body,
    { new: true, runValidators: true }
  );
  if (!book) throw new NotFoundError(`Book with id ${bookId} not found`);
  res.status(StatusCodes.OK).json({ book });
};

const deleteBook = async (req, res) => {
  const {
    user: { userId },
    params: { id: bookId },
  } = req;
  const book = await Book.findOneAndDelete({ _id: bookId, createdBy: userId });
  if (!book) throw new NotFoundError(`Book with id ${bookId} not found`);
  res.status(StatusCodes.OK).send("Book deleted successfully");
};

module.exports = {
  createBook,
  getAllBooks,
  getBook,
  updateBook,
  deleteBook,
};
