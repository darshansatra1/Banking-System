const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const Customer = require("../../models/CustomerModel");

const authCustomerProtect = asyncHandler(async (req, res, next) => {
    let token, customer, decoded;
    if (req.headers.authorization && req.headers.authorization.trim().startsWith("Bearer")) {
        try {
            token = req.headers.authorization.split(" ")[1];
            decoded = jwt.verify(token, process.env.JWT_SECRET);
            customer = await Customer.findById(decoded.id);
            if (!customer) {
                return res.status(401).send("Not authorized");
            }
            req.customer = customer;
            next();
        } catch (error) {
            if (!decoded || !customer) {
                return res.status(401).send("Not authorized");
            }
            return res.status(500).send("Something went wrong");
        }
    } else {
        return res.status(401).send("Not authorized");
    }
})

module.exports = { authCustomerProtect };