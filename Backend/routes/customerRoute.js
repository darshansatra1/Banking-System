const express = require("express");
const {getProfile,deposit} = require("../controllers/customer/customerController");
const {authCustomerProtect,checkPassword} = require("../middlewares/customerMiddleware/authCustomerMiddleware");

const router = express.Router();

router.route("/profile")
    .get(authCustomerProtect, getProfile);

router.route("/deposit")
    .post(authCustomerProtect,checkPassword,deposit);

module.exports = router;