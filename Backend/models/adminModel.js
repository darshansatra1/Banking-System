const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator")

const adminSchema = new mongoose.Schema(
  {
    admin_name: {
      type: String,
      required: [true, "Please Type your Name!"],
      validate: {
        validator: function (v) {
          let regex = new RegExp(
            "^(?=[a-zA-Z0-9._ ]{10,35}$)(?!.*[_.]{2})[^_.].*[^_.]$"
            /*  no >>> _ or . at the beginning
              no >>>__ or _. or ._ or .. inside 
              no >>> _ or . at the end
              [a-zA-Z0-9._] >> allowed characters
              username is {10-} characters long
              */
          );
          return regex.test(v);
        },
        message: "Please Enter A Valid Name!",
      },
    },
    email: {
      type: String,
      required: [true, "Please Type An Email!"],
      unique: true,
      validate: {
        validator: function (v) {
          let regex = new RegExp("[a-z0-9]+@[a-z]+.[a-z]{2,3}");
          return regex.test(v);
        },
        message: "Please Enter A Valid Email!",
      },
    },
    password: {
      type: String,
      required: [true, "Please Type A Strong Password!"],
    },
    role: {
      type: String,
      required: [true, "Please Set The Admin Role!"],
      enum: {
        values: ["admin", "owner", "administrator", "manager", "employee"],
        message: "{VALUE} is not supported as a Role",
      },
    },
  },
  {
    timestamps: true,
    collection: "Admins",
  }
);

// Password hashing middleware
adminSchema.pre('save', async function (next) {
    const salt = await bcrypt.genSaltSync(10); // Use a predefined number of rounds for salt generation
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// Define Admin Model
const Admin = mongoose.model("Admin", adminSchema);

module.exports = Admin;
