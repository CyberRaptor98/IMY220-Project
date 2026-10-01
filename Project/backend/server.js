import express from "express";
import cors from "cors";
import { MongoClient, ObjectId } from "mongodb";

import { getDB } from "./db.js";

const app = express();

app.use(cors());
app.use(express.json());

//login an existing user
app.post("/login", async (req, res) => {
    try{
    const {username,password} = req.body;
    
    if(!username|| !password){
        res.json({
            message: "Please enter username or password"
        })
        return;
    }

    if(username.length <= 0|| password.length < 8){
        res.json({
            message: "Please enter valid username and password"
        })
        return;
    }

    const db = await getDB();
    const collection = db.collection("users");
    const user = await collection.findOne({username: username, password: password});
    if(!user){
        res.json({message: "no user found"});
        return;
    }

    const { password: userPassword, ...userWithoutPassword } = user;
        //console.log ("line 39");
        //console.log (userWithoutPassword);
        res.json(userWithoutPassword);

        
    } catch (err){
        res.json({message: err.message})
    }
});

//add new user
app.post("/register", async (req, res) => {
    try {
    const currentDate = new Date().toISOString().split("T")[0];

    const newUser ={
        username: req.body.username,
        password: req.body.password,
        role: 'User',
        email: req.body.email,
         friends: [
        //     {
        //     email: 'sarah@example.com',
        //     name: 'Sarah',
        //     status: 'Accepted'
        //     }
        ],
        friendRequestsReceived: [],
        profilePicuture: '',
        biography: '',
        dateJoined: currentDate,
        posts: [],
        albums: []
        }

        const db = await getDB();
        const collection = db.collection("users");

        // check for duplicate username
        const dupUser = await collection.findOne({username: req.body.username});
        if(dupUser){
            throw new Error("Username already exists.")
        }

        collection.insertOne(newUser);
        const user = await collection.findOne({username: req.body.username, password: req.body.password});

        const { password, ...userWithoutPassword } = user;

    res.json(userWithoutPassword);
    } catch (err){
    res.json({
        message: err.message
    });} 
    
});

//get all posts
app.get("/api/posts", async (req, res) => {
    try{
        const db = await getDB();

        const collection = db.collection("posts");
        const posts = await collection.find({}).toArray();

        res.status(200).json(posts);
    }catch (err){
        res.json({
            message: "err.message"
        });
    }
    
});

// retrieve a users posts
app.get("/user/:id", async (req,res) => {
    try{
        const id = req.params.id;
        if(!id){
            res.json({message: "please provide an id"});
            return;
        }

        const db = await getDB();

        const collection = db.collection("posts");
        const posts = await collection.find({ownerId: new ObjectId(id)}).toArray();
        res.status(200).json(posts);
    }catch (err){
        res.json({
            message: err.message
        });
    }
})

//add comment
app.post("/comment",async (req,res)=> {
    try{
        const {postid, userId, currentUsername,comment} = req.body;

    if(!postid||!userId || !currentUsername ||!comment){
        res.json({message:"Please Enter valid parameters"});
        return;
    }

    if(comment === ""){
        res.json({message:"Please Enter a comment"});
        return;
    }

    
    const currentDate = new Date().toISOString().split("T")[0];

    const db = await getDB();
    const collection = db.collection("posts");

    const newComment = {
                    _id : new ObjectId(),
                    user: currentUsername,
                    comment:comment,
                    createdAt: currentDate
                }

    await collection.updateOne(
        {_id: new ObjectId(postid)},
        {
            $push:{
                Comments: newComment
            }
        }
    );

    res.json({successMessage: "comment Posted",
        comment: newComment
     });
    }
    catch (err){
        res.json({message : err.message});
    }
})

//delete comment
app.delete("/post/comment/delete/:commetId", async (req,res)=>{
    try{
        const commentId = req.params.commetId;
        const postId = req.body.postId;

        if(!postId || !commentId){
            throw new Error("Invalid Parameters");
        }
        

        const db = await getDB();
        const collection = db.collection("posts");

        const result = await collection.updateOne(
            {_id: new ObjectId(postId)},
            {
                $pull:{
                    Comments : {
                        _id: new ObjectId (commentId)
                    }
                }
            }
        );

        if (result.modifiedCount === 0) {
            return res.status(404).json({ message: "Post or comment not found" });
        }

        res.status(200).json({id : commentId});
    }catch(err){
        res.status(500).json({message : err.message});
    }
})

app.listen(3000, () => {
    console.log("Server running on port 3000");
});