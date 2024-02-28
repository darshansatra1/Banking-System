const express = require("express");
const { registerUser, loginUser} = require("../controllers/users/usersController");

const { validatePassword } = require("../middlewares/userMiddleware/userMiddleware");

const router = express.Router();

router.route("/register")
    .post(validatePassword, registerUser);


router.route("/login")
    .post(loginUser);

module.exports = router;