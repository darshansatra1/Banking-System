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
                        allDeposits.push({
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
                        allDeposits.push({
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
        }
        res.status(200).json(allDeposits);
    }catch(error){
        return res.status(500).send("Ooops!! Something Went Wrong, Try again...");
    }
});


module.exports = {
    getProfile,
    getDeposits,
};