const Manager = require("../../models/ManagerModel");
const Employee = require("../../models/EmployeeModel");
const Customer = require("../../models/CustomerModel");
const Deposit = require("../../models/DepositModel");
const Merchant = require("../../models/MerchantModel");
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


/**
 * @desc Get all the deposits
 * @route GET /deposit
 * @access private(MANAGER)
 */
const getDeposits = asyncHandler(async(req,res)=>{
    const manager = req.manager;

    try{
        const allDeposits = [];
        for(let i=0;i<manager.employees.length;i++){
            const employeeId = manager.employees[i];
            const employee = await Employee.findById(employeeId);

            for(let j=0;j<employee.users.length;j++){
                const user = employee.users[j];
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
                            "role":"customer",
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
                            "role":"merchant",
                        });
                    }
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
 * @access private(MANAGER)
 */
const authorizeDeposit = asyncHandler(async(req,res)=>{
    const manager = req.manager;
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
            const employee = await Employee.findById(customer.supervisor);
            if(employee.supervisor.toString()!==manager._id.toString()){
                return res.status(401).send("You are not authorized");
            }
            if(accept){
                customer.balance += deposit.amount;
                await customer.save();
            }
        }

        if(deposit.toMerchant){
            const merchant = await Merchant.findById(deposit.toMerchant);
            const employee = await Employee.findById(merchant.supervisor);
            if(employee.supervisor.toString()!==manager._id.toString()){
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


module.exports = {
    getProfile,
    getDeposits,
    authorizeDeposit
};