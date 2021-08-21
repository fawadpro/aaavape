const express = require("express");
const router = express.Router();

const {
  register,
  login,
  getUsers,
  forgotPassword,
  resetPassword,
} = require("../controllers/authController");
const { isUserAuthenticated, authorizeRole } = require("../middlewares/auth");

router.route("/password/forgot").post(forgotPassword);
router.route("/password/reset/:token").put(resetPassword);
router.route("/register").post(register);
router.route("/login").post(login);
router
  .route("/users")
  .get(isUserAuthenticated, authorizeRole("super_admin"), getUsers);

module.exports = router;
