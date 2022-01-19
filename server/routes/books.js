const express = require("express");
const router = express.Router();
const authenticateUser = require("../middleware/authentication");

const {
  getAllBooks,
  createBook,
  deleteBook,
  getBook,
  updateBook,
} = require("../controllers/books");

router.route("/").get(getAllBooks);
router.route("/").post(createBook);
router
  .route("/:id", authenticateUser)
  .delete(deleteBook)
  .patch(updateBook)
  .get(getBook);

module.exports = router;
