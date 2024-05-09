require("dotenv").config();
const catchAsyncErrors = require("./catch.async.error");
const User=require("../models/user.model")
const jwt =  require("jsonwebtoken");

const isAuthenticated = catchAsyncErrors(async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    return next({code:400,message:"user not authorized,Please login!"});
  }
  const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

  req.user = await User.findById(decoded.id);

  next();
});

module.exports=isAuthenticated;