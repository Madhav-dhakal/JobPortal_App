require("dotenv").config();
const sendToken = (user, code = 200, res, message) => {
     const cookieExpire = process.env.COOKIE_EXPIRE 
  const token = user.getJWTToken();
  const options = {
    expires: new Date(
      Date.now() + cookieExpire * 24 * 60 * 60 * 1000
    ),
    httpOnly: true, // Set httpOnly to true
  };

  res.status(code).cookie("token", token, options).json({
    success: true,
    user,
    message,
    token,
  });
};

module.exports = sendToken;
