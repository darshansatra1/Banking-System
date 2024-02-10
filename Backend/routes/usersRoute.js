const express = require("express");
const { createUser, loginUser } = require("../controllers/usersController");

const { validatePassword } = require("../middlewares/userMiddleware/userMiddleware")

const router = express.Router();


router.route("/")
    .post(validatePassword, createUser);

router.route("/login")
    .post(loginUser);

module.exports = router;