const express = require("express");
const router = express.Router();

const { newTopMenu, getTopMenus } = require("../controllers/topMenuController");
const { isUserAuthenticated, authorizeRole } = require("../middlewares/auth");

router
  .route("/admin/top-menu")
  .post(isUserAuthenticated, authorizeRole("super_admin"), newTopMenu);
router.route("/top-menus").get(getTopMenus);

module.exports = router;
