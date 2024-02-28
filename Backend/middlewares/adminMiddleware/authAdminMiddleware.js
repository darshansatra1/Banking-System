const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const Admin = require("../../models/AdminModel");

const authAdminProtect = asyncHandler(async (req, res, next) => {
    let token, admin, decoded;

    if (req.headers.authorization && req.headers.authorization.trim().startsWith("Bearer")) {
        try {
            token = req.headers.authorization.split(" ")[1];
            decoded = jwt.verify(token, process.env.JWT_SECRET);
            admin = await Admin.findById(decoded.id);

            if (!admin) {
                return res.status(401).send("Not authorized");
            }

            req.admin = admin;
            next();
        } catch (error) {
            if (!decoded || !(await Admin.findById(decoded.id))) {
                return res.status(401).send("Not authorized");
            }
            return res.status(500).send("Something went wrong");
        }
    } else {
        return res.status(401).send("Not authorized");
    }
});

module.exports = { authAdminProtect};