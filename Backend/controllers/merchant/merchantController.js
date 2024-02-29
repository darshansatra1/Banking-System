const Merchant = require("../../models/MerchantModel");
const Deposit = require("../../models/DepositModel");
const asyncHandler = require("express-async-handler");
const { generateUserToken } = require("../../helpers/generateUserToken");
const validator = require("validator");
const Employee = require("../../models/EmployeeModel");

/**
 * @desc Get merchant
 * @route POST /profile
 * @access private(MERCHANT)
 */
const getProfile = asyncHandler(async (req,res)=>{
    const merchant = req.merchant;

    try{
        const employee = await Employee.findById(merchant.supervisor);
        return res.json({
            _uid: merchant._id,
            user_name: merchant.user_name,
            email: merchant.email,
            balance: merchant.balance,
            date_created: merchant.createdAt,
            supervisor: employee.user_name,
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
    if(!('amount' in req.body)){
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

/**
 * @desc   Get all deposits
 * @route  GET  /deposit
 * @access private(MERCHANT)
 */
const getDeposits = asyncHandler(async (req,res)=>{
    const merchant = req.merchant;

    try{
        const allDeposits = await Deposit.find({
            toMerchant: merchant._id,
        });

        const output = [];

        for(let i=0;i<allDeposits.length;i++){
            output.push({
                "_id":allDeposits[i]._id,
                "client_id":allDeposits[i].toMerchant,
                "status":allDeposits[i].status,
                "amount":allDeposits[i].amount,
                "date_created":allDeposits[i].createdAt,
            });
        }

        return res.status(200).json(output);

    }catch(error){
        if (error.message.match(/(Balance|Account|validation|deposit)/gi))
            return res.status(400).send(error.message);
        res.status(500).send("Ooops!! Something Went Wrong, Try again...");
    }
});

module.exports = {
    getProfile,
    deposit,
    getDeposits,
};