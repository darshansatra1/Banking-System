const express = require("express");
const {updateProfile,getWithdraws,withdraw,getProfile, deposit,getDeposits} = require("../controllers/merchant/merchantController");
const {authMerchantProtect, checkPassword} = require("../middlewares/merchantMiddleware/authMerchantMiddleware");

const router = express.Router();

router.route("/profile")
    .get(authMerchantProtect, getProfile)
    .put(authMerchantProtect, updateProfile);

router.route("/deposit")
    .post(authMerchantProtect, deposit)
    .get(authMerchantProtect, getDeposits);

router.route("/withdraw")
    .post(authMerchantProtect, withdraw)
    .get(authMerchantProtect, getWithdraws);

module.exports = router;