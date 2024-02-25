const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");
const { generateUserToken } = require("../helpers/generateUserToken");
const validator = require("validator")

/**
 * @desc   Create a user
 * @route  POST  /api/users
 * @access public
 */
const createUser = asyncHandler(async (req, res) => {
    if (!req.body.email || !req.body.password || !req.body.user_name || !req.body.role) {
        return res.status(401).send("Invalid credentials");
    }

    var { email } = req.body
    email = validator.escape(email).trim();

    if (!validator.isEmail(email)) {
        return res.status(401).send("Invalid email format");
    }

    const findUser = await User.findOne({
        email: email
    });
    try {
        if (!findUser) {
            const newUser = await User.create({
                user_name: req.body.user_name,
                email: email,
                password: req.body.password,
                role: req.body.role,
                user_status: 0,
            });
            return res.status(201).json({
                _uid: newUser?._id,
                user_name: newUser?.user_name,
                email: newUser?.email,
                role: newUser?.role,
                token: generateUserToken(newUser?._id, newUser?.email, newUser?.role),
            });
        } else {
            return res.status(409).send("User already exists");
        }
    } catch (e) {
        if (e.message.match(/(email|password|name|validation)/gi)) {
            return res.status(400).send(e.message);
        }
        return res.status(500).send("Ooops!! Something Went Wrong, Try again...");
    }
});

/**
 * @desc   User login
 * @route  POST  /api/users/login
 * @access public
 */
const loginUser = asyncHandler(async (req, res) => {
    if (!req.body.email || !req.body.password) {
        return res.status(401).send("Invalid credentails");
    }

    var { email } = req.body;
    email = validator.escape(email).trim();

    if (!validator.isEmail(email)) {
        return res.status(401).send("Invalid email format")
    }

    // check if user exists or not
    const findUser = await User.findOne({
        email: email
    });
    try {
        if (findUser && (await findUser.isPasswordMatched(req.body.password))) {
            return res.json({
                _uid: findUser?._id,
                user_name: findUser?.user_name,
                email: findUser?.email,
                role: findUser?.role,
                token: generateUserToken(findUser?._id, findUser?.email, findUser?.role),
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
 * @desc   Get a user
 * @route  GET  /api/users/:id
 * @access private(USER)
 */
const getUserById = asyncHandler(async (req, res) => {
    let user;
    try {
        user = await User.findById(req.params.id);
        res.status(200).json({
            user_name: user.user_name,
            email: user.email,
            role: user.role,
        });
    } catch (error) {
        if (!user) return res.status(404).send("User not found!");
        res.status(500).send("Something went wrong!");
    }
});

/***
 * @desc   Update a user
 * @route  PUT  /api/users/:id
 * @access private(USER)
 */
const updateUserById = asyncHandler(async(req,res)=>{
    try{
        const user = await User.findById(req.params.id);
        if(user.user_name !== req.body.user_name){
            const findUser = await User.findOne({
                user_name:req.body.user_name
            });
            if(!findUser){
                user.user_name = req.body.user_name;
                user.markModified("user_name");
            }else{
                return res.status(409).send("This username is taken, please some different name");
            }

        }
        const updatedUser = await user.save();

        res.status(200).json({
            _uid: updatedUser._uid,
            user_name: updatedUser.user_name,
            email:updatedUser.email,
            role:updatedUser.role,
        })
    }catch (error){
        if(error.message.match(/(email|name)/gi)){
            return res.status(400).send(error.message);
        }
        return res.status(500).send("Something went wrong!");
    }
})


module.exports = { createUser, loginUser, getUserById, updateUserById };