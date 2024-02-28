const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const Manager = require("../../models/ManagerModel");

const authManagerProtect = asyncHandler(async (req, res, next) => {
    let token, manager, decoded;
    if (req.headers.authorization && req.headers.authorization.trim().startsWith("Bearer")) {
        try {
            token = req.headers.authorization.split(" ")[1];
            decoded = jwt.verify(token, process.env.JWT_SECRET);
            manager = await Manager.findById(decoded.id);
            if (!manager) {
                return res.status(401).send("Not authorized");
            }
            req.manager = manager;
            next();
        } catch (error) {
            if (!decoded || !manager) {
                return res.status(401).send("Not authorized");
            }
            return res.status(500).send("Something went wrong");
        }
    } else {
        return res.status(401).send("Not authorized");
    }
})

module.exports = { authManagerProtect };