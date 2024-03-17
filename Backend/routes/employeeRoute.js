const express = require("express");
const {updateProfile,getUserWithdrawLogs,getWithdraws, authorizeWithdraw,getUserById,getUsers,getUserDepositLogs,getProfile, getDeposits,authorizeDeposit} = require("../controllers/employee/employeeController");
const {authEmployeeProtect} = require("../middlewares/employeeMiddleware/authEmployeeMiddleware");

const router = express.Router();

router.route("/profile")
    .get(authEmployeeProtect, getProfile)
    .put(authEmployeeProtect, updateProfile);

router.route("/deposit")
    .get(authEmployeeProtect, getDeposits);

router.route("/deposit/:id")
    .post(authEmployeeProtect, authorizeDeposit);

router.route("/withdraw")
    .get(authEmployeeProtect, getWithdraws);

router.route("/withdraw/:id")
    .post(authEmployeeProtect, authorizeWithdraw);

router.route("/user/:id/deposit")
    .get(authEmployeeProtect,getUserDepositLogs);

router.route("/user/:id/withdraw")
    .get(authEmployeeProtect,getUserWithdrawLogs);

router.route("/user")
    .get(authEmployeeProtect,getUsers);

router.route("/user/:id")
    .get(authEmployeeProtect,getUserById);

module.exports = router;