const Customer = require("../../models/CustomerModel");
const Merchant = require("../../models/MerchantModel");
const Employee = require("../../models/EmployeeModel");
const Manager = require("../../models/ManagerModel");
const Admin = require("../../models/AdminModel");

const register = async (req, res) => {

    if (req.body.role === "customer") {
        const customer = await Customer.findOne({
            email: req.body.email,
        });
        if(customer){
            return res.status(400).send("User already exists");
        }
        return await registerCustomer(req, res);
    }


    if (req.body.role === "merchant") {
        const merchant = await Merchant.findOne({
            email: req.body.email,
        });
        if(merchant){
            return res.status(400).send("User already exists");
        }
        return await registerMerchant(req, res);
    }

    if (req.body.role === "employee") {
        const employee = await Employee.findOne({
            email: req.body.email,
        });
        if(employee){
            return res.status(400).send("User already exists");
        }
        return await registerEmployee(req, res);
    }

    if (req.body.role === "manager") {
        const manager = await Manager.findOne({
            email: req.body.email,
        });
        if(manager){
            return res.status(400).send("User already exists");
        }
        return await registerManager(req, res);
    }

    if(req.body.role==="admin"){
        const admin = await Admin.findOne({
            email: req.body.email,
        });
        if(admin){
            return res.status(400).send("User already exists");
        }
        return await registerAdmin(req, res);
    }

    return res.status(400).send("Invalid credentials")
}

const registerCustomer = async (req, res) => {
    try{
        const employee = await Employee.findOne().sort({
            userCount:1
        }).limit(1);

        if(!employee){
            return res.status(400).send("Currently, system has no registered employee");
        }

        const newCustomer = await Customer.create({
            user_name: req.body.user_name,
            email: req.body.email,
            password: req.body.password,
            balance:500,
            supervisor: employee._id,
            address: req.body.address,
            phone_number: req.body.phone_number,
            dob: req.body.dob,
        });

        employee.userCount += 1;
        employee.users.push({
            role:"customer",
            _id: newCustomer._id,
        });

        await employee.save();

        return res.status(201).json({
            success: true,
        });
    }catch(error){
        return res.status(500);
    }
}

const registerMerchant = async (req, res) => {
    try{
        const employee = await Employee.findOne().sort({
            userCount:1
        }).limit(1);

        if(!employee){
            return res.status(400).send("Currently, system has no registered employee");
        }

        const newMerchant = await Merchant.create({
            user_name: req.body.user_name,
            email: req.body.email,
            password: req.body.password,
            balance:500,
            supervisor: employee._id,
            address: req.body.address,
            phone_number: req.body.phone_number,
            dob: req.body.dob,
        });

        employee.userCount += 1;
        employee.users.push({
            role:"merchant",
            _id: newMerchant._id,
        });

        await employee.save();

        return res.status(201).json({
            success: true,
        });
    }catch(error){
        return res.status(500);
    }
}
const registerEmployee = async (req, res) => {
    try{
        const manager = await Manager.findOne().sort({
            employeeCount:1
        }).limit(1);

        if(!manager){
            return res.status(400).send("Currently, system has no registered manager");
        }

        const newEmployee = await Employee.create({
            user_name: req.body.user_name,
            email: req.body.email,
            password: req.body.password,
            supervisor: manager._id,
            address: req.body.address,
            phone_number: req.body.phone_number,
            dob: req.body.dob,
        });

        manager.employeeCount += 1;
        manager.employees.push(newEmployee._id);

        await manager.save();

        return res.status(201).json({
            success: true,
        });
    }catch(error){
        return res.status(500);
    }
}
const registerManager = async (req, res) => {
    const newManager = await Manager.create({
        user_name: req.body.user_name,
        email: req.body.email,
        password: req.body.password,
        address: req.body.address,
        phone_number: req.body.phone_number,
        dob: req.body.dob,
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
        address: req.body.address,
        phone_number: req.body.phone_number,
        dob: req.body.dob,
    });
    return res.status(201).json({
        success:true,
    });
}

module.exports = {
    register,
}

