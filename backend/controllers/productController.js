const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const Product = require("../models/product");
const APIFeatures = require("../utils/apiFeatures");
const cloudinary = require("cloudinary");

// API to create new product =>  /api/v1/admin/new-product
exports.newProduct = catchAsyncErrors(async (req, res, next) => {
  let result = await req.body.images.map((item) =>
    cloudinary.v2.uploader.upload(item, {
      folder: "product_images",
      width: 150,
      crop: "scale",
    })
  );

  let resultResponse = await Promise.all(result);

  let varientResult = await req.body.varient.map((item) =>
    cloudinary.v2.uploader.upload(item.varient_image, {
      folder: "product_images",
      width: 150,
      crop: "scale",
    })
  );

  let imageResponses = await Promise.all(varientResult);

  const product = await Product.create({
    ...req.body,
    images: req.body.images.map((item, index) => ({
      public_id: resultResponse[index].public_id,
      url: resultResponse[index].secure_url,
    })),
    varient: req.body.varient.map((item, index) => ({
      ...item,
      image: {
        public_id: imageResponses[index].public_id,
        url: imageResponses[index].secure_url,
      },
    })),
  });
  res.status(201).json({ success: true, product });
});

// Get all products   =>   /api/v1/products?keyword=apple
exports.getProducts = catchAsyncErrors(async (req, res, next) => {
  const resPerPage = 10;

  const apiFeatures = new APIFeatures(
    Product.find({ $or: [{ status: "Active" }] }),
    req.query
  )
    .search()
    .filter();

  let products = await apiFeatures.query;
  let filteredProductsCount = products.length;

  apiFeatures.pagination(resPerPage);
  products = await apiFeatures.query;

  res.status(200).json({
    success: true,
    total: filteredProductsCount,
    productsCount: products.length,
    products,
  });
});

// Delete a product => /api/v1/admin/product/:id
exports.deleteProduct = catchAsyncErrors(async (req, res, next) => {
  let product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  product = await Product.findByIdAndUpdate(
    req.params.id,
    { status: "Delete" },
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );

  res.status(200).json({
    success: true,
    product,
  });
});

// Get all deleted products   =>   /api/v1/deleted-products?keyword=apple
exports.getDeletedProducts = catchAsyncErrors(async (req, res, next) => {
  const resPerPage = 10;
  const productsCount = await Product.countDocuments({
    $or: [{ status: "Delete" }],
  });

  const apiFeatures = new APIFeatures(
    Product.find({ $or: [{ status: "Delete" }] }),
    req.query
  )
    .search()
    .filter();

  let products = await apiFeatures.query;
  let filteredProductsCount = products.length;

  apiFeatures.pagination(resPerPage);
  products = await apiFeatures.query;

  res.status(200).json({
    success: true,
    total: filteredProductsCount,
    productsCount: products.length,
    products,
  });
});

// activate a product => /api/v1/admin/product/:id
exports.activateProduct = catchAsyncErrors(async (req, res, next) => {
  let product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  product = await Product.findByIdAndUpdate(
    req.params.id,
    { status: "Active" },
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );

  res.status(200).json({
    success: true,
    product,
  });
});

// Get single product => /api/v1/admin/product/:id
exports.getSingleProduct = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  res.status(200).json({
    success: true,
    product,
  });
});

// Update Product   =>   /api/v1/admin/product/:id
exports.updateProduct = catchAsyncErrors(async (req, res, next) => {
  let product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  let images = [];
  if (typeof req.body.images === "string") {
    images.push(req.body.images);
  } else {
    images = req.body.images;
  }

  if (images !== undefined) {
    // Deleting images associated with the product
    for (let i = 0; i < product.images.length; i++) {
      const result = await cloudinary.v2.uploader.destroy(
        product.images[i].public_id
      );
    }

    let imagesLinks = [];

    for (let i = 0; i < images.length; i++) {
      const result = await cloudinary.v2.uploader.upload(images[i], {
        folder: "products",
      });

      imagesLinks.push({
        public_id: result.public_id,
        url: result.secure_url,
      });
    }

    req.body.images = imagesLinks;
  }

  let varientResult = await req.body.varient.map((item) =>
    cloudinary.v2.uploader.upload(item.varient_image, {
      folder: "product_images",
      width: 150,
      crop: "scale",
    })
  );

  let imageResponses = await Promise.all(varientResult);

  product = await Product.findByIdAndUpdate(
    req.params.id,
    {
      ...req.body,
      varient: req.body.varient.map((item, index) => ({
        ...item,
        image: {
          public_id: imageResponses[index].public_id,
          url: imageResponses[index].secure_url,
        },
      })),
    },
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );

  res.status(200).json({
    success: true,
    product,
  });
});
