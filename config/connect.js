// Load ENV File
if (process.env.NODE_ENV != "production"){
    require("dotenv").config();
}

// Import Dependencies
const mongoose = require("mongoose");


const connectToDb = async () => {
    try{
        await mongoose.connect(process.env.DB_URL);
        console.log("connect to Db");
    }catch(err){
        console.log(err);
    }
};


module.exports = connectToDb;