const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator")

const adminSchema = new mongoose.Schema(
    {
        user_name: {
            type: String,
            required: [true, "Please Type your Name!"],
            trim: true,
        },
        email: {
            type: String,
            required: [true, "Please Type An Email!"],
            unique: true,
            trim:true,
            lowercase:true,
            validate: {
                validator: validator.isEmail,
                message: 'Invalid email format'
            }
        },
        address: {
            type:String,
            required: [true, "Please enter your address!"],
        },
        phone_number: {
            type: String,
            required: [true, "Please enter your mobile number!"],
            trim: true,
        },
        password: {
            type: String,
            required: [true, "Please Type A Strong Password!"],
        },
    },
    {
        timestamps: true,
        collection: "Admins",
    }
);

// Password hashing middleware
adminSchema.pre('save', async function (next) {
    const salt = await bcrypt.genSaltSync(parseInt(process.env.SALT_ROUNDS));
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

adminSchema.methods.isPasswordMatched = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
}

// Define Admin Model
const Admin = mongoose.model("Admin", adminSchema);

module.exports = Admin;