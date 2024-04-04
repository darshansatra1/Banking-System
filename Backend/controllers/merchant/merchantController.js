const Merchant = require("../../models/MerchantModel");
const Deposit = require("../../models/DepositModel");
const asyncHandler = require("express-async-handler");
const { generateUserToken } = require("../../helpers/generateUserToken");
const validator = require("validator");
const Employee = require("../../models/EmployeeModel");
const Withdraw = require("../../models/WithdrawModel");
const transporter = require("../../config/mailer");
const Otp = require("../../models/OtpModel");
const Customer = require("../../models/CustomerModel");
const Bill = require("../../models/BillModel");

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
            address: merchant.address,
            phone_number: merchant.phone_number,
            dob: merchant.dob,
            date_created: merchant.createdAt,
            supervisor: employee.user_name,
        });
    }catch(error){
        return res.status(500).send("Ooops!! Something Went Wrong, Try again...");
    }
});

/**
 * @desc Update merchant
 * @route PUT /profile
 * @access private(MERCHANT)
 */
const updateProfile = asyncHandler(async (req,res)=>{
    const merchant = req.merchant;

    try{

        if('address' in req.body){
            merchant.address = req.body.address;
        }
        if('phone_number' in req.body){
            merchant.phone_number = req.body.phone_number;
        }

        await merchant.save();
        const employee = await Employee.findById(merchant.supervisor);

        return res.json({
            _uid: merchant._id,
            user_name: merchant.user_name,
            email: merchant.email,
            balance: merchant.balance,
            address: merchant.address,
            phone_number: merchant.phone_number,
            dob: merchant.dob,
            date_created: merchant.createdAt,
            supervisor: employee.user_name,
        });
    }catch(error){
        if (error.message.match(/(email|password|name|phone|addresee|dob|date)/gi))
            return res.status(400).send(error.message);
        return res.status(500).send("Ooops!! Something Went Wrong, Try again...");
    }
});

/**
 * @desc   Get OTP
 * @route  GET /otp
 * @access private(MERCHANT)
 */
const getOtp = asyncHandler(async (req,res)=>{
    const merchant = req.merchant;

    try{
        const otp = Math.floor(Math.random() * 1000000).toString().padStart(6, '0');
        const mailOptions = {
            from: 'sbs@gmail.com',
            to: merchant.email,
            subject: 'Your OTP for SBS',
            text: `Your OTP is ${otp}`,
        };

        const existingOTp = await Otp.findOne({
            merchantUserId: merchant._id
        }).sort({createdAt: -1});

        if(existingOTp && existingOTp.expiresAt > Date.now()){
            return res.status(201).json({
                message:"An OTP is already active, you can use that to authenticate"
            })
        }

        const newOtp = new Otp({merchantUserId: merchant._id,code:otp,expiresAt: Date.now() + 60*2*1000}); // Expires in 2 minutes
        await newOtp.save();

        await transporter.sendMail(mailOptions);

        return res.status(200).json({
            message:'OTP sent succesfully'
        });
    }catch(error){
        if (error.message.match(/(Balance|Account|validation|deposit)/gi))
            return res.status(400).send(error.message);
        res.status(500).send("Ooops!! Something Went Wrong, Try again...");
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
    if(!('otp' in req.body)){
        return res.status(400).send("OTP is required");
    }

    const {amount,otp} = req.body;
    const merchant = req.merchant;

    try{
        if(amount<1){
            return res.status(400).send("You can not deposit amount less than 1$")
        }

        const verifiedOtp = await Otp.findOne({
            merchantUserId: merchant._id,
            code: otp,
            expiresAt: {
                $gt: Date.now()
            }
        });

        if(verifiedOtp){
            await Otp.deleteOne({_id: verifiedOtp._id});
            const deposit = await Deposit.create({
                toMerchant: merchant._id,
                status:"waiting",
                amount: amount,
            });
            return res.status(201).json({
                success: true,
            })
        }else{
            return res.status(401).json({
                message:"Invalid OTP"
            });
        }
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
 * @access private(MERCHANT)
 */
const withdraw = asyncHandler(async (req,res)=>{
    if(!('amount' in req.body)){
        return res.status(400).send("Amount is required");
    }
    if(!('otp' in req.body)){
        return res.status(400).send("OTP is required");
    }

    const {amount,otp} = req.body;
    const merchant = req.merchant;

    try{
        if(amount<1){
            return res.status(400).send("You can not withdraw amount less than 1$")
        }

        if(amount>merchant.balance){
            return res.status(400).send("You don't have enough balance for the withdrawal");
        }

        const verifiedOtp = await Otp.findOne({
            merchantUserId: merchant._id,
            code: otp,
            expiresAt: {
                $gt: Date.now()
            }
        });

        if(verifiedOtp){
            await Otp.deleteOne({_id: verifiedOtp._id});
            const withdraw = await Withdraw.create({
                fromMerchant: merchant._id,
                status:"waiting",
                amount: amount,
            });
            return res.status(201).json({
                success: true,
            });
        }else{
            return res.status(401).json({
                message:"Invalid OTP"
            });
        }
    }catch(error){
        if (error.message.match(/(Balance|Account|validation|deposit)/gi))
            return res.status(400).send(error.message);
        res.status(500).send("Ooops!! Something Went Wrong, Try again...");
    }
});


/**
 * @desc   Get all withdraws
 * @route  GET  /withdraw
 * @access private(MERCHANT)
 */
const getWithdraws = asyncHandler(async (req,res)=>{
    const merchant = req.merchant;

    try{
        const allWithdraws = await Withdraw.find({
            fromMerchant: merchant._id,
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

/**
 * @desc   Create bill
 * @route  POST  /bill
 * @access private(MERCHANT)
 */
const createBill = asyncHandler(async (req,res)=>{
    if(!('amount' in req.body)){
        return res.status(400).send("Amount is required");
    }
    if(!('description' in req.body)){
        return res.status(400).send("Description is required");
    }
    if(!('account_id' in req.body)){
        return res.status(400).send("Account Id is required");
    }
    if(!('otp' in req.body)){
        return res.status(400).send("OTP is required");
    }

    const {amount,otp, description, account_id} = req.body;
    const merchant = req.merchant;

    try{
        if(amount<1){
            return res.status(400).send("You can not have amount less than 1$")
        }

        const verifiedOtp = await Otp.findOne({
            merchantUserId: merchant._id,
            code: otp,
            expiresAt: {
                $gt: Date.now()
            }
        });

        if(verifiedOtp){
            await Otp.deleteOne({_id: verifiedOtp._id});

            var customer = await Customer.findById(account_id);

            if(!customer){
                return res.status(404).send("You have provided the wrong Account Id");
            }

            const bill = await Bill.create({
                merchant: merchant._id,
                customer: customer._id,
                status: "pending",
                description: description,
                amount: amount,
            });

            return res.status(201).json({
                success: true,
            })
        }else{
            return res.status(401).json({
                message:"Invalid OTP"
            });
        }
    }catch(error){
        if (error.message.match(/(Amount|Account|validation|account|id)/gi))
            return res.status(400).send(error.message);
        res.status(500).send("Ooops!! Something Went Wrong, Try again...");
    }
});

/**
 * @desc   Get bills
 * @route  GET /bills
 * @access private(MERCHANT)
 */
const getBills = asyncHandler(async (req,res)=>{
    const merchant = req.merchant;

    try{
        const allBills = await Bill.find({
            merchant: merchant._id,
        });


        const output = [];

        for(let i=0;i<allBills.length;i++){
            var customer = await Customer.findById(allBills[i].customer);

            output.push({
                "_id":allBills[i]._id,
                "status":allBills[i].status,
                "amount":allBills[i].amount,
                "date_created":allBills[i].createdAt,
                "merchant":merchant.user_name,
                "customer":customer.user_name,
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
 * @desc   Get bills
 * @route  GET /bill/:id
 * @access private(MERCHANT)
 */
const getBillById = asyncHandler(async (req,res)=>{
    const merchant = req.merchant;
    const id = req.params.id;

    try{
        const bill = await Bill.findById(id);
        if(!bill){
            return res.status(404).send("Bill not found");
        }
        if(bill.merchant.toString()!==merchant._id.toString()){
            return res.status(401).send("You are not authorized");
        }

        var customer = await Customer.findById(bill.customer);

        return res.status(200).json({
            _id:bill._id,
            status: bill.status,
            amount: bill.amount,
            description: bill.description,
            account_id: bill.customer,
            customer: customer.user_name,
        });
    }catch(error){
        if (error.message.match(/(Balance|Account|validation|deposit)/gi))
            return res.status(400).send(error.message);
        res.status(500).send("Ooops!! Something Went Wrong, Try again...");
    }
});

module.exports = {
    getProfile,
    updateProfile,
    getOtp,
    deposit,
    getDeposits,
    withdraw,
    getWithdraws,
    createBill,
    getBills,
    getBillById
};