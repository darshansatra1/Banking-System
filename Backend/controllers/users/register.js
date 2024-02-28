const Customer = require("../../models/CustomerModel");
const Merchant = require("../../models/MerchantModel");
const Employee = require("../../models/EmployeeModel");
const Manager = require("../../models/ManagerModel");
const Admin = require("../../models/AdminModel");

const register = async (req, res) => {
    const customer = await Customer.findOne({
        email: req.body.email,
    });
    const merchant = await Merchant.findOne({
        email: req.body.email,
    });
    const employee = await Employee.findOne({
        email: req.body.email,
    });
    const manager = await Manager.findOne({
        email: req.body.email,
    });
    const admin = await Admin.findOne({
        email: req.body.email,
    });

    if(customer || merchant || employee || manager || admin){
        return res.status(400).send("User already exists");
    }


    if (req.body.role === "customer") {
        return await registerCustomer(req, res);
    }


    if (req.body.role === "merchant") {
        return await registerMerchant(req, res);
    }

    if (req.body.role === "employee") {
        return await registerEmployee(req, res);
    }

    if (req.body.role === "manager") {
        return await registerManager(req, res);
    }

    if(req.body.role==="admin"){
        if (!admin) {
            return await registerAdmin(req, res);
        } else {
            return res.status(400).send("User already exists");
        }
    }

    return res.status(400).send("Invalid credentials")
}

const registerCustomer = async (req, res) => {
    try{
        const newCustomer = await Customer.create({
            user_name: req.body.user_name,
            email: req.body.email,
            password: req.body.password,
            balance:500,
        });
        return res.status(201).json({
            success: true,
        });
    }catch(error){
        return res.status(500);
    }

}

const registerMerchant = async (req, res) => {
    const newMerchant = await Merchant.create({
        user_name: req.body.user_name,
        email: req.body.email,
        password: req.body.password,
        balance:500,
    });
    return res.status(201).json({
        success: true,
    });
}
const registerEmployee = async (req, res) => {
    const newEmployee = await Employee.create({
        user_name: req.body.user_name,
        email: req.body.email,
        password: req.body.password,
    });
    return res.status(201).json({
        success:true,
    });
}
const registerManager = async (req, res) => {
    const newManager = await Manager.create({
        user_name: req.body.user_name,
        email: req.body.email,
        password: req.body.password,
    });
    return res.status(201).json({
        success:true,
    });
}

const registerAdmin = async (req, res, admin) => {
    const newAdmin = await Admin.create({
        user_name: req.body.user_name,
        email: req.body.email,
        password: req.body.password,
    });
    return res.status(201).json({
        success:true,
    });
}

module.exports = {
    register,
}

