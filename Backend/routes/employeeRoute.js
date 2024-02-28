const express = require("express");
const {getProfile, getDeposits} = require("../controllers/employee/employeeController");
const {authEmployeeProtect} = require("../middlewares/employeeMiddleware/authEmployeeMiddleware");

const router = express.Router();

router.route("/profile")
    .get(authEmployeeProtect, getProfile);

router.route("/deposit")
    .get(authEmployeeProtect, getDeposits);

module.exports = router;