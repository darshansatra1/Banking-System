const Customer = require("../../models/CustomerModel");
const Deposit = require("../../models/DepositModel");
const Withdraw = require("../../models/WithdrawModel");
const Employee = require("../../models/EmployeeModel");
const Otp = require("../../models/OtpModel");
const transporter = require("../../config/mailer");

const asyncHandler = require("express-async-handler");
const nodemailer = require("nodemailer");


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
            address: customer.address,
            phone_number: customer.phone_number,
            dob: customer.dob,
            date_created: customer.createdAt,
            supervisor: employee.user_name,
        });
    }catch(error){
        return res.status(500).send("Ooops!! Something Went Wrong, Try again...");
    }
});

/**
 * @desc   Update customer
 * @route  PUT /profile
 * @access private(CUSTOMER)
 */
const updateProfile = asyncHandler(async (req,res)=>{
    const customer = req.customer;

    try{
        if('address' in req.body){
            customer.address = req.body.address;
        }
        if('phone_number' in req.body){
            customer.phone_number = req.body.phone_number;
        }
        if('dob' in req.body){
            customer.dob = req.body.dob;
        }
        await customer.save();

        const employee = await Employee.findById(customer.supervisor);

        return res.json({
            _uid: customer._id,
            user_name: customer.user_name,
            email: customer.email,
            balance: customer.balance,
            address: customer.address,
            phone_number: customer.phone_number,
            dob: customer.dob,
            date_created: customer.createdAt,
            supervisor: employee.user_name,
        });
    }catch(error){
        if (error.message.match(/(email|password|name|phone|addresee|dob|date)/gi))
            return res.status(400).send(error.message);
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
    if(!('otp' in req.body)){
        return res.status(400).send("OTP is required");
    }

    const {amount,otp} = req.body;
    const customer = req.customer;

    try{
        if(amount<1){
            return res.status(400).send("You can not deposit amount less than 1$")
        }

        const verifiedOtp = await Otp.findOne({
            customerUserId: customer._id,
            code: otp,
            expiresAt: {
                $gt: Date.now()
            }
        });

        if(verifiedOtp){
            await Otp.deleteOne({_id: verifiedOtp._id});
            const deposit = await Deposit.create({
                toCustomer: customer._id,
                status:"waiting",
                amount: amount,
            });

            return res.status(201).json({
                success:true
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
 * @desc   Get OTP
 * @route  GET  /otp
 * @access private(CUSTOMER)
 */
const getOtp = asyncHandler(async (req,res)=>{
    const customer = req.customer;

    try{

        const otp = Math.floor(Math.random() * 1000000).toString().padStart(6, '0');
        const mailOptions = {
            from: 'sbs@gmail.com',
            to: customer.email,
            subject: 'Your OTP for SBS',
            text: `Your OTP is ${otp}`,
        };

        const existingOTp = await Otp.findOne({
            customerUserId: customer._id
        }).sort({createdAt: -1});

        if(existingOTp && existingOTp.expiresAt > Date.now()){
            return res.status(201).json({
                message:"An OTP is already active, you can use that to authenticate"
            })
        }

        const newOtp = new Otp({customerUserId: customer._id,code:otp,expiresAt: Date.now() + 60*2*1000}); // Expires in 2 minutes
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
    if(!('otp' in req.body)){
        return res.status(400).send("OTP is required");
    }

    const {amount,otp} = req.body;
    const customer = req.customer;

    try{
        if(amount<1){
            return res.status(400).send("You can not withdraw amount less than 1$")
        }
        if(amount>customer.balance){
            return res.status(400).send("You don't have enough balance for the withdrawal");
        }

        const verifiedOtp = await Otp.findOne({
            customerUserId: customer._id,
            code: otp,
            expiresAt: {
                $gt: Date.now()
            }
        });

        if(verifiedOtp){
            await Otp.deleteOne({_id: verifiedOtp._id});

            const withdraw = await Withdraw.create({
                fromCustomer: customer._id,
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
    updateProfile,
    deposit,
    getOtp,
    getDeposits,
    withdraw,
    getWithdraws
};