const mongoose = require('mongoose');
const bcrypt = require("bcrypt");
const validator = require('validator');

var customerSchema = new mongoose.Schema({
    user_name: {
        type: String,
        required: [true, "Please Type A User Name!"],
        trim: true,
    },
    email: {
        type: String,
        required: [true, "Please Type An Email!"],
        unique: true,
        trim: true,
        lowercase: true, // Normalize email to lowercase for case-insensitive comparisons
        validate: {
            validator: validator.isEmail,
            message: 'Invalid email format'
        }
    },
    password: {
        type: String,
        required: [true, "Please Type A Password!"],
    },
    balance: {
        type: Number,
        default: 0,
        min: [0, "Balance can not be less than 0$"]
    },
    supervisor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Employee',
    },
}, {
    timestamps: true,
    collection: "Customers",
});

customerSchema.pre('save', async function (next) {
    const salt = await bcrypt.genSaltSync(parseInt(process.env.SALT_ROUNDS));
    this.password = await bcrypt.hash(this.password, salt);
});

customerSchema.methods.isPasswordMatched = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
}

//Export the model
module.exports = mongoose.model('Customer', customerSchema);