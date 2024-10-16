const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");

const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  const user = await User.create({ ...req.body });

  const token = user.createJWT();
  res.status(StatusCodes.CREATED).json({ firstName: user.firstName, lastName: user.lastName, token });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new BadRequestError("Please provide both email and password");
  }
  const user = await User.findOne({ email });
  if (!user) {
    throw new UnauthenticatedError("Please provide credentials");
  }
    
  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new UnauthenticatedError("Invalid credentials");
  }
  const token = user.createJWT();
  res.status(StatusCodes.OK).json({ 
    user: { firstName: user.firstName, lastName: user.lastName }, 
    token });
};

module.exports = {
  register,
  login,
};
