const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const User = require("../models/user");

// API to create new user => /api/v1/register
exports.register = catchAsyncErrors(async (req, res, next) => {
  const { name, email, password } = req.body;

  let user = await User.create({
    name,
    email,
    password,
    avatar: {
      public_id: "products/chairmount_nuubea",
      url:
        "https://res.cloudinary.com/bookit/image/upload/v1606231285/products/chairmount_nuubea.jpg",
    },
  });

  const token = user.getJWTToken();

  res.status(201).json({
    success: true,
    message: "User has been created successfully",
    token,
  });
});

// API to authenticate user
exports.login = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new ErrorHandler("Email and Password is required", 400));
  }

  let user = await User.findOne({ email }).select("+password");

  if (!user) {
    return next(new ErrorHandler("No user found with that email address", 404));
  }

  const isPasswordMatch = await user.passwordCompare(password);

  if (!isPasswordMatch) {
    return next(new ErrorHandler("Password is incorrect", 404));
  }

  let token = user.getSignInToken();

  res.status(200).json({ success: true, token });
});

// API to get users
exports.getUsers = catchAsyncErrors(async (req, res, next) => {
  res.status(200).json({ success: true, message: "Successed" });
});
