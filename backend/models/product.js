const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Product name could be not empty"],
  },
  description: {
    type: String,
    required: [true, "Product cannot be empty"],
  },
  price: {
    type: Number,
    required: [true, "Price could be not empty"],
    default: 0.0,
    maxLength: [5, "Product name cannot exceed 5 characters"],
  },
  status: {
    type: String,
    default: "Active",
  },
  ratings: {
    type: Number,
    default: 0,
  },
  images: [
    {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
  ],
  varient: [
    {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      stock: {
        type: Number,
        required: [true, "Please enter product stock"],
        maxLength: [5, "Product name cannot exceed 5 characters"],
        default: 0,
      },
      price: [
        {
          price: {
            type: Number,
            required: true,
            default: 0.0,
          },
          compareAtPrice: {
            type: Number,
            required: true,
            deafult: 0.0,
          },
          costPerItem: {
            type: Number,
            required: true,
            default: 0.0,
          },
        },
      ],
    },
  ],
  stock: {
    type: Number,
    required: [true, "Please enter product stock"],
    maxLength: [5, "Product name cannot exceed 5 characters"],
    default: 0,
  },
  numOfReviews: {
    type: Number,
    default: 0,
  },
  reviews: [
    {
      user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      rating: {
        type: Number,
        required: true,
      },
      comment: {
        type: String,
        required: true,
      },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Product", productSchema);
