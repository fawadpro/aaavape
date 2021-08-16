const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const _ = require("lodash");
const jwt = require("jsonwebtoken");
const { sendConfirmationEmail } = require("../services/emailService");
const User = require("../models/user");

// API to create new user => /api/v1/register
exports.register = catchAsyncErrors(async (req, res, next) => {
  const { name, email, password, role } = req.body;

  let user = await User.create({
    name,
    email,
    password,
    avatar: {
      public_id: "products/chairmount_nuubea",
      url: "https://res.cloudinary.com/bookit/image/upload/v1606231285/products/chairmount_nuubea.jpg",
    },
    role,
  });

  const token = user.getJWTToken();

  const emailToken = jwt.sign(
    {
      user: _.pick(user, "id"),
    },
    process.env.EMAIL_SECRET,
    {
      expiresIn: "1d",
    }
  );

  sendConfirmationEmail(user, emailToken, req.host);

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
    return next(new ErrorHandler("Email and Password is required", 404));
  }

  let user = await User.findOne({ email }).select("+password");

  console.log("@@@ user", user);

  if (!user) {
    return next(new ErrorHandler("Email is not found", 404));
  }

  const isPasswordMatch = await user.passwordCompare(password);

  if (!isPasswordMatch) {
    return next(new ErrorHandler("Email or Password is incorrect", 404));
  }

  if (!user.isVerified) {
    return next(
      new ErrorHandler(
        "Please take a comment and validate your email to confirm your account ",
        404
      )
    );
  }

  let token = user.getSignInToken();

  res.status(200).json({ success: true, token });
});

// API to get users
exports.getUsers = catchAsyncErrors(async (req, res, next) => {
  res.status(200).json({ success: true, message: "Successed" });
});
