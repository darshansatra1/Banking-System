const express = require("express");
const {getProfile,getDeposits,authorizeDeposit} = require("../controllers/admin/adminController");
const {authAdminProtect} = require("../middlewares/adminMiddleware/authAdminMiddleware");

const router = express.Router();

router.route("/profile")
    .get(authAdminProtect, getProfile);

router.route("/deposit")
    .get(authAdminProtect, getDeposits);

router.route("/deposit/:id")
    .post(authAdminProtect, authorizeDeposit);

module.exports = router;