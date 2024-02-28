const mongoose = require("mongoose");

const transferSchema = new mongoose.Schema(
    {
        fromCustomer:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Customer',
        },
        toCustomer:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Customer',
        },
        fromMerchant:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Merchant',
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
        balance_transferred: {
            type: Number,
            require: [true, "Please Provide Transferred Balance!"],
            min: [1, "You Can Not Transfer Balance Less Than 1$"],
        },
    },
    {
        timestamps: true,
        collection: "Transfers",
    }
);

// Define Transfer Model
const Transfer = mongoose.model("Transfer", transferSchema);

module.exports = Transfer;