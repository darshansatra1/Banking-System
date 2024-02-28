const User = require("../models/CustomerModel");
const asyncHandler = require("express-async-handler");

/**
 * @desc   Deposit money
 * @route  POST  /api/account/deposit
 * @access private(USER)
 */
const deposit = asyncHandler(async (req,res)=>{
    if(!req.body.credit){
        return res.status(400).send("Credit amount is required");
    }
    const {credit, user} = req.body;

    try{
        user.balance += credit;
        user.markModified("balance");

        user.deposit_logs.push({
            deposit_amount: credit,
        });
        user.markModified("deposit_logs");

        const updatedUser = await user.save();

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
    deposit,
}