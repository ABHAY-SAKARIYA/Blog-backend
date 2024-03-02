<<<<<<< HEAD
// Import Dependencies
const mongoose = require("mongoose");

// Post Schema

const postSchema = new mongoose.Schema({
    username:{
        type : String,
        default : "abhay"
    },
    title:{
        type : String,
        required : true
    },
    author:{
        type : String,
        required : true
    },
    desc:{
        type : String,
        required : true
    },
    ctype:{
        type : String,
        required : true
    },
    date:{
        type : Date,
        default : Date.now
    }
});

// Model
const Post = mongoose.model("Post",postSchema);

=======
// Import Dependencies
const mongoose = require("mongoose");

// Post Schema

const postSchema = new mongoose.Schema({
    username:{
        type : String,
        default : "abhay"
    },
    title:{
        type : String,
        required : true
    },
    author:{
        type : String,
        required : true
    },
    desc:{
        type : String,
        required : true
    },
    date:{
        type : Date,
        default : Date.now
    }
});

// Model
const Post = mongoose.model("Post",postSchema);

>>>>>>> a53d9f9b55b9d458ac4dc5ef275e7fa810374a4b
module.exports = Post;