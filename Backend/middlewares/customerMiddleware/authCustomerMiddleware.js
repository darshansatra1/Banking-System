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

            if(customer.is_active === false){
                return res.status(404).send("User not found");
            }
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
});

const checkPassword = asyncHandler(async (req, res, next) => {
    try{
        if(!req.body.password){
            return res.status(400).send("Please provide password");
        }

        const customer = req.customer;
        if(await customer.isPasswordMatched(req.body.password)){
            return next();
        }else{
            return res.status(400).send("Wrong password!");
        }
    }catch(error){
        return res.status(500).send("Ooops!! Something Went Wrong, Try again...");
    }
});

module.exports = { authCustomerProtect,checkPassword};