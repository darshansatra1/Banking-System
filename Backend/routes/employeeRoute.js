const express = require("express");
const {getProfile} = require("../controllers/employee/employeeController");
const {authEmployeeProtect} = require("../middlewares/employeeMiddleware/authEmployeeMiddleware");

const router = express.Router();

router.route("/profile")
    .get(authEmployeeProtect, getProfile);

module.exports = router;