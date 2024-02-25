const express = require("express");
const { getUser,updateUser,createUser, loginUser, getUserById, updateUserById} = require("../controllers/usersController");

const { validatePassword } = require("../middlewares/userMiddleware/userMiddleware")
const { authUserProtect } = require("../middlewares/userMiddleware/authUsersMiddleware");
const { authAdministratorProtect, authAdminProtect } = require("../middlewares/adminMiddleware/authAdminMiddleware");

const router = express.Router();

router.route("/")
    .post(validatePassword, createUser)
    .put(authUserProtect, updateUser)
    .get(authUserProtect, getUser);

router.route("/login")
    .post(loginUser);

router.route("/:id")
    .get(authAdminProtect, getUserById)
    .put(authAdminProtect, updateUserById);


module.exports = router;