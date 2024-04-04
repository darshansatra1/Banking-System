const mongoose = require("mongoose");

const BillSchema = new mongoose.Schema(
    {
        merchant:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Customer',
        },
        customer:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Customer',
        },
        status:{
            type: String,
            enum:{
                values:["pending","complete"],
            }
        },
        amount: {
            type: Number,
            require: [true, "Please Provide Amount!"],
            min: [1, "You can not have amount less than 1$"],
        },
    },
    {
        timestamps: true,
        collection: "Bills",
    }
);

// Define Transfer Model
const Bills = mongoose.model("Bill", BillSchema);

module.exports = Bills;