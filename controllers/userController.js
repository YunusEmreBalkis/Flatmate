const User = require("../models/User");
const CustomError = require("../errors");
const { StatusCodes } = require("http-status-codes");
const {
  attachCookiesToResponse,
  createtokenUser,
  checkPermissions,
  assetCheck
} = require("../utils");

const getAllUsers = async (req, res) => {
  const users = await User.find({  }).select("-password");
  res.status(StatusCodes.OK).json({ users });
};

const getSingleUser = async (req, res) => {
  const user = await User.findOne({ _id: req.params.id }).select("-password");

  assetCheck(user,req.params.id,"user")
  checkPermissions(req.user, user._id);
  res.status(StatusCodes.OK).json({ user });
};

const showCurrentUser = async (req, res) => {
  res.status(StatusCodes.OK).json({ user: req.user });
};

const updateUser = async (req, res) => {
  const { name, email } = req.body;
  if (!email || !name) {
    throw new CustomError.BadRequestError(
      "Please provide a valid email and name"
    );
  }

  const user = await User.findOne({ _id: req.user.userId });
  assetCheck(user,req.user.userId ,"user")
  user.email = email;
  user.name = name;

  await user.save();
  const tokenUser = createtokenUser(user);
  attachCookiesToResponse({ res, user: tokenUser });
  res.status(StatusCodes.OK).json({ user: tokenUser });
};

const updateUserPassword = async (req, res) => {
  const { newPassword, oldPassword } = req.body;
  if (!newPassword || !oldPassword) {
    throw new CustomError.BadRequestError("Please provide both values");
  }

  const user = await User.findOne({ _id: req.user.userId });
  assetCheck(user,req.user.userId ,"user")
  const isPasswordCorrect = await user.comparePassword(oldPassword);

  if (!isPasswordCorrect) {
    throw new CustomError.UnauthenticatedError("Invalid Credentials");
  }

  user.password = newPassword;
  await user.save();

  res.status(StatusCodes.OK).json({ msg: "Success! Password Updated" });
};

const changeUserRole = async (req, res) => {
  const user = await User.findOne({ _id: req.params.id});
  assetCheck(user,req.params.id,"user")
  const { role } = req.body;

  user.role = role;
  await user.save();
  res
    .status(StatusCodes.OK)
    .json({ msg: `User role succesfully changed with ${user.role}` });
};

module.exports = {
  getAllUsers,
  getSingleUser,
  showCurrentUser,
  updateUser,
  updateUserPassword,
  changeUserRole,
};
