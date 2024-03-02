// import dependencies
const express = require("express");
const router = express.Router();
const Post = require("../model/post");
const { body, validationResult } = require("express-validator");
const connectToRedis = require("../config/redisConnect");

// Connecting to Redis and returning redis client to access redis methods
const client = connectToRedis();


// Route 1: Show Data ,Endpoint : /data/
router.get("/", async (req, res) => {
    try {
        // Find Data By Usernames
        const data = await Post.find({});

        return res.json({ data: data, type: "Success" });
    } catch (err) {
        return res.json({ msg: "Internal Server error", type: "error", erro: err });
    }
});



// Route 2: Add Data ,EndPoint : /data/add
router.post("/add", [
    body("title", "Enter Valid Title").isLength({ min: 5 }),
    body("author", "Enter Valid author name").isLength({ min: 3 }),
    body("desc", "Enter Valid Description").isLength({ min: 5 })
], async (req, res) => {
    try {
        // returning if any error in form validation.
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.json({ msg: "Enter Valid Values", type: "reject" });
        }

        // get Data From Request Body
        const { title, author, desc } = req.body;

        const postData = await Post.create({
            title: title,
            author: author,
            desc: desc
        });



        return res.json({ msg: "Data Added SuccessFul", type: "Success" });

    } catch (err) {
        return res.json({ msg: "Internal Server error", type: "error", err });
    }

});



// Route 3 Delete Data ,Endpoint : /data/del/:id
router.delete("/del/:id", async (req, res) => {
    try {

        // Post Id Get From url Params
        const postId = req.params.id;

        // Check If There Is any Data Available Based On Passes Id if Not Show Error Msg
        const findPost = await Post.findById(postId);

        if (!findPost) {
            return res.json({ msg: "No posts Found", type: "reject" });
        }

        // Deleting Post
        await Post.deleteOne({ _id: postId });

        return res.json({ msg: "Data Deleted SuccessFul", type: "Success" });
    } catch (err) {
        return res.json({ msg: "Internal Server error", type: "error" });
    }
});



// Route 4: Update data ,Endpoint : /data/update/:id
/*
router.put("/update/:id", [
    body("title","Enter Valid Title").isLength({ min:5 }),
    body("desc","Enter Valid Description").isLength({ min:5 }),
    body("author","Enter Valid author name").isLength({ min:3 })
] ,async (req,res) => {
    try{
        // returning if any error in form validation.
        const errors = validationResult(req);
        if (!errors.isEmpty()){
            return res.json({msg:"Enter Valid Values",type:"reject"});
        }

        // Post Id Get From url Params
        const postId = req.params.id;

        // Check If There Is any Data Available Based On Passed Id if Not Show Error Msg
        const findPost = await Post.findById(postId);
        
        if(!findPost){
            return res.json({msg:"No posts Found",type:"reject"});
        }

        // Get Values From Request Body
        const { title,author,desc } = req.body;

        // check feilds to be updated and save them to new Object
        const Newdata = {}

        if(title){Newdata.title = title};
        if(author){Newdata.author = author};
        if(desc){Newdata.desc = desc};

        // Update The Data
        await Post.findByIdAndUpdate(postId,Newdata);

        return res.json({msg:"Data Updated Successfully",type:"success"});

    }catch(err){
        return res.json({msg:"Internal Server error",type:"error",err});
    }

});
*/

// Reddis Middleware to Check if the data is already available or not for Route 5
const GetSingleReddisMiddleware = async (req, res, next) => {

    try {
        const postId = req.params.id;

        const redData = await client.get(postId);

        if (redData !== null) {
            return res.json({ data: JSON.parse(redData), type: "success" })
        } else {
            next();
        }


    } catch (err) {
        return res.json({ msg: "Redis Client Error", type: "reject", err: err });
    }

}

// Route 5: Show Single Data ,Endpoint /data/:id
router.get("/:id", GetSingleReddisMiddleware, async (req, res) => {
    try {
        // Get Id From url parameters
        const postId = req.params.id;

        // Get Data Based on passed Id in url
        const Data = await Post.findOne({ _id: postId });

        if (Data !== null) {
            // Set redis variable.
            client.set(postId, JSON.stringify(Data));
            client.expire(postId, 3600);

            // Return Response
            return res.json({ data: Data, type: "success" });
        }else{
            return res.json({ msg:"No Data Found",type:"reject"});
        }
    } catch (err) {
        return res.json({ msg: "Internal Server error", type: "error", err });
    }
});



module.exports = router;
