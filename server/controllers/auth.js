const User = require("../models/User.js");
const jwt = require("jsonwebtoken");
const { StatusCodes } = require("http-status-codes");
const bcrypt = require("bcryptjs");

const register = async (req, res) => {
  const { name, email, password } = req.body;

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const tempUser = { name, email, password: hashedPassword };

  const newUser = await User.create({ ...tempUser });
  res.status(StatusCodes.CREATED).json(newUser);
};

const login = async (req, res) => {
  res.send("login user");
};

module.exports = {
  register,
  login,
};
