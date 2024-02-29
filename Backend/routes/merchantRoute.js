const express = require("express");
const {withdraw,getProfile, deposit,getDeposits} = require("../controllers/merchant/merchantController");
const {authMerchantProtect, checkPassword} = require("../middlewares/merchantMiddleware/authMerchantMiddleware");

const router = express.Router();

router.route("/profile")
    .get(authMerchantProtect, getProfile);

router.route("/deposit")
    .post(authMerchantProtect, checkPassword, deposit)
    .get(authMerchantProtect, getDeposits);

router.route("/withdraw")
    .post(authMerchantProtect, withdraw);

module.exports = router;