const Manager = require("../../models/ManagerModel");
const asyncHandler = require("express-async-handler");
const { generateAdminToken } = require("../../helpers/generateAdminToken");
const validator = require("validator");

/**
 * @desc Get manager
 * @route POST /profile
 * @access private(MANAGER)
 */
const getProfile = asyncHandler(async (req,res)=>{
    const manager = req.manager;

    try{
        return res.json({
            _uid: manager._id,
            user_name: manager.user_name,
            email: manager.email,
        });
    }catch(error){
        return res.status(500).send("Ooops!! Something Went Wrong, Try again...");
    }
});


module.exports = {
    getProfile,
};