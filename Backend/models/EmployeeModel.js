const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator")

const employeeSchema = new mongoose.Schema(
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
        dob: {
            type: Date,
            required: [true, "Please enter your date of birth."],
            min: '1924-01-01',
            max: '2006-12-31'
        },
        userCount:{
            type: Number,
            default: 0,
        },
        users:[
            {
                role: String,
                _id: {
                    type: mongoose.Schema.Types.ObjectId,
                }
            }
        ],
        supervisor:{
            type: mongoose.Schema.Types.ObjectId,
            ref:'Manager',
        },
    },
    {
        timestamps: true,
        collection: "Employees",
    }
);

// Password hashing middleware
employeeSchema.pre('save', async function (next) {
    const salt = await bcrypt.genSaltSync(parseInt(process.env.SALT_ROUNDS));
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

employeeSchema.methods.isPasswordMatched = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
}

// Define Employee Model
const Employee = mongoose.model("Employee", employeeSchema);

module.exports = Employee;