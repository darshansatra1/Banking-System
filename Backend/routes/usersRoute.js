const express = require("express");
const { createUser, loginUser, getUserById } = require("../controllers/usersController");

const { validatePassword } = require("../middlewares/userMiddleware/userMiddleware")
const { authUserProtect } = require("../middlewares/userMiddleware/authUsersMiddleware");

const router = express.Router();


router.route("/")
    .post(validatePassword, createUser);

router.route("/login")
    .post(loginUser);

router.route("/:id")
    .get(authUserProtect, getUserById);

module.exports = router;