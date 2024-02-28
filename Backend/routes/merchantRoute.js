const express = require("express");
const {getProfile} = require("../controllers/merchant/merchantController");
const {authMerchantProtect} = require("../middlewares/merchantMiddleware/authMerchantMiddleware");

const router = express.Router();

router.route("/profile")
    .get(authMerchantProtect, getProfile);

module.exports = router;