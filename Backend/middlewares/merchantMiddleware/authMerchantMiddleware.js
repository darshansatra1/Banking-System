const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const Merchant = require("../../models/MerchantModel");

const authMerchantProtect = asyncHandler(async (req, res, next) => {
    let token, merchant, decoded;
    if (req.headers.authorization && req.headers.authorization.trim().startsWith("Bearer")) {
        try {
            token = req.headers.authorization.split(" ")[1];
            decoded = jwt.verify(token, process.env.JWT_SECRET);
            merchant = await Merchant.findById(decoded.id);
            if (!merchant) {
                return res.status(401).send("Not authorized");
            }
            req.merchant = merchant;
            next();
        } catch (error) {
            if (!decoded || !merchant) {
                return res.status(401).send("Not authorized");
            }
            return res.status(500).send("Something went wrong");
        }
    } else {
        return res.status(401).send("Not authorized");
    }
})

module.exports = { authMerchantProtect };