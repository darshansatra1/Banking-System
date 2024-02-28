const Admin = require("../../models/AdminModel");
const asyncHandler = require("express-async-handler");
const { generateAdminToken } = require("../../helpers/generateAdminToken");
const validator = require("validator");
const Customer = require("../../models/CustomerModel");
const Deposit = require("../../models/DepositModel");
const Merchant = require("../../models/MerchantModel");


/**
 * @desc Get admin
 * @route POST /profile
 * @access private(ADMIN)
 */
const getProfile = asyncHandler(async (req,res)=>{
    const admin = req.admin;

    try{
        return res.json({
            _uid: admin._id,
            user_name: admin.user_name,
            email: admin.email,
        });
    }catch(error){
        return res.status(500).send("Ooops!! Something Went Wrong, Try again...");
    }
});


/**
 * @desc Get all the deposits
 * @route GET /deposit
 * @access private(ADMIN)
 */
const getDeposits = asyncHandler(async(req,res)=>{
    const admin = req.admin;

    try{
        const allDeposits = [];
        const deposits = await Deposit.find();

        for(let i=0;i<deposits.length;i++){
            const deposit = deposits[i];
            if(deposit.status!=="waiting"){
                continue;
            }
            if(deposit.toCustomer){
                const customer = await Customer.findById(deposit.toCustomer);

                allDeposits.push({
                    "_id":deposit._id,
                    "client_id":deposit.toCustomer,
                    "user_name":customer._id,
                    "status":deposit.status,
                    "amount":deposit.amount,
                    "date_created":deposit.createdAt,
                    "role":"customer"
                });
            }else{
                const merchant = await Merchant.findById(deposit.toMerchant);

                allDeposits.push({
                    "_id":deposit._id,
                    "client_id":deposit.toMerchant,
                    "user_name":merchant._id,
                    "status":deposit.status,
                    "amount":deposit.amount,
                    "date_created":deposit.createdAt,
                    "role":"merchant"
                });
            }
        }
        return res.status(200).json(allDeposits);
    }catch(error){
        return res.status(500).send("Ooops!! Something Went Wrong, Try again...");
    }
});


/**
 * @desc Accept or decline deposit request
 * @route POST /deposit/:id
 * @access private(ADMIN)
 */
const authorizeDeposit = asyncHandler(async(req,res)=>{
    const admin = req.admin;
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
    authorizeDeposit,
};