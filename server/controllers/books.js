const getAllBooks = async (req, res) => {
  res.send("get all books");
};

const getBook = async (req, res) => {
  res.send("get book");
};

const createBook = async (req, res) => {
  res.json(req.user);
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
