const Employee = require("../../models/EmployeeModel");
const Deposit = require("../../models/DepositModel");
const Customer = require("../../models/CustomerModel");
const Merchant = require("../../models/MerchantModel");
const asyncHandler = require("express-async-handler");
const { generateAdminToken } = require("../../helpers/generateAdminToken");
const validator = require("validator");

/**
 * @desc Get employee
 * @route POST /profile
 * @access private(EMPLOYEE)
 */
const getProfile = asyncHandler(async (req,res)=>{
    const employee = req.employee;

    try{
        return res.json({
            _uid: employee._id,
            user_name: employee.user_name,
            email: employee.email,
        });
    }catch(error){
        return res.status(500).send("Ooops!! Something Went Wrong, Try again...");
    }
});

/**
 * @desc Get all the deposits
 * @route GET /deposit
 * @access private(EMPLOYEE)
 */
const getDeposits = asyncHandler(async(req,res)=>{
    const employee = req.employee;

    try{
        const allDeposits = [];
        for(let i=0;i<employee.users.length;i++){
            const user = employee.users[i];
            if(user.role==="customer"){
                const customer = await Customer.findById(user._id);
                const customerDeposits= await Deposit.find({
                    toCustomer: customer._id,
                });

                for(const deposit of customerDeposits){
                    if(deposit.status!=="waiting"){
                        continue;
                    }
                    allDeposits.push({
                        "_id":deposit._id,
                        "client_id":deposit.toCustomer,
                        "user_name":customer.user_name,
                        "status":deposit.status,
                        "amount":deposit.amount,
                        "date_created":deposit.createdAt,
                        "role":"customer"
                    });
                }
            }else if(user.role==="merchant"){
                const merchant = await Merchant.findById(user._id);
                const merchantDeposits= await Deposit.find({
                    toMerchant: merchant._id,
                });

                for(const deposit of merchantDeposits){
                    if(deposit.status!=="waiting"){
                        continue;
                    }
                    allDeposits.push({
                        "_id":deposit._id,
                        "client_id":deposit.toMerchant,
                        "user_name":merchant.user_name,
                        "status":deposit.status,
                        "amount":deposit.amount,
                        "date_created":deposit.createdAt,
                        "role":"merchant"
                    });
                }
            }
        }
        res.status(200).json(allDeposits);
    }catch(error){
        return res.status(500).send("Ooops!! Something Went Wrong, Try again...");
    }
});


/**
 * @desc Accept or decline deposit request
 * @route POST /deposit/:id
 * @access private(EMPLOYEE)
 */
const authorizeDeposit = asyncHandler(async(req,res)=>{
    const employee = req.employee;
    const depositId = req.params.id;
    const {accept} = req.body;

    if(!('accept' in req.body)){
        return res.status(400).send("Please send the status");
    }

    try{
        const deposit = await Deposit.findById(depositId);
        if(!deposit){
            return res.status(400).send("Not found!");
        }
        if(deposit.status!="waiting"){
            return res.status(400).send("Transaction already authorized");
        }

        if(deposit.toCustomer){
            const customer = await Customer.findById(deposit.toCustomer);
            if(customer.supervisor.toString()!==employee._id.toString()){
                return res.status(401).send("You are not authorized");
            }
            if(accept){
                customer.balance += deposit.amount;
                await customer.save();
            }
        }
        if(deposit.toMerchant){
            const merchant = await Merchant.findById(deposit.toMerchant);
            if(merchant.supervisor!==employee._id){
                return res.status(401).send("You are not authorized");
            }
            if(accept){
                merchant.balance += deposit.amount;
                await merchant.save();
            }
        }
        if(accept){
            deposit.status = "accept";
        }else{
            deposit.status = "decline";
        }
        await deposit.save();

        return res.status(200).json({
            success:true
        });
    }catch(error){
        return res.status(500).send("Ooops!! Something Went Wrong, Try again...");
    }
});


/**
 * @desc Get user deposit by user id
 * @route GET /user/:id/deposit
 * @access private(EMPLOYEE)
 */
const getUserDepositLogs = asyncHandler(async(req,res)=>{
    if(!('role' in req.body)){
        return res.status(400).send("Please send the role");
    }
    if(req.body.role!=="customer"||req.body.role!=="merchant"){
        return res.status(400).send("Please send the currect role");
    }
    const employee = req.employee;
    try{
        if(req.body.role=="customer"){
            const customer = await Customer.findById(req.params.id);
            if(customer.supervisor.toString()!==employee._id.toString()){
                return res.status(401).send("You are not authorized");
            }
            const allDeposits = await Deposit.find({
                toCustomer: customer._id,
            });
            const logs = [];
            for(let i=0;i<allDeposits.length;i++){
                const deposit = allDeposits[i];
                logs.push({
                    "_id":deposit._id,
                    "status":deposit.status,
                    "amount":deposit.amount,
                    "date_created":deposit.createdAt,
                });
            }
            return res.status(200).send(logs);
        }else{
            const merchant = await Merchant.findById(req.params.id);
            if(merchant.supervisor.toString()!==employee._id.toString()){
                return res.status(401).send("You are not authorized");
            }
            const allDeposits = await Deposit.find({
                toMerchant: merchant._id,
            });
            const logs = [];
            for(let i=0;i<allDeposits.length;i++){
                const deposit = allDeposits[i];
                logs.push({
                    "_id":deposit._id,
                    "status":deposit.status,
                    "amount":deposit.amount,
                    "date_created":deposit.createdAt,
                });
            }
            return res.status(200).send(logs);
        }
    }catch(error){
        return res.status(500).send("Ooops!! Something Went Wrong, Try again...");
    }
});

/**
 * @desc Get all user lists
 * @route GET /user
 * @access private(EMPLOYEE)
 */
const getUsers = asyncHandler(async(req,res)=>{
    const employee = req.employee;

    try{
        const output = [];
        for(let i=0;i<employee.users.length;i++){
            const user = employee.users[i];
            if(user.role=="customer"){
                const customer = await Customer.findById(user._id);
                output.push({
                    "_id":customer._id,
                    "role":"customer",
                    "user_name":customer.user_name,
                    "balance":customer.balance,
                });
            }else{
                const merchant = await Merchant.findById(user._id);
                output.push({
                    "_id":merchant._id,
                    "role":"merchant",
                    "user_name":merchant.user_name,
                    "balance":merchant.balance,
                });
            }
        }
        res.status(200).send(output);
    }catch(error){
        return res.status(500).send("Ooops!! Something Went Wrong, Try again...");
    }
});





module.exports = {
    getProfile,
    getDeposits,
    authorizeDeposit,
    getUserDepositLogs,
    getUsers,
};