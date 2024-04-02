const express = require("express");
const {updateUserStatus,updateUserProfile,updateProfile,getUserWithdrawLogs,getWithdraws, authorizeWithdraw,getUserDepositLogs,getUserById,getUsers,getProfile,getDeposits,authorizeDeposit} = require("../controllers/manager/managerController");
const {authManagerProtect} = require("../middlewares/managerMiddleware/authManagerMiddleware");

const router = express.Router();

router.route("/profile")
    .get(authManagerProtect, getProfile)
    .put(authManagerProtect, updateProfile);

router.route("/deposit")
    .get(authManagerProtect, getDeposits);

router.route("/deposit/:id")
    .post(authManagerProtect, authorizeDeposit);

router.route("/withdraw")
    .get(authManagerProtect, getWithdraws);

router.route("/withdraw/:id")
    .post(authManagerProtect, authorizeWithdraw);

router.route("/user/:id/deposit")
    .get(authManagerProtect,getUserDepositLogs);

router.route("/user/:id/withdraw")
    .get(authManagerProtect,getUserWithdrawLogs);

router.route("/user")
    .get(authManagerProtect, getUsers);

router.route("/user/:id")
    .get(authManagerProtect, getUserById)
    .put(authManagerProtect, updateUserProfile);

router.route("/user/:id/status")
    .put(authManagerProtect, updateUserStatus);


module.exports = router;