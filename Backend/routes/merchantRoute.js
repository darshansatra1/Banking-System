const express = require("express");
const {getBillById,getBills,createBill,getOtp,updateProfile,getWithdraws,withdraw,getProfile, deposit,getDeposits} = require("../controllers/merchant/merchantController");
const {authMerchantProtect, checkPassword} = require("../middlewares/merchantMiddleware/authMerchantMiddleware");

const router = express.Router();

router.route("/profile")
    .get(authMerchantProtect, getProfile)
    .put(authMerchantProtect, updateProfile);

router.route("/deposit")
    .post(authMerchantProtect, deposit)
    .get(authMerchantProtect, getDeposits);

router.route("/otp")
    .get(authMerchantProtect, getOtp);

router.route("/withdraw")
    .post(authMerchantProtect, withdraw)
    .get(authMerchantProtect, getWithdraws);

router.route("/bill")
    .post(authMerchantProtect, createBill);

router.route("/bill/:id")
    .get(authMerchantProtect, getBillById);

router.route("/bills")
    .get(authMerchantProtect, getBills);

module.exports = router;