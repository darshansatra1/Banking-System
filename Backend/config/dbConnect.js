const { mongoose } = require("mongoose");
const {populateDb} = require("../helpers/populateDb");

const dbConnect = async() => {
    try {
        let conn = null;
        if(process.env.NODE_ENV === "development"){
            conn = mongoose.connect(process.env.MONGODB_URL);
        }else{
            conn = mongoose.connect(process.env.PROD_MONGODB_URL);
        }
        console.log("Database connected succesfully")
        await populateDb();
    } catch (error) {
        console.log("Database error");
    }
}

module.exports = dbConnect