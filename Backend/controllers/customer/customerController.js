const Customer = require("../../models/CustomerModel")
const asyncHandler = require("express-async-handler");


/**
 * @desc Get customer
 * @route POST /profile
 * @access private(CUSTOMER)
 */
const getProfile = asyncHandler(async (req,res)=>{
    const customer = req.customer;

    try{
        return res.json({
            _uid: customer._id,
            user_name: customer.user_name,
            email: customer.email,
        });
    }catch(error){
        return res.status(500).send("Ooops!! Something Went Wrong, Try again...");
    }
});

module.exports = {
    getProfile,
};