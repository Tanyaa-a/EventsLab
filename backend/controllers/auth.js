const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, UnauthenticatedError } = require("../errors");


const register = async (req, res) => {
  try {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new BadRequestError("User with this email already exists");
    }

    const user = await User.create({ ...req.body });

    const token = user.createJWT();

    return res.status(StatusCodes.CREATED).json({
      user: { _id: user._id, firstName: user.firstName, lastName: user.lastName, email: user.email },
      token,
    });
  } catch (error) {
    return res
      .status(error.statusCode || StatusCodes.BAD_REQUEST)
      .json({ error: error.message || "An error occurred during registration" });
  }
};


const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new BadRequestError("Please provide both email and password");
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      throw new UnauthenticatedError("Invalid credentials");
    }

    const isPasswordCorrect = await user.comparePassword(password);
    if (!isPasswordCorrect) {
      throw new UnauthenticatedError("Invalid credentials");
    }

    const token = user.createJWT();

    return res.status(StatusCodes.OK).json({
      user: { _id: user._id, firstName: user.firstName, lastName: user.lastName },
      token,
    });
  } catch (error) {
    return res
      .status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.message || "An error occurred during login" });
  }
};
const logout = async (req, res) => {
  res.status(StatusCodes.OK).json({ message: "User logged out successfully" });
};

module.exports = {
  register,
  login,
  logout,
};

