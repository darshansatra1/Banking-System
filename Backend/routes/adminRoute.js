const express = require("express");
const {getProfile} = require("../controllers/admin/adminController");
const {authAdminProtect} = require("../middlewares/adminMiddleware/authAdminMiddleware");

const router = express.Router();

router.route("/profile")
    .get(authAdminProtect, getProfile);

module.exports = router;