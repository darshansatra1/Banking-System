const express = require("express");
const {getUsers,getProfile,getDeposits,authorizeDeposit} = require("../controllers/manager/managerController");
const {authManagerProtect} = require("../middlewares/managerMiddleware/authManagerMiddleware");

const router = express.Router();

router.route("/profile")
    .get(authManagerProtect, getProfile);

router.route("/deposit")
    .get(authManagerProtect, getDeposits);

router.route("/deposit/:id")
    .post(authManagerProtect, authorizeDeposit);

router.route("/user")
    .get(authManagerProtect, getUsers);

module.exports = router;