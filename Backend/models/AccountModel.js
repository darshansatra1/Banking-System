const mongoose = require("mongoose");

const transferredInSchema = new mongoose.Schema(
    {
        from:{
            type:String,
            require:[true,"Please provide the sender's account id"],
        },
        balance_transferred:{
            type: Number,
            require: [true,"Please provide the transfer amount"],
            min:[1.0, "You can not transfer balance less than 1$"],
        }
    },{
        timestamps: true,
});

const transferredOutSchema = new mongoose.Schema(
    {
        to: {
            type: String,
            require: [true, "Please provide recipient account id!"],
        },
        balance_transferred: {
            type: Number,
            require: [true, "Please Provide Transferred Balance!"],
            min: [1.0, "You can not transfer balance less than 1$"],
        },
    },
    {
        timestamps: true,
    }
);

const withdrawLogSchema = new mongoose.Schema(
    {
        withdraw_amount: {
            type: Number,
            require: [true, "Please provide withdraw Balance Amount"],
            min: [1.0, "You can not withdraw balance less than 1$"],
        },
    },
    {
        timestamps: true,
    }
);


const depositLogSchema = new mongoose.Schema(
    {
        deposit_amount: {
            type: Number,
            require: [true, "Please provide deposited Balance Amount"],
            min: [1.0, "You can not deposit balance less than 1$"],
        },
    },
    {
        timestamps: true,
    }
);

const accountSchema = new mongoose.Schema({
    client_id:{
        type:String,
        required: [true,"Please provide client id"],
        },
    balance:{
        type:Number,
        default:0,
        min:[0,"Balance can not be less than 0$"]
        },
    in:[transferredInSchema],
    out: [transferredOutSchema],
    deposit_logs: [depositLogSchema],
    withdraw_logs: [withdrawLogSchema],
    },
    {
    timestamps:true,
    collation:"Accounts"
});

const Account = mongoose.model("Account", accountSchema);

module.exports = Account;
