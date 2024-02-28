const User = require("../../models/CustomerModel");

// check account balance before credit or transfer
const checkBalance = async(req,res,next)=>{
    if(req.body.debit){
        if(req.body.debit <= req.user.balance){
            return next();
        }
        return res.status(400).send("Balance not enough for withdrawal!");
    }
    if(req.body.transfer){
        if(req.body.transfer <= req.user.balance){
            return next();
        }
        return res.status(400).send("Balance not enough for transfer!");
    }
    return res.status(500).send("Ooops!! Something Went Wrong, Try again...");
}

module.exports = {
    checkBalance,
}