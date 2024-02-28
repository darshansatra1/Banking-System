// // routes/adminRoutes.js
// const express = require('express');
// const router = express.Router();
// const { updateAdminById,createAdministrator,updateAdmin,createAdmin, loginAdmin, getAdminById, getAdmin} = require('../controllers/adminController');
// const { authAdminProtect, authAdministratorProtect } = require("../middlewares/adminMiddleware/authAdminMiddleware");
// const {updateUserById} = require("../controllers/users/usersController");
//
//
// router.route('/')
//     .post(validatePassword, createAdmin)
//     .get(authAdminProtect, getAdmin)
//     .put(authAdminProtect, updateAdmin);
//
// router.route('/login')
//     .post(loginAdmin);
//
// router.route('/:id')
//     .get(authAdministratorProtect, getAdminById)
//     .put(authAdministratorProtect, updateAdminById);
//
// router.route('/administrator/register')
//     .post(validatePassword, createAdministrator);
//
// module.exports = router;