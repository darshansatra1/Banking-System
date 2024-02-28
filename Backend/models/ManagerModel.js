const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator")

const managerSchema = new mongoose.Schema(
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
        password: {
            type: String,
            required: [true, "Please Type A Strong Password!"],
        },
        employeeCount:{
            type: Number,
            default: 0,
        },
        employees:[
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Employee'
            }
        ],
    },
    {
        timestamps: true,
        collection: "Managers",
    }
);

// Password hashing middleware
managerSchema.pre('save', async function (next) {
    const salt = await bcrypt.genSaltSync(parseInt(process.env.SALT_ROUNDS));
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

managerSchema.methods.isPasswordMatched = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
}

// Define Employee Model
const Manager = mongoose.model("Manager", managerSchema);

module.exports = Manager;