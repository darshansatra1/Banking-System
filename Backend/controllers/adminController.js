const Admin = require("../models/adminModel");
const asyncHandler = require("express-async-handler");
const { generateAdminToken } = require("../helpers/generateAdminToken");
const validator = require("validator");

/**
 * @desc   Create an internal user
 * @route  POST  /api/admin
 * @access public
 */
const createAdmin = asyncHandler(async (req, res) => {
    if (!req.body.email || !req.body.password || !req.body.user_name || !req.body.role) {
        return res.status(401).send("Invalid credentials");
    }
    if(req.body.role==="administrator"){
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
                user_name: req.body.user_name,
                email: email,
                password: req.body.password,
                role: req.body.role,
            });
            return res.status(201).json({
                _uid: newAdmin?._id,
                user_name: newAdmin?.user_name,
                email: newAdmin?.email,
                role: newAdmin?.role,
                token: generateAdminToken(newAdmin?._id, newAdmin?.email,newAdmin?.role),
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
 * @desc   Internal user login
 * @route  POST  /api/admin/login
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
                _uid: findAdmin?._id,
                user_name: findAdmin?.user_name,
                email: findAdmin?.email,
                role: findAdmin?.role,
                token: generateAdminToken(findAdmin?._id, findAdmin?.email, findAdmin?.role),
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
 * @desc   Get an admin by id
 * @route  GET  /api/admin/:id
 * @access private(ADMIN)
 */
const getAdminById = asyncHandler(async (req, res) => {
    let admin;
    try {
        admin = await Admin.findById(req.params.id);
        res.status(200).json({
            user_name: admin.user_name,
            email: admin.email,
            role: admin.role,
        });
    } catch (error) {
        if (!admin) return res.status(404).send("Admin not found!");
        res.status(500).send("Something went wrong!");
    }
});

/***
 * @desc   Update admin by id
 * @route  PUT  /api/admin/:id
 * @access private(ADMINISTRATOR)
 */
const updateAdminById = asyncHandler(async (req,res)=>{
    try{
        const admin = await Admin.findById(req.params.id);

        if(admin.user_name !== req.body.user_name){
            const findAdmin = await Admin.findOne({
                user_name: req.body.user_name
            });
            if(!findAdmin){
                admin.user_name = req.body.user_name;
                admin.markModified("user_name");
            }else{
                return res.status(409).send("This username is taken, please some different name");
            }
        }
        const updatedAdmin = await admin.save();

        res.status(200).json({
            _uid: updatedAdmin._uid,
            user_name: updatedAdmin.user_name,
            email:updatedAdmin.email,
            role:updatedAdmin.role,
        })
    }catch(error){
        if(error.message.match(/(email|name|validation)/gi)){
            return res.status(400).send(error.messsage);
        }
        return res.status(500).send("Something went wrong!");
    }
});

/***
 * @desc   Get admin
 * @route  GET  /api/admin
 * @access private(ADMIN)
 */
const getAdmin = asyncHandler(async (req, res) => {
    let admin = req.admin;
    try {
        res.status(200).json({
            _uid: admin._id,
            user_name: admin.user_name,
            email: admin.email,
            role: admin.role,
        });
    } catch (error) {
        res.status(500).send("Something went wrong!");
    }
});

/***
 * @desc   Update admin
 * @route  PUT  /api/admin
 * @access private(ADMIN)
 */
const updateAdmin = asyncHandler(async (req,res)=>{
    try{
        let admin = req.admin;
        if(admin.user_name !== req.body.user_name){
            const findAdmin = await Admin.findOne({
                user_name: req.body.user_name
            });
            if(!findAdmin){
                admin.user_name = req.body.user_name;
                admin.markModified("user_name");
            }else{
                return res.status(409).send("This username is taken, please some different name");
            }
        }
        const updatedAdmin = await admin.save();

        res.status(200).json({
            _uid: updatedAdmin._uid,
            user_name: updatedAdmin.user_name,
            email:updatedAdmin.email,
            role:updatedAdmin.role,
        })
    }catch(error){
        if(error.message.match(/(email|name|validation)/gi)){
            return res.status(400).send(error.messsage);
        }
        return res.status(500).send("Something went wrong!");
    }
});

/**
 * @desc   Create an Administrator
 * @route  POST  /api/admin/administrator/register
 * @access public
 */
const createAdministrator = asyncHandler(async (req, res) => {
    if (!req.body.email || !req.body.password || !req.body.user_name) {
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
                user_name: req.body.user_name,
                email: email,
                password: req.body.password,
                role: "administrator",
            });
            return res.status(201).json({
                _uid: newAdmin?._id,
                user_name: newAdmin?.user_name,
                email: newAdmin?.email,
                role: newAdmin?.role,
                token: generateAdminToken(newAdmin?._id, newAdmin?.email,newAdmin?.role),
            });
        } else {
            return res.status(409).send("Administrator already exists");
        }
    } catch (e) {
        if (e.message.match(/(email|password|name|validation)/gi)) {
            return res.status(400).send(e.message);
        }
        return res.status(500).send("Ooops!! Something Went Wrong, Try again...");
    }
});

module.exports = { createAdmin, loginAdmin, getAdminById, getAdmin, updateAdmin, createAdministrator,updateAdminById };