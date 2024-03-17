
const asyncHandler = require("express-async-handler");
const { generateUserToken } = require("../../helpers/generateUserToken");
const validator = require("validator")
const Customer = require("../../models/CustomerModel");
const {login} = require("./login");
const {register} = require("./register");


/**
 * @desc Create a user
 * @route POST /register
 * @access public
 */
const registerUser = asyncHandler(async (req,res)=>{
    if(!('email' in req.body) || !('password' in req.body) || !('user_name' in req.body) || !('role' in req.body) || !('address' in req.body) || !('phone_number' in req.body) || !('dob' in req.body)){
        return res.status(400).send("Invalid credentials");
    }

    var { email } = req.body;
    email = validator.escape(email).trim();
    req.body.email = email;

    if (!validator.isEmail(email)) {
        return res.status(400).send("Invalid email format");
    }

    try{
        return await register(req,res);
    }catch(error){
        if (error.message.match(/(email|password|name|validation)/gi)) {
            return res.status(400).send(error.message);
        }
        return res.status(500).send("Ooops!! Something Went Wrong, Try again...");
    }
});

/**
 * @desc   User login
 * @route  POST  /login
 * @access public
 */
const loginUser = asyncHandler(async (req, res) => {
    if (!req.body.email || !req.body.password) {
        return res.status(401).send("Invalid credentails");
    }

    var { email } = req.body;
    email = validator.escape(email).trim();
    req.body.email = email;

    if (!validator.isEmail(email)) {
        return res.status(401).send("Invalid email format")
    }

    try {
        return await login(req,res);
    } catch (error) {
        if (error.message.match(/(email|password|validation)/gi)) {
            return res.status(400).send(error.message);
        }
        return res.status(500).send("Ooops!! Something Went Wrong, Try again...");
    }
});

module.exports = {
    loginUser,
    registerUser
};