const catchAsyncErrors = require("../middlewares/catch.async.error.js");
const User = require("../models/user.model.js");
const sendToken = require("../utils/jwt.token.js");

const register = catchAsyncErrors(async (req, res, next) => {
  const { name, email, phone, password, role } = req.body;
  if (!name || !email || !phone || !password || !role) {
    return next({
      code: 400,
      message: "Please fill all the fields of registration form!",
    });
  }
  const isEmail = await User.findOne({ email });
  if (isEmail) {
    return next({ code: 400, message: "Email already registered!" });
  }
  const user = await User.create({
    name,
    email,
    phone,
    password,
    role,
  });
  // res.status(200).json({
  //    success:true,
  //    message:"user registered",
  //    user
  // })
  sendToken(user, 200, res, "User Registered Successfully!");
});

const login = catchAsyncErrors(async (req, res, next) => {
  const { email, password, role } = req.body;

  if (!email || !password || !role) {
    return next({ code: 400, message: "Please provide login details!" });
  }
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return next({ code: 400, message: "Invalid Credentials." });
  }
  const isPasswordMatched = await user.comparePassword(password);
  if (!isPasswordMatched) {
    return next({ code: 400, message: "Invalid Credentials." });
  }
  if (user.role !== role) {
    return next({
      code: 400,
      message: `User with this ${role} role is not found!`,
    });
  }
  sendToken(user, 200, res, "User logged in Successfully!");
});

const logout = catchAsyncErrors(async (req, res, next) => {
  res
    .status(201)
    .cookie("token", null, {
      httpOnly: true,
      expires: new Date(Date.now()),
    })
    .json({
      success: true,
      message: "User logged out Successfully!",
    });
});

const getUser = catchAsyncErrors((req, res, next) => {
  const user = req.user;
  res.status(200).json({
    success: true,
    user,
  });
});

module.exports = { register, login, logout, getUser };
