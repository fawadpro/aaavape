const User = require("../models/user");
const catchAsyncError = require("../middlewares/catchAsyncErrors");
const jwt = require("jsonwebtoken");
const ErrorHandler = require("../utils/errorHandler");

exports.isUserAuthenticated = catchAsyncError(async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return next(new ErrorHandler("Token is required", 401));
  }

  const decoded = jwt.verify(authorization, process.env.JWT_SECRET);

  let user = await User.findById(decoded.id);

  if (!user) {
    return next(new ErrorHandler("No active user found with that id", 404));
  }

  req.user = user;

  next();
});

// Middleware to check user role
exports.authorizeRole = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorHandler("You do not have permission to access this route", 401)
      );
    }

    next();
  };
};
