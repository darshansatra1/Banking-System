const mongoose = require('mongoose');
const bcrypt = require("bcrypt");
const validator = require('validator');

var merchantSchema = new mongoose.Schema({
    user_name: {
        type: String,
        required: [true, "Please Type A User Name!"],
        trim: true,
        validate: {
            validator: function (v) {
                let regex = new RegExp(
                    "^(?=[a-zA-Z0-9._ ]{10,35}$)(?!.*[_.]{2})[^_.].*[^_.]$"
                    /*   no >>> _ or . at the beginning
                    no >>>__ or _. or ._ or .. inside
                    no >>> _ or . at the end
                    [a-zA-Z0-9._] >> allowed characters
                    username is {10-35} characters long
                    */
                );
                return regex.test(v);
            },
            message: "Please Enter A Valid User Name!",
        },
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
    balance:{
        type:Number,
        default:0,
        min:[0,"Balance can not be less than 0$"]
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