const Admin = require("../models/AdminModel");
const Employee = require("../models/EmployeeModel");
const Manager = require("../models/ManagerModel");

const populateDb = async()=>{
    try {
        // Populating admin
        const admin = await Admin.findOne({
            email: "timcook1@gmail.com"
        });
        if (!admin) {
            const newAdmin = await Admin.create({
                user_name: "Tim Cook",
                email: "timcook1@gmail.com",
                password: "YzX3xU7F2df4GcNVWQ7Z",
            });
        }

        const manager = await Manager.findOne({
            email: "jonathanmartinez1@gmail.com"
        });
        if (!manager) {
            const newManager = await Manager.create({
                user_name: "Jonathan Martinez",
                email: "jonathanmartinez1@gmail.com",
                password: "YzX3xU7F2df4GcNVWQ7Z",
            });
        }

        //Populating employee
        const employee = await Employee.findOne({
            email: "sarahjohnson1@gmail.com"
        });
        if (!employee) {
            const manager = await Manager.findOne().sort({
                employeeCount:1
            }).limit(1);

            const newEmployee = await Employee.create({
                user_name: "Sarah Johnson",
                email: "sarahjohnson1@gmail.com",
                password: "YzX3xU7F2df4GcNVWQ7Z",
                supervisor: manager._id,
            });

            manager.employeeCount += 1;
            manager.employees.push(newEmployee._id);
            await manager.save();
        }
    }catch(error){
        console.log("Database population failed!");
    }
}


module.exports = {
    populateDb,
};