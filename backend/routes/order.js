const express = require("express");
const router = express.Router();

const {
  newOrder,
  myOrders,
  allOrders,
  getSingleOrder,
  updateOrder,
  deleteOrder,
} = require("../controllers/orderController");
const { isUserAuthenticated, authorizeRole } = require("../middlewares/auth");

router.route("/new-order").post(isUserAuthenticated, newOrder);
router.route("/order/me").get(isUserAuthenticated, myOrders);
router.route("/order/:id").get(isUserAuthenticated, getSingleOrder);
router
  .route("/admin/orders")
  .get(isUserAuthenticated, authorizeRole("super_admin"), allOrders);

router
  .route("/admin/update-order/:id")
  .put(isUserAuthenticated, authorizeRole("super_admin"), updateOrder);

router
  .route("/admin/order/:id")
  .delete(isUserAuthenticated, authorizeRole("super_admin"), deleteOrder);

module.exports = router;
