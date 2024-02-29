const express = require("express");
const {getUserById,getUsers,getUserDepositLogs,getProfile, getDeposits,authorizeDeposit} = require("../controllers/employee/employeeController");
const {authEmployeeProtect} = require("../middlewares/employeeMiddleware/authEmployeeMiddleware");

const router = express.Router();

router.route("/profile")
    .get(authEmployeeProtect, getProfile);

router.route("/deposit")
    .get(authEmployeeProtect, getDeposits);

router.route("/deposit/:id")
    .post(authEmployeeProtect, authorizeDeposit);

router.route("/user/:id/deposit")
    .get(authEmployeeProtect,getUserDepositLogs);

router.route("/user")
    .get(authEmployeeProtect,getUsers);

router.route("/user/:id")
    .get(authEmployeeProtect,getUserById);

module.exports = router;