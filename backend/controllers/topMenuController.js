const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const TopMenu = require("../models/topMenu");

// API to create new product =>  /api/v1/admin/top-menu
exports.newTopMenu = catchAsyncErrors(async (req, res, next) => {
  await TopMenu.create(req.body);
  res
    .status(200)
    .json({ success: true, message: "Top Menu has been created successfully" });
});

// API to get all menus => /api/v1/top-menus
exports.getTopMenus = catchAsyncErrors(async (req, res, next) => {
  let rows = await TopMenu.find();
  menuItem = rows[0].menuItem;
  res.status(200).json({ success: true, menuItem });
});
