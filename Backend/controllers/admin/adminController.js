const Admin = require("../../models/AdminModel");
const asyncHandler = require("express-async-handler");
const { generateAdminToken } = require("../../helpers/generateAdminToken");
const validator = require("validator");
const Customer = require("../../models/CustomerModel");
const Deposit = require("../../models/DepositModel");
const Merchant = require("../../models/MerchantModel");
const Manager = require("../../models/ManagerModel");
const Employee = require("../../models/EmployeeModel");
const Withdraw = require("../../models/WithdrawModel");


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
            address: admin.address,
            phone_number: admin.phone_number,
            dob: admin.dob,
        });
    }catch(error){
        return res.status(500).send("Ooops!! Something Went Wrong, Try again...");
    }
});


/**
 * @desc Update admin
 * @route PUT /profile
 * @access private(ADMIN)
 */
const updateProfile = asyncHandler(async (req,res)=>{
    const admin = req.admin;

    try{
        if('address' in req.body){
            admin.address = req.body.address;
        }
        if('phone_number' in req.body){
            admin.phone_number = req.body.phone_number;
        }
        if('dob' in req.body){
            admin.dob = req.body.dob;
        }
        await admin.save();

        return res.json({
            _uid: admin._id,
            user_name: admin.user_name,
            email: admin.email,
            address: admin.address,
            phone_number: admin.phone_number,
            dob: admin.dob,
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
                    "user_name":customer.user_name,
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
                    "user_name":merchant.user_name,
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
        if(deposit.status!=="waiting"){
            return res.status(400).send("Transaction already authorized");
        }

        if(deposit.toCustomer && accept){
            const customer = await Customer.findById(deposit.toCustomer);
            customer.balance += deposit.amount;
            await customer.save();
        }
        if(deposit.toMerchant && accept){
            const merchant = await Merchant.findById(deposit.toMerchant);
            merchant.balance += deposit.amount;
            await merchant.save();
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
 * @desc Get all the withdrawal
 * @route GET /withdraw
 * @access private(ADMIN)
 */
const getWithdraws = asyncHandler(async(req,res)=>{
    const admin = req.admin;

    try{
        const allWithdraws = [];
        const withdraws = await Withdraw.find();

        for(let i=0;i<withdraws.length;i++){
            const withdraw = withdraws[i];
            if(withdraw.status!=="waiting"){
                continue;
            }
            if(withdraw.fromCustomer){
                const customer = await Customer.findById(withdraw.fromCustomer);

                allWithdraws.push({
                    "_id":withdraw._id,
                    "client_id":withdraw.fromCustomer,
                    "user_name":customer.user_name,
                    "status":withdraw.status,
                    "amount":withdraw.amount,
                    "date_created":withdraw.createdAt,
                    "role":"customer"
                });
            }else{
                const merchant = await Merchant.findById(deposit.fromMerchant);

                allWithdraws.push({
                    "_id":withdraw._id,
                    "client_id":withdraw.fromMerchant,
                    "user_name":merchant.user_name,
                    "status":withdraw.status,
                    "amount":withdraw.amount,
                    "date_created":withdraw.createdAt,
                    "role":"merchant"
                });
            }
        }
        return res.status(200).json(allWithdraws);
    }catch(error){
        return res.status(500).send("Ooops!! Something Went Wrong, Try again...");
    }
});


/**
 * @desc Accept or decline withdraw request
 * @route POST /withdraw/:id
 * @access private(ADMIN)
 */
const authorizeWithdraw = asyncHandler(async(req,res)=>{
    const admin = req.admin;
    const withdrawId = req.params.id;
    const {accept} = req.body;

    if(!('accept' in req.body)){
        return res.status(400).send("Please send the status");
    }

    try{
        const withdraw = await Withdraw.findById(withdrawId);
        if(!withdraw){
            return res.status(400).send("Not found!");
        }
        if(withdraw.status!=="waiting"){
            return res.status(400).send("Transaction already authorized");
        }

        if(withdraw.fromCustomer){
            const customer = await Customer.findById(withdraw.fromCustomer);
            if(accept){
                if(customer.balance<withdraw.amount){
                    return res.status(400).send("The customer does not have enough balance for this withdrawal");
                }
                customer.balance -= withdraw.amount;
                await customer.save();
            }
        }
        if(withdraw.fromMerchant){
            const merchant = await Merchant.findById(withdraw.fromMerchant);
            if(accept){
                if(merchant.balance < withdraw.amount){
                    return res.status(400).send("The merchant does not have enough balance for this withdrawal");
                }
                merchant.balance -= withdraw.amount;
                await merchant.save();
            }
        }

        if(accept){
            withdraw.status = "accept";
        }else{
            withdraw.status = "decline";
        }
        await withdraw.save();

        return res.status(200).json({
            success:true
        });
    }catch(error){
        return res.status(500).send("Ooops!! Something Went Wrong, Try again...");
    }
});


/**
 * @desc Get all user lists
 * @route GET /user
 * @access private(ADMIN)
 */
const getUsers = asyncHandler(async(req,res)=>{
    const admin = req.admin;

    try{
        const output = [];
        const customers = await Customer.find();
        for(let i=0;i<customers.length;i++){
            const customer = customers[i];
            const employee = await Employee.findById(customer.supervisor);
            const manager = await Manager.findById(employee.supervisor);

            output.push({
                "_id":customer._id,
                "role":"customer",
                "user_name":customer.user_name,
                "balance":customer.balance,
                "email":customer.email,
                "supervisor":employee.user_name,
                "manager":manager.user_name,
            });
        }

        const merchants = await Merchant.find();
        for(let i=0;i<merchants.length;i++){
            const merchant = merchants[i];
            const employee = await Employee.findById(merchant.supervisor);
            const manager = await Manager.findById(employee.supervisor);

            output.push({
                "_id":merchant._id,
                "role":"merchant",
                "user_name":merchant.user_name,
                "balance":merchant.balance,
                "email":merchant.email,
                "supervisor":employee.user_name,
                "manager":manager.user_name,
            });
        }

        const employees = await Employee.find();
        for(let i=0;i<employees.length;i++){
            const employee = employees[i];
            const manager = await Manager.findById(employee.supervisor);
            output.push({
                "_id":employee._id,
                "role":"employee",
                "user_name":employee.user_name,
                "email":employee.email,
                "manager":manager.user_name,
            });
        }

        const managers = await Manager.find();
        for(let i=0;i<managers.length;i++){
            const manager = managers[i];

            output.push({
                "_id":manager._id,
                "role":"manager",
                "user_name":manager.user_name,
                "email":manager.email,
            });
        }

        return res.status(200).send(output);
    }catch(error){
        return res.status(500).send("Ooops!! Something Went Wrong, Try again...");
    }
});


/**
 * @desc Get user by id
 * @route GET /user/:id
 * @access private(ADMIN)
 */
const getUserById = asyncHandler(async(req,res)=>{
    if(!("role" in req.query)){
        return res.status(400).send("Please specify role");
    }
    if(req.query.role!=="customer" && req.query.role!=="merchant" && req.query.role!=="manager" && req.query.role!=="employee"){
        return res.status(400).send("Wrong role");
    }

    const admin = req.admin;

    try{
        if(req.query.role==="customer"){
            const customer = await Customer.findById(req.params.id);
            const employee = await Employee.findById(customer.supervisor);
            const manager = await Manager.findById(employee.supervisor);

            return res.json({
                _uid: customer._id,
                user_name: customer.user_name,
                email: customer.email,
                balance: customer.balance,
                date_created: customer.createdAt,
                supervisor: employee.user_name,
                manager:manager.user_name,
                role:"customer",
                phone_number: customer.phone_number,
                dob: customer.dob,
                address:customer.address,
                status: customer.is_active,
            });
        }else if(req.query.role==="merchant"){
            const merchant = await Merchant.findById(req.params.id);
            const employee = await Employee.findById(merchant.supervisor);
            const manager = await Manager.findById(employee.supervisor);

            return res.json({
                _uid: merchant._id,
                user_name: merchant.user_name,
                email: merchant.email,
                balance: merchant.balance,
                date_created: merchant.createdAt,
                supervisor: employee.user_name,
                manager:manager.user_name,
                role:"merchant",
                phone_number: merchant.phone_number,
                dob: merchant.dob,
                address:merchant.address,
                status: merchant.is_active,
            });
        }else if(req.query.role === "employee"){
            const employee = await Employee.findById(req.params.id);
            const manager = await Manager.findById(employee.supervisor);

            return res.json({
                _uid: employee._id,
                user_name: employee.user_name,
                email: employee.email,
                date_created: employee.createdAt,
                manager:manager.user_name,
                role:"employee",
                phone_number: employee.phone_number,
                dob: employee.dob,
                address:employee.address,
            });
        }else{
            const manager = await Manager.findById(req.params.id);
            return res.json({
                _uid: manager._id,
                user_name: manager.user_name,
                email: manager.email,
                date_created: manager.createdAt,
                role:"manager",
                phone_number: manager.phone_number,
                dob: manager.dob,
                address:manager.address,
            });
        }
    }catch(error){
        return res.status(500).send("Ooops!! Something Went Wrong, Try again...");
    }
});


/**
 * @desc Get user deposit by user id
 * @route GET /user/:id/deposit
 * @access private(ADMIN)
 */
const getUserDepositLogs = asyncHandler(async(req,res)=>{
    if(!('role' in req.query)){
        return res.status(400).send("Please send the role");
    }
    if(req.query.role!=="customer" && req.query.role!=="merchant"){
        return res.status(400).send("Please send the current role");
    }
    try{
        if(req.query.role=="customer"){
            const customer = await Customer.findById(req.params.id);
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
 * @desc Get user withdraw by user id
 * @route GET /user/:id/withdraw
 * @access private(ADMIN)
 */
const getUserWithdrawLogs = asyncHandler(async(req,res)=>{
    if(!('role' in req.query)){
        return res.status(400).send("Please send the role");
    }
    if(req.query.role!=="customer" && req.query.role!=="merchant"){
        return res.status(400).send("Please send the current role");
    }

    try{
        if(req.query.role=="customer"){
            const customer = await Customer.findById(req.params.id);
            const allWithdraws = await Withdraw.find({
                fromCustomer: customer._id,
            });
            const logs = [];
            for(let i=0;i<allWithdraws.length;i++){
                const withdraw = allWithdraws[i];
                logs.push({
                    "_id":withdraw._id,
                    "status":withdraw.status,
                    "amount":withdraw.amount,
                    "date_created":withdraw.createdAt,
                });
            }
            return res.status(200).send(logs);
        }else{
            const merchant = await Merchant.findById(req.params.id);
            const allWithdraws = await Withdraw.find({
                fromMerchant: merchant._id,
            });
            const logs = [];
            for(let i=0;i<allWithdraws.length;i++){
                const withdraw = allWithdraws[i];
                logs.push({
                    "_id":withdraw._id,
                    "status":withdraw.status,
                    "amount":withdraw.amount,
                    "date_created":withdraw.createdAt,
                });
            }
            return res.status(200).send(logs);
        }
    }catch(error){
        return res.status(500).send("Ooops!! Something Went Wrong, Try again...");
    }
});


/**
 * @desc   Update user
 * @route  PUT /user/:id
 * @access private(Admin)
 */
const updateUserProfile = asyncHandler(async (req,res)=>{
    const admin = req.admin;

    if(!('role' in req.body)){
        return res.status(400).send("Role is required");
    }
    if(req.body.role!=="customer" && req.body.role!=="merchant" && req.body.role!=="manager" && req.body.role!=="employee") {
        return res.status(400).send("Wrong role");
    }

    const id = req.params.id;

    try{
        if(req.body.role==="customer") {
            const customer = await Customer.findById(id);

            if(customer.is_active === false){
                return res.status(401).send("User is not active");
            }

            if ('address' in req.body) {
                customer.address = req.body.address;
            }
            if ('phone_number' in req.body) {
                customer.phone_number = req.body.phone_number;
            }

            await customer.save();

            return res.status(200).json({
                success: true
            });
        }else if(req.body.role==="merchant"){
            const merchant = await Merchant.findById(id);

            if(merchant.is_active === false){
                return res.status(401).send("User is not active");
            }

            if ('address' in req.body) {
                merchant.address = req.body.address;
            }
            if ('phone_number' in req.body) {
                merchant.phone_number = req.body.phone_number;
            }

            await merchant.save();

            return res.status(200).json({
                success: true
            });
        }else if(req.body.role==="employee"){
            const employee = await Employee.findById(id);

            if ('address' in req.body) {
                employee.address = req.body.address;
            }
            if ('phone_number' in req.body) {
                employee.phone_number = req.body.phone_number;
            }

            await employee.save();

            return res.status(200).json({
                success: true
            });
        }else{
            const manager = await Manager.findById(id);

            if ('address' in req.body) {
                manager.address = req.body.address;
            }
            if ('phone_number' in req.body) {
                manager.phone_number = req.body.phone_number;
            }

            await manager.save();

            return res.status(200).json({
                success: true
            });
        }
    }catch(error){
        if (error.message.match(/(email|password|name|phone|addresee|dob|date)/gi))
            return res.status(400).send(error.message);
        return res.status(500).send("Ooops!! Something Went Wrong, Try again...");
    }
});


/**
 * @desc   Update user
 * @route  PUT /user/:id/status
 * @access private(ADMIN)
 */
const updateUserStatus = asyncHandler(async (req,res)=>{
    const admin = req.admin;

    if(!('role' in req.body)){
        return res.status(400).send("Role is required");
    }
    if(req.body.role!=="customer" && req.body.role!=="merchant") {
        return res.status(400).send("Wrong role");
    }
    if(!("status" in req.body)){
        return res.statsu(400).send("Status is required");
    }

    const id = req.params.id;
    const {status} = req.body;

    try{
        if(req.body.role==="customer") {
            const customer = await Customer.findById(id);

            if(status === true){
                customer.is_active = true;
            }else if(status === false){
                customer.is_active = false;
                const deposits = await Deposit.find({
                    toCustomer: id,
                    status: "waiting",
                });

                for (const deposit of deposits) {
                    deposit.status = "decline";
                    await deposit.save();
                }

                const withdrawals = await Withdraw.find({
                    fromCustomer: id,
                    status: "waiting",
                });

                for (const withdraw of withdrawals) {
                    withdraw.status = "decline";
                    await withdraw.save();
                }
            }

            await customer.save();

            return res.status(200).json({
                success: true
            });
        }else{
            const merchant = await Merchant.findById(id);

            if(status === true){
                merchant.is_active = true;
            }else if(status === false){
                merchant.is_active = false;
                const deposits = await Deposit.find({
                    toMerchant: id,
                    status: "waiting",
                });

                for (const deposit of deposits) {
                    deposit.status = "decline";
                    await deposit.save();
                }

                const withdrawals = await Withdraw.find({
                    fromMerchant: id,
                    status: "waiting",
                });

                for (const withdraw of withdrawals) {
                    withdraw.status = "decline";
                    await withdraw.save();
                }
            }

            await merchant.save();

            return res.status(200).json({
                success: true
            });
        }
    }catch(error){
        if (error.message.match(/(email|password|name|phone|addresee|dob|date)/gi))
            return res.status(400).send(error.message);
        return res.status(500).send("Ooops!! Something Went Wrong, Try again...");
    }
});


module.exports = {
    getProfile,
    updateProfile,
    getDeposits,
    authorizeDeposit,
    getWithdraws,
    authorizeWithdraw,
    getUsers,
    getUserById,
    getUserDepositLogs,
    getUserWithdrawLogs,
    updateUserProfile,
    updateUserStatus
};