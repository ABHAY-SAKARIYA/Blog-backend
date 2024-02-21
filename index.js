// Load env variables
if(process.env.NODE_ENV != "production"){
    require("dotenv").config();
}


// Import Dependencies
const express = require("express");
const connectToDb = require("./config/connect");
const postController = require("./controller/postController");
const cors = require("cors");

// Connecting to DB
connectToDb();

const app = express();

app.use(express.json());
app.use(cors());


// Routes.
app.use("/data",postController);


// Start
app.listen(process.env.PORT);