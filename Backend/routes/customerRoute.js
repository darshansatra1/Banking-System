const express = require("express");
const {withdraw,getProfile,deposit,getDeposits} = require("../controllers/customer/customerController");
const {authCustomerProtect,checkPassword} = require("../middlewares/customerMiddleware/authCustomerMiddleware");

const router = express.Router();

router.route("/profile")
    .get(authCustomerProtect, getProfile);

router.route("/deposit")
    .post(authCustomerProtect,checkPassword,deposit)
    .get(authCustomerProtect, getDeposits);

router.route("/withdraw")
    .post(authCustomerProtect, withdraw);

module.exports = router;