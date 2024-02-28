const express = require("express");
const {getProfile, deposit} = require("../controllers/merchant/merchantController");
const {authMerchantProtect, checkPassword} = require("../middlewares/merchantMiddleware/authMerchantMiddleware");

const router = express.Router();

router.route("/profile")
    .get(authMerchantProtect, getProfile);

router.route("/deposit")
    .post(authMerchantProtect, checkPassword, deposit);

module.exports = router;