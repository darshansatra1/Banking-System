const User = require("../../models/CustomerModel");
const bycrpt = require("bcrypt");
const asyncHandler = require("express-async-handler");
//
//
/***
 * Validate Password before Hashing it
 * @useCase :- when guest/user register/update an account.
 */
const validatePassword = (req, res, next) => {
    //check for empty request first
    if (Object.keys(req.body).length === 0) {
        return res.status(400).send("empty body request");
    }

    let regex = new RegExp(
        "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{12,})"
    );
    /*
      (?=.*[a-z])>>The string must contain at least 1 lowercase alphabetical character
      (?=.*[A-Z])>>The string must contain at least 1 uppercase alphabetical character
      (?=.*[0-9])>>The string must contain at least 1 numeric character
      (?=.*[!@#$%^&*])>>The string must contain at least one special character, 
      but we are escaping reserved RegEx characters to avoid conflict
      (?=.{8,})>>The string must be eight characters or longer */

    //Invalid Password
    if (!regex.test(req.body.password)) {
        return res.status(400).send("Not a Valid Password");
    }
    // Valid Password
    return next();
};

const checkPassword = asyncHandler(async (req, res, next) => {
    try{
        const user = req.user;
        if(await user.isPasswordMatched(req.body.password)){
            return next();
        }else{
            return res.status(400).send("Wrong password!");
        }
    }catch(error){
        return res.status(500).send("Ooops!! Something Went Wrong, Try again...");
    }
});

module.exports = {
    validatePassword,
    checkPassword
}