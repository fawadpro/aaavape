const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const _ = require("lodash");
const jwt = require("jsonwebtoken");
const { sendConfirmationEmail } = require("../services/emailService");
const { sendResetEmail } = require("../services/resetAccount");
const User = require("../models/user");
const crypto = require("crypto");
const sendToken = require("../utils/jwtToken");

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

  const token = user.getJwtToken();

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

  if (!user) {
    return next(new ErrorHandler("Email is not found", 404));
  }

  const isPasswordMatch = await user.comparePassword(password);

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

  let token = user.getJwtToken();

  res.status(200).json({ success: true, token });
});

// API to get users
exports.getUsers = catchAsyncErrors(async (req, res, next) => {
  res.status(200).json({ success: true, message: "Successed" });
});

// Forgot Password   =>  /api/v1/password/forgot
exports.forgotPassword = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return next(new ErrorHandler("User not found with this email", 404));
  }

  // Get reset token
  const resetToken = user.getResetPasswordToken();

  await user.save({ validateBeforeSave: false });

  // Create reset password url
  const resetUrl = `${req.protocol}://${req.get(
    "host"
  )}/password/reset/${resetToken}`;

  const message = `Your password reset token is as follow:\n\n${resetUrl}\n\nIf you have not requested this email, then ignore it.`;

  try {
    sendResetEmail("fawadshah.thall@gmail.com", message);
    res.status(200).json({ message: "Email Successfully sent" });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save({ validateBeforeSave: false });

    return next(new ErrorHandler(error.message, 500));
  }
});

// Reset Password   =>  /api/v1/password/reset/:token
exports.resetPassword = catchAsyncErrors(async (req, res, next) => {
  // Hash URL token
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user) {
    return next(
      new ErrorHandler(
        "Password reset token is invalid or has been expired",
        400
      )
    );
  }

  if (req.body.password !== req.body.confirmPassword) {
    return next(new ErrorHandler("Password does not match", 400));
  }

  // Setup new password
  user.password = req.body.password;

  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save();

  sendToken(user, 200, res);
});

// Get currently logged in user details   =>   /api/v1/me
exports.getUserProfile = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  res.status(200).json({
    success: true,
    user,
  });
});

// Update user profile   =>   /api/v1/me/update
exports.updateProfile = catchAsyncErrors(async (req, res, next) => {
  const newUserData = {
    name: req.body.name,
    address: req.body.address,
    postalCode: req.body.postalCode,
    phone: req.body.phone,
    country: req.body.country,
  };

  const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    user,
  });
});
