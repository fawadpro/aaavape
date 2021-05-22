const express = require("express");
const router = express.Router();

const { newProduct, getProducts } = require("../controllers/productController");
const { isUserAuthenticated, authorizeRole } = require("../middlewares/auth");

router
  .route("/admin/new-product")
  .post(isUserAuthenticated, authorizeRole("super_admin"), newProduct);
router
  .route("/admin/products")
  .get(isUserAuthenticated, authorizeRole("super_admin"), getProducts);

module.exports = router;
