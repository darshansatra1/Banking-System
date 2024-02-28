const Admin = require("../../models/AdminModel");
const asyncHandler = require("express-async-handler");
const { generateAdminToken } = require("../../helpers/generateAdminToken");
const validator = require("validator");


/**
 * @desc Get admin
 * @route POST /profile
 * @access private(ADMIN)
 */
const getProfile = asyncHandler(async (req,res)=>{
    const admin = req.admin;

    try{
        return res.json({
            _uid: admin._id,
            user_name: admin.user_name,
            email: admin.email,
        });
    }catch(error){
        return res.status(500).send("Ooops!! Something Went Wrong, Try again...");
    }
});

module.exports = {
    getProfile,
};