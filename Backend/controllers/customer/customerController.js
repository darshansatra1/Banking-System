const Customer = require("../../models/CustomerModel")
const Deposit = require("../../models/DepositModel")
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

/**
 * @desc   Deposit money
 * @route  POST  /deposit
 * @access private(CUSTOMER)
 */
const deposit = asyncHandler(async (req,res)=>{
    if(!req.body.amount){
        return res.status(400).send("Amount is required");
    }

    const {amount} = req.body;
    const customer = req.customer;

    try{
        if(amount<1){
            return res.status(400).send("You can not deposit amount less than 1$")
        }

        const deposit = await Deposit.create({
            toCustomer: customer._id,
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