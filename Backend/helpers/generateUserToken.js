const jwt = require("jsonwebtoken");

const generateUserToken = (id, email, role) => {
    return jwt.sign({ id, email, role }, process.env.JWT_SECRET);
};

module.exports = {
    generateUserToken: generateUserToken,
};