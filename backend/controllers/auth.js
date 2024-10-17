const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");

const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  try {
      const { email } = req.body;
      
      //check if the user with this email exists
      const existingUser = await User.findOne({ email });
      if(existingUser) {
          return res.status(StatusCodes.BAD_REQUEST).json({ error: 'User with this email already exists' });
      };
      
      const user = await User.create({ ...req.body });
      const token = user.createJWT();
      res.status(StatusCodes.CREATED).json({ user, token });
  } catch (error) {
      res.status(StatusCodes.BAD_REQUEST).json({ error: error.message });
  }
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
    user: { _id: user._id, firstName: user.firstName, lastName: user.lastName }, 
    token });
};

module.exports = {
  register,
  login,
};
