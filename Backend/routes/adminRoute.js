const express = require("express");
const {getWithdraws, authorizeWithdraw,getUserDepositLogs,getUserById,getUsers,getProfile,getDeposits,authorizeDeposit} = require("../controllers/admin/adminController");
const {authAdminProtect} = require("../middlewares/adminMiddleware/authAdminMiddleware");

const router = express.Router();

router.route("/profile")
    .get(authAdminProtect, getProfile);

router.route("/deposit")
    .get(authAdminProtect, getDeposits);

router.route("/deposit/:id")
    .post(authAdminProtect, authorizeDeposit);

router.route("/withdraw")
    .get(authAdminProtect, getWithdraws);

router.route("/withdraw/:id")
    .post(authAdminProtect, authorizeWithdraw);

router.route("/user/:id/deposit")
    .get(authAdminProtect, getUserDepositLogs);

router.route("/user")
    .get(authAdminProtect, getUsers);

router.route("/user/:id")
    .get(authAdminProtect, getUserById);

module.exports = router;