const mongoose = require('mongoose');
const bcrypt = require("bcrypt");
const validator = require('validator');

var merchantSchema = new mongoose.Schema({
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
    address: {
        type:String,
        required: [true, "Please enter your address!"],
    },
    phone_number: {
        type: String,
        required: [true, "Please enter your mobile number!"],
        trim: true,
        validate: {
            validator: function(value) {
                return /^\+?([1-9]{1}[0-9]{2}[-\s]\d{3}[-\s]\d{4})?$/.test(value);
            },
            message: 'Invalid mobile number format. Please enter a 10-digit number (optional +1 country code).'
        }
    },
    balance:{
        type:Number,
        default:0,
        min:[0,"Balance can not be less than 0$"]
    },
    supervisor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Employee',
    },
}, {
    timestamps: true,
    collection: "Merchants",
});

merchantSchema.pre('save', async function (next) {
    const salt = await bcrypt.genSaltSync(parseInt(process.env.SALT_ROUNDS));
    this.password = await bcrypt.hash(this.password, salt);
});

merchantSchema.methods.isPasswordMatched = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
}

//Export the model
module.exports = mongoose.model('Merchant', merchantSchema);