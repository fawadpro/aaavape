const express = require("express");
const router = express.Router();

const {
  processPayment,
  sendStripApi,
  processPaymentNew,
} = require("../controllers/paymentController");

const { isUserAuthenticated } = require("../middlewares/auth");

router.route("/payment/process").post(isUserAuthenticated, processPayment);
router
  .route("/payment/processnew")
  .post(isUserAuthenticated, processPaymentNew);
router.route("/stripeapi").get(isUserAuthenticated, sendStripApi);

module.exports = router;
