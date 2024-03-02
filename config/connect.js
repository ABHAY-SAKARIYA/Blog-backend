<<<<<<< HEAD
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


=======
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


>>>>>>> a53d9f9b55b9d458ac4dc5ef275e7fa810374a4b
module.exports = connectToDb;