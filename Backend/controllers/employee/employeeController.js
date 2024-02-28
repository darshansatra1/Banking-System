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
                    allDeposits.push({
                        "client_id":deposit.toCustomer,
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

module.exports = {
    getProfile,
    getDeposits,
};