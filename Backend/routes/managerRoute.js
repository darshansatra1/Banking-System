const express = require("express");
const {getProfile,getDeposits,authorizeDeposit} = require("../controllers/manager/managerController");
const {authManagerProtect} = require("../middlewares/managerMiddleware/authManagerMiddleware");

const router = express.Router();

router.route("/profile")
    .get(authManagerProtect, getProfile);

router.route("/deposit")
    .get(authManagerProtect, getDeposits);

router.route("/deposit/:id")
    .post(authManagerProtect, authorizeDeposit);

module.exports = router;