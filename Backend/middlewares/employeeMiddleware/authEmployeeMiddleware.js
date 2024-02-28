const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const Employee = require("../../models/EmployeeModel");

const authEmployeeProtect = asyncHandler(async (req, res, next) => {
    let token, employee, decoded;
    if (req.headers.authorization && req.headers.authorization.trim().startsWith("Bearer")) {
        try {
            token = req.headers.authorization.split(" ")[1];
            decoded = jwt.verify(token, process.env.JWT_SECRET);
            employee = await Employee.findById(decoded.id);
            if (!employee) {
                return res.status(401).send("Not authorized");
            }
            req.employee = employee;
            next();
        } catch (error) {
            if (!decoded || !employee) {
                return res.status(401).send("Not authorized");
            }
            return res.status(500).send("Something went wrong");
        }
    } else {
        return res.status(401).send("Not authorized");
    }
})

module.exports = { authEmployeeProtect };