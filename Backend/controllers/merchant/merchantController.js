const Merchant = require("../../models/MerchantModel")
const asyncHandler = require("express-async-handler");
const { generateUserToken } = require("../../helpers/generateUserToken");
const validator = require("validator");

/**
 * @desc Get merchant
 * @route POST /profile
 * @access private(MERCHANT)
 */
const getProfile = asyncHandler(async (req,res)=>{
    const merchant = req.merchant;

    try{
        return res.json({
            _uid: merchant._id,
            user_name: merchant.user_name,
            email: merchant.email,
        });
    }catch(error){
        return res.status(500).send("Ooops!! Something Went Wrong, Try again...");
    }
});


module.exports = {
    getProfile,
};