const Customer = require("../../models/CustomerModel");
const Deposit = require("../../models/DepositModel");
const Withdraw = require("../../models/WithdrawModel");
const Employee = require("../../models/EmployeeModel");
const asyncHandler = require("express-async-handler");


/**
 * @desc Get customer
 * @route POST /profile
 * @access private(CUSTOMER)
 */
const getProfile = asyncHandler(async (req,res)=>{
    const customer = req.customer;

    try{
        const employee = await Employee.findById(customer.supervisor);

        return res.json({
            _uid: customer._id,
            user_name: customer.user_name,
            email: customer.email,
            balance: customer.balance,
            date_created: customer.createdAt,
            supervisor: employee.user_name,
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
    if(!('amount' in req.body)){
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

/**
 * @desc   Get all deposits
 * @route  GET  /deposit
 * @access private(CUSTOMER)
 */
const getDeposits = asyncHandler(async (req,res)=>{
    const customer = req.customer;

    try{
        const allDeposits = await Deposit.find({
            toCustomer: customer._id,
        });

        const output = [];

        for(let i=0;i<allDeposits.length;i++){
            output.push({
                "_id":allDeposits[i]._id,
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


/**
 * @desc   Withdraw money
 * @route  POST  /withdraw
 * @access private(CUSTOMER)
 */
const withdraw = asyncHandler(async (req,res)=>{
    if(!('amount' in req.body)){
        return res.status(400).send("Amount is required");
    }

    const {amount} = req.body;
    const customer = req.customer;

    try{
        if(amount<1){
            return res.status(400).send("You can not withdraw amount less than 1$")
        }

        const withdraw = await Withdraw.create({
            fromCustomer: customer._id,
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
 * @desc   Get all withdraw
 * @route  GET  /withdraw
 * @access private(CUSTOMER)
 */
const getWithdraws = asyncHandler(async (req,res)=>{
    const customer = req.customer;

    try{
        const allWithdraws = await Withdraw.find({
            fromCustomer: customer._id,
        });

        const output = [];

        for(let i=0;i<allWithdraws.length;i++){
            output.push({
                "_id":allWithdraws[i]._id,
                "status":allWithdraws[i].status,
                "amount":allWithdraws[i].amount,
                "date_created":allWithdraws[i].createdAt,
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
    withdraw,
    getWithdraws
};