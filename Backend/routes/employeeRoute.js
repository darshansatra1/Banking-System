const express = require("express");
const {getProfile, getDeposits,authorizeDeposit} = require("../controllers/employee/employeeController");
const {authEmployeeProtect} = require("../middlewares/employeeMiddleware/authEmployeeMiddleware");

const router = express.Router();

router.route("/profile")
    .get(authEmployeeProtect, getProfile);

router.route("/deposit")
    .get(authEmployeeProtect, getDeposits);

router.route("/deposit/:id")
    .post(authEmployeeProtect, authorizeDeposit);

module.exports = router;