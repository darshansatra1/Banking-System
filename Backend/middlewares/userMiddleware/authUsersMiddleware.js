const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../../models/userModel");

const authUserProtect = asyncHandler(async (req, res, next) => {
    let token, user, decoded;
    if (req.headers.authorization && req.headers.authorization.trim().startsWith("Bearer")) {
        try {
            token = req.headers.authorization.split(" ")[1];
            decoded = jwt.verify(token, process.env.JWT_SECRET);
            user = await User.findById(decoded.id);
            if (!user) {
                return res.status(401).send("Not authorized");
            }
            req.user = user;
            next();
        } catch (error) {
            if (!decoded || !user) {
                return res.status(401).send("Not authorized");
            }
            return res.status(500).send("Something went wrong");
        }
    } else {
        return res.status(401).send("Not authorized");
    }
})

module.exports = { authUserProtect };