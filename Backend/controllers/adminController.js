const Admin = require("../models/adminModel");
const asyncHandler = require("express-async-handler");
const { generateAdminToken } = require("../helpers/generateUsersToken");
const validator = require("validator");

/**
 * @desc   Create an admin
 * @route  POST  /api/admins
 * @access public
 */
const createAdmin = asyncHandler(async (req, res) => {
    if (!req.body.email || !req.body.password || !req.body.admin_name || !req.body.role) {
        return res.status(401).send("Invalid credentials");
    }

    var { email } = req.body
    email = validator.escape(email).trim();

    if (!validator.isEmail(email)) {
        return res.status(401).send("Invalid email format");
    }

    const findAdmin = await Admin.findOne({
        email: email
    });
    try {
        if (!findAdmin) {
            const newAdmin = await Admin.create({
                admin_name: req.body.admin_name,
                email: email,
                password: req.body.password,
                role: req.body.role,
            });
            return res.status(201).json({
                _aid: newAdmin?._id,
                admin_name: newAdmin?.admin_name,
                email: newAdmin?.email,
                role: newAdmin?.role,
                token: generateAdminToken(newAdmin?._id, newAdmin?.email),
            });
        } else {
            return res.status(409).send("Admin already exists");
        }
    } catch (e) {
        if (e.message.match(/(email|password|name|validation)/gi)) {
            return res.status(400).send(e.message);
        }
        return res.status(500).send("Ooops!! Something Went Wrong, Try again...");
    }
});

/**
 * @desc   Admin login
 * @route  POST  /api/admins/login
 * @access public
 */
const loginAdmin = asyncHandler(async (req, res) => {
    if (!req.body.email || !req.body.password) {
        return res.status(401).send("Invalid credentails");
    }

    var { email } = req.body;
    email = validator.escape(email).trim();

    if (!validator.isEmail(email)) {
        return res.status(401).send("Invalid email format")
    }

    // check if admin exists or not
    const findAdmin = await Admin.findOne({
        email: email
    });
    try {
        if (findAdmin && (await findAdmin.isPasswordMatched(req.body.password))) {
            return res.json({
                _aid: findAdmin?._id,
                admin_name: findAdmin?.admin_name,
                email: findAdmin?.email,
                role: findAdmin?.role,
                token: generateAdminToken(findAdmin?._id, findAdmin?.email),
            });
        } else {
            return res.status(401).send("Invalid credentials")
        }
    } catch (e) {
        if (e.message.match(/(email|password|validation)/gi)) {
            return res.status(400).send(e.message);
        }
        console.log(e.message)
        return res.status(500).send("Ooops!! Something Went Wrong, Try again...");
    }
});

/***
 * @desc   Get an admin
 * @route  GET  /api/admins/:id
 * @access private(ADMIN)
 */
const getAdminById = asyncHandler(async (req, res) => {
    let admin;
    try {
        admin = await Admin.findById(req.params.id);
        res.status(200).json({
            admin_name: admin.admin_name,
            email: admin.email,
            role: admin.role,
        });
    } catch (error) {
        if (!admin) return res.status(404).send("Admin not found!");
        res.status(500).send("Something went wrong!");
    }
});

module.exports = { createAdmin, loginAdmin, getAdminById };
