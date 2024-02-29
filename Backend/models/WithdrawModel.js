const mongoose = require("mongoose");

const withdrawSchema = new mongoose.Schema(
    {
        fromCustomer:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Customer',
        },
        fromMerchant:{
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
            require: [true, "Please provide withdraw amount!"],
            min: [1, "You can not withdraw amount less than 1$"],
        },
    },
    {
        timestamps: true,
        collection: "Withdraw",
    }
);

// Define Withdraw Model
const Withdraw = mongoose.model("Withdraw", withdrawSchema);

module.exports = Withdraw;