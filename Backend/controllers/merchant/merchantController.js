const Merchant = require("../../models/MerchantModel");
const Deposit = require("../../models/DepositModel");
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

/**
 * @desc   Deposit money
 * @route  POST  /deposit
 * @access private(MERCHANT)
 */
const deposit = asyncHandler(async (req,res)=>{
    if(!req.body.amount){
        return res.status(400).send("Amount is required");
    }

    const {amount} = req.body;
    const merchant = req.merchant;

    try{
        if(amount<1){
            return res.status(400).send("You can not deposit amount less than 1$")
        }

        const deposit = await Deposit.create({
            toMerchant: merchant._id,
            status:"waiting",
            amount: amount,
        });

        return res.status(201).json({
            success: true,
        });
    }catch(error){
        if (error.message.match(/(Balance|Account|validation|deposit)/gi))
            return res.status(400).send(error.message);
        res.status(500).send("Ooops!! Something Went Wrong, Try again...");
    }
});


module.exports = {
    getProfile,
    deposit,
};