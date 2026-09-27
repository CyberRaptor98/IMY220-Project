import express from "express";
import cors from "cors";
import { MongoClient, ObjectId } from "mongodb";

import { getDB } from "./db.js";

const app = express();

app.use(cors());
app.use(express.json());

app.post("/login", async (req, res) => {
    try{
    const {username,password} = req.body;
    
    if(!username|| !password){
        res.json({
            message: "Please enter username or password"
        })
        return;
    }

    if(username.length < 0|| password.length < 8){
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
        console.log("Users Array");
        console.log(posts);
        res.status(200).json(posts);
    }catch (err){
        res.json({
            message: err.message
        });
    }
})


app.listen(3000, () => {
    console.log("Server running on port 3000");
});