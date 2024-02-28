const express = require("express");
const {getProfile} = require("../controllers/customer/customerController");
const {authCustomerProtect} = require("../middlewares/customerMiddleware/authCustomerMiddleware");

const router = express.Router();

router.route("/profile")
    .get(authCustomerProtect, getProfile);

module.exports = router;