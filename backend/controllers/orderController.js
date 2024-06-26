const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const Order = require("../models/order");
const Product = require("../models/product");
const APIFeatures = require("../utils/apiFeatures");

// API to create new order  => /api/v1/new-order
exports.newOrder = catchAsyncErrors(async (req, res, next) => {
  let totalOrders = await Order.find();
  let ordersLength = totalOrders.length;
  const order = await Order.create({
    ...req.body,
    orderId: ordersLength + 1,
  });

  res.status(201).json({ success: true, order });
});

// Get logged in user orders   =>   /api/v1/orders/me
exports.myOrders = catchAsyncErrors(async (req, res, next) => {
  const orders = await Order.find({ user: req.user.id }).populate(
    "user",
    "name"
  );

  res.status(200).json({
    success: true,
    orders,
  });
});

// Get all orders - ADMIN  =>   /api/v1/admin/orders/
exports.allOrders = catchAsyncErrors(async (req, res, next) => {
  const resPerPage = 10;

  const apiFeatures = new APIFeatures(
    Order.find().populate("user", "name"),
    req.query
  )
    .search()
    .filter();

  let orders = await apiFeatures.query;
  let filteredOrdersCount = orders.length;

  apiFeatures.pagination(resPerPage);
  orders = await apiFeatures.query;
  let totalAmount = 0;

  orders.forEach((order) => {
    totalAmount += order.totalPrice;
  });

  res.status(200).json({
    success: true,
    total: filteredOrdersCount,
    totalAmount,
    orders,
  });
});

// Get single order   =>   /api/v1/order/:id
exports.getSingleOrder = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );

  if (!order) {
    return next(new ErrorHandler("No Order found with this ID", 404));
  }

  res.status(200).json({
    success: true,
    order,
  });
});

// Update / Process order - ADMIN  =>   /api/v1/admin/order/:id
exports.updateOrder = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (order.orderStatus === "Delivered") {
    return next(new ErrorHandler("You have already delivered this order", 400));
  }

  order.orderItems.forEach(async (item) => {
    await updateStock(item.product, item.quantity, item.productVarient);
  });

  (order.orderStatus = req.body.status), (order.deliveredAt = Date.now());

  await order.save();

  res.status(200).json({
    success: true,
  });
});

// Update / Process order - ADMIN  =>   /api/v1/admin/order/:id
exports.updateOrderStatus = catchAsyncErrors(async (req, res, next) => {
  let order = await Order.findById(req.params.id);

  if (!order) {
    return next(new ErrorHandler("No Order found with this ID", 404));
  }

  if (order.orderStatus === "Delivered") {
    return next(new ErrorHandler("You have already delivered this order", 400));
  }

  order = await Order.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  res.status(200).json({
    success: true,
    order,
  });
});

async function updateStock(id, quantity, productVarient) {
  const product = await Product.findById(id);

  if (product._id.toString() === productVarient) {
    product.stock = product.stock - quantity;
  } else {
    product &&
      product.varient &&
      product.varient.map((item, index) => {
        if (item._id.toString() === productVarient) {
          return (product.varient[index].stock =
            product.varient[index].stock - quantity);
        }
      });
  }

  await product.save({ validateBeforeSave: false });
}

// Delete order   =>   /api/v1/admin/order/:id
exports.deleteOrder = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return next(new ErrorHandler("No Order found with this ID", 404));
  }

  await order.remove();

  res.status(200).json({
    success: true,
  });
});
