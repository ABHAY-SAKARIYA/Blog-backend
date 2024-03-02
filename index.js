<<<<<<< HEAD
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
=======
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
>>>>>>> a53d9f9b55b9d458ac4dc5ef275e7fa810374a4b
app.listen(process.env.PORT);