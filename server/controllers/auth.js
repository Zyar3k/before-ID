const User = require("../models/User.js");
const jwt = require("jsonwebtoken");
const { StatusCodes } = require("http-status-codes");

const register = async (req, res) => {
  const newUser = await User.create({ ...req.body });
  const token = newUser.createJWT();
  res.status(StatusCodes.CREATED).json({ user: { name: newUser.name }, token });
};

const login = async (req, res) => {
  res.send("login user");
};

module.exports = {
  register,
  login,
};
