const mongoose = require("mongoose");

const depositSchema = new mongoose.Schema(
    {
        toCustomer:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Customer',
        },
        toMerchant:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Merchant',
        },
        status:{
            type: String,
            enum:{
                values:["waiting","accept","decline"],
            }
        },
        amount: {
            type: Number,
            require: [true, "Please provide deposit amount!"],
            min: [1, "You can not deposit amount less than 1$"],
        },
    },
    {
        timestamps: true,
        collection: "Deposits",
    }
);

// Define Deposit Model
const Deposit = mongoose.model("Deposit", depositSchema);

module.exports = Deposit;