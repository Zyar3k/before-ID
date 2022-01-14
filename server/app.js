require("dotenv").config();
require("express-async-errors");
const express = require("express");
const app = express();
const PORT = process.env.PORT || 8888;

// connect to the database
const connectDB = require("./db/connect");
// authenticate the user
// const authenticateUser = require("./middleware/authentication");

// routes
const authRouter = require("./routes/auth");
const booksRouter = require("./routes/books");

// error handler
const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");

app.use(express.json());
// extra packages

// routes
app.get("/", (req, res) => {
  res.send("books api");
});

app.use("/api/auth", authRouter);
// app.use("/api/books", authenticateUser, booksRouter);
app.use("/api/books", booksRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(PORT, () =>
      console.log(`Server is listening on port ${PORT}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
