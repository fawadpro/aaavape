const express = require("express");
const router = express.Router();

const {
  newProduct,
  getProducts,
  deleteProduct,
  getDeletedProducts,
  activateProduct,
  getSingleProduct,
  updateProduct,
  getSinglePublicProduct,
} = require("../controllers/productController");
const { isUserAuthenticated, authorizeRole } = require("../middlewares/auth");

router
  .route("/admin/new-product")
  .post(isUserAuthenticated, authorizeRole("super_admin"), newProduct);
router
  .route("/admin/products")
  .get(isUserAuthenticated, authorizeRole("super_admin"), getProducts);

router
  .route("/admin/product/:id")
  .delete(isUserAuthenticated, authorizeRole("super_admin"), deleteProduct)
  .put(isUserAuthenticated, authorizeRole("super_admin"), activateProduct)
  .get(isUserAuthenticated, authorizeRole("super_admin"), getSingleProduct);

router.route("/product/:id").get(getSinglePublicProduct);

router
  .route("/admin/deleted-products")
  .get(isUserAuthenticated, authorizeRole("super_admin"), getDeletedProducts);

router
  .route("/admin/update-product/:id")
  .put(isUserAuthenticated, authorizeRole("super_admin"), updateProduct);

module.exports = router;
