const { mongoose } = require("mongoose");
const {populateDb} = require("../helpers/populateDb");

const dbConnect = async() => {
    try {
        const conn = mongoose.connect(process.env.MONGODB_URL);
        console.log("Database connected succesfully")
        await populateDb();
    } catch (error) {
        console.log("Database error");
    }
}

module.exports = dbConnect