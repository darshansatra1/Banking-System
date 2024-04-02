const Customer = require("../../models/CustomerModel");
const Merchant = require("../../models/MerchantModel");
const Employee = require("../../models/EmployeeModel");
const Manager = require("../../models/ManagerModel");
const Admin = require("../../models/AdminModel");
const {generateUserToken} = require("../../helpers/generateUserToken");
const {generateAdminToken} = require("../../helpers/generateAdminToken");

const login  = async(req,res)=>{
    const customer = await Customer.findOne({
        email: req.body.email,
    });
    if(customer){
        return await loginCustomer(req,res,customer);
    }

    const merchant = await Merchant.findOne({
        email: req.body.email,
    });
    if(merchant){
        return await loginMerchant(req,res,merchant);
    }


    const employee = await Employee.findOne({
        email: req.body.email,
    });
    if(employee){
        return await loginEmployee(req,res,employee);
    }


    const manager = await Manager.findOne({
        email: req.body.email,
    });
    if(manager){
        return await loginManager(req,res,manager);
    }


    const admin = await Admin.findOne({
        email: req.body.email,
    });
    if(admin){
        return await loginAdmin(req,res,admin);
    }

    return res.status(401).send("Invalid credentials")
}

const loginCustomer = async(req,res,customer)=>{
    if(customer.is_active === false){
        return res.status(404).send("User not found");
    }
    if(customer.isPasswordMatched(req.body.password)) {
        return res.json({
            _uid: customer?._id,
            user_name: customer?.user_name,
            email: customer?.email,
            balance: customer?.balance,
            role:"customer",
            token: generateUserToken(customer?._id, customer?.email, "customer"),
        });
    }else{
        return res.status(400).send("Invalid credentials");
    }
}

const loginMerchant = async(req,res,merchant)=>{
    if(merchant.is_active === false){
        return res.status(404).send("User not found");
    }
    if(merchant.isPasswordMatched(req.body.password)) {
        return res.json({
            _uid: merchant?._id,
            user_name: merchant?.user_name,
            email: merchant?.email,
            balance: merchant?.balance,
            role:"merchant",
            token: generateUserToken(merchant?._id, merchant?.email, "merchant"),
        });
    }else{
        return res.status(400).send("Invalid credentials");
    }
}
const loginEmployee = async(req,res,employee)=>{
    if(employee.isPasswordMatched(req.body.password)) {
        return res.json({
            _uid: employee?._id,
            user_name: employee?.user_name,
            email: employee?.email,
            role:"employee",
            token: generateAdminToken(employee?._id, employee?.email, "employee"),
        });
    }else{
        return res.status(400).send("Invalid credentials");
    }
}
const loginManager = async(req,res,manager)=>{
    if(manager.isPasswordMatched(req.body.password)) {
        return res.json({
            _uid: manager?._id,
            user_name: manager?.user_name,
            email: manager?.email,
            role:"manager",
            token: generateAdminToken(manager?._id, manager?.email, "manager"),
        });
    }else{
        return res.status(400).send("Invalid credentials");
    }
}

const loginAdmin = async(req,res,admin)=>{
    if(admin.isPasswordMatched(req.body.password)) {
        return res.json({
            _uid: admin?._id,
            user_name: admin?.user_name,
            email: admin?.email,
            role:"admin",
            token: generateAdminToken(admin?._id, admin?.email, "admin"),
        });
    }else{
        return res.status(400).send("Invalid credentials");
    }
}

module.exports = {
    login,
}

