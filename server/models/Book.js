const mongoose = require("mongoose");

const BookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please add a title"],
      minlength: [3, "Title must be at least 3 characters"],
      maxlength: [50, "Title must be less than 50 characters"],
    },
    author: {
      name: {
        type: String,
        minlength: [3, "Author must be at least 3 characters"],
        maxlength: [50, "Author must be less than 50 characters"],
      },
      lastName: {
        type: String,
        required: [true, "Please add an author"],
        minlength: [3, "Author must be at least 3 characters"],
        maxlength: [50, "Author must be less than 50 characters"],
      },
    },
    list: [
      {
        type: String,
        required: [true, "Please add a list"],
        minlength: [3, "List must be at least 3 characters"],
        maxlength: [10, "List must be less than 10 characters"],
      },
    ],
    readed: {
      type: Boolean,
      default: false,
    },
    available: {
      type: Boolean,
      default: false,
    },
    link: {
      type: String,
      required: [true, "Please add a link"],
    },
    page: {
      type: Number,
      required: [true, "Please add a page"],
    },
    desc: {
      type: String,
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "Please provide user"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Book", BookSchema);

/**
 "title":"2049",
 "author":{"name":"Rafał","lastName":"Cichowski"},
 "list":["fans"],
 "readed":false,
 "available":false,
 "link":"https://lubimyczytac.pl/ksiazka/247824/2049",
 "page":284,
 "desc":""
 */
