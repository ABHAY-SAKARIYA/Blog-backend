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

module.exports = Post;