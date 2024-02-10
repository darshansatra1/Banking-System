const mongoose = require('mongoose');
const bcrypt = require("bcrypt");
var validator = require('validator');

var userSchema = new mongoose.Schema({
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
    role: {
        type: String,
        required: true,
        enum: ['customer', 'merchant'],
        default: 'customer'
    },
    user_status: {
        type: Number,
        default: 0, //active , 1 >> unactive, 2 >>suspended
    },
    //TODO: Add account schema
}, {
    timestamps: true,
    collection: "Users",
});

userSchema.pre('save', async function (next) {
    const salt = await bcrypt.genSaltSync(process.SALT_ROUNDS);
    this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.isPasswordMatched = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
}

//Export the model
module.exports = mongoose.model('User', userSchema);