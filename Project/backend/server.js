import express from "express";
import cors from "cors";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import { MongoClient, ObjectId } from "mongodb";
import { getDB } from "./db.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const app = express();

app.use(cors());
app.use(express.json());

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const storage = multer.diskStorage({
    destination: path.join(__dirname, "uploads"),
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

const upload = multer({ storage: storage });

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
    const db = await getDB();
    const collection = db.collection("users");
    // check for duplicate username
    const dupUser = await collection.findOne({username: req.body.username});
    if(dupUser){
        throw new Error("Username already exists.")
    }

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
        res.status(500).json({
            message: "err.message"
        });
    }
    
});

// get a users posts
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
});

// get a user with a provided id
app.get("/usercontext/:id", async (req,res) => {
    try{
        const db = await getDB();

        const user = await db.collection("users").findOne({
            _id: new ObjectId(req.params.id)
        });

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        res.status(200).json(user);
    }catch (err){
        res.status(500).json({
            message: err.message
        });
    }
});

//update user
app.put("/api/user/:id", upload.single("image"), async (req, res) => {
    try {
        const db = await getDB();
        const userId = req.params.id;

        if (!ObjectId.isValid(userId)) {
            return res.status(400).json({
                message: "Invalid user ID"
            });
        }

        const users = db.collection("users");

        const existingUser = await users.findOne({
            _id: new ObjectId(userId)
        });

        if (!existingUser) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        const updatedDetails = {};

        if (req.body.username !== undefined) {
            updatedDetails.username = req.body.username;
        }

        if (req.body.email !== undefined) {
            updatedDetails.email = req.body.email;
        }

        if (req.body.biography !== undefined) {
            updatedDetails.biography = req.body.biography;
        }


        if (req.file) {
            updatedDetails.profilePicture = req.file.filename;
        }

        await users.updateOne(
            { _id: new ObjectId(userId) },
            { $set: updatedDetails }
        );

        const updatedUser = await users.findOne({
            _id: new ObjectId(userId)
        });

        res.json({
            message: "User updated successfully",
            user: updatedUser
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Failed to update user"
        });
    }
});

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
});

//delete comment
app.delete("/post/comment/delete/:commetId", async (req,res) => {
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
});

//send friend request
app.post("/friend", async (req,res) => {
    try{
        const {senderId,receiverUserName,senderName} = req.body;
        if(!senderId||!receiverUserName||!senderName){
            throw new Error("Send Valid parameters");
        }

        const db = await getDB();
        const collection = db.collection("users");

        const friendPresent = await collection.findOne({ username: receiverUserName, "friends._id" : new ObjectId(senderId)});

        if(friendPresent){
            res.status(400).json({status : "Already sent Friend request"});
            return;
        }

        const result = await collection.updateOne({username: receiverUserName},{
            $push : {
                friends: {
                    _id : new ObjectId(senderId),
                    name : senderName,
                    status :"pending"
                }
            }
        });

        if (result.matchedCount === 0) {
            res.status(400).json({status: `${receiverUserName} not found`});
        }

        res.status(200).json({status : `Friend request sent to ${receiverUserName}.`});
    }catch (err){
        res.status(500).json({message : err.message});
    }
});

// Accept or reject a friend request
app.put("/friend/id", async (req, res) => {
    try {
        
        const { id, friend, instruction } = req.body;

        if (
            !id ||
            !friend ||
            (instruction !== "accepted" && instruction !== "reject")
        ) {
            return res.status(400).json({
                message: "Invalid parameters"
            });
        }

        const db = await getDB();
        const collection = db.collection("users");

        let result;

        if (instruction === "accepted") {
            result = await collection.updateOne(
                {
                    _id: new ObjectId(id),
                    friends: {
                        $elemMatch: {
                            _id: new ObjectId(friend._id),
                            status: "pending"
                        }
                    }
                },
                {
                    $set: {
                        "friends.$.status": "accepted"
                    }
                }
            );

        } else if (instruction === "reject") {
            result = await collection.updateOne(
                {
                    _id: new ObjectId(id)
                },
                {
                    $pull: {
                        friends: {
                            _id: new ObjectId(friend._id),
                            status: "pending"
                        }
                    }
                }
            );
        }

        console.log(result);
        if (result.matchedCount === 0 || result.modifiedCount === 0) {
            return res.status(404).json({
                message: "Pending friend request not found"
            });
        }

        res.status(200).json({
            message: instruction === "accept"
                ? "Friend request accepted"
                : "Friend request rejected"
        });

    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
});

//add post
app.post("/post", upload.single("image"), async (req, res) => {
    try {
        const { username, ownerId, Name, description } = req.body;

        if (!username?.trim() || !ownerId?.trim() || !Name?.trim() || !description?.trim()){
            return res.status(400).json({
                message: "Please fill in all required fields."
            });
        }

        if (!req.file) {
            return res.status(400).json({
                message: "Please upload an image."
            });
        }

        let tags;

        try {
            tags = JSON.parse(req.body.Tag);
        } catch {
            return res.status(400).json({
                message: "Invalid tag data."
            });
        }

        if (!Array.isArray(tags) || tags.some(
            tag => typeof tag !== "string" || !tag.trim()
        )) {
            return res.status(400).json({
                message: "Tags must be a valid array of text."
            });
        }

        const currentDate = new Date().toISOString().split("T")[0];

        const newPost = {
            _id: new ObjectId(),
            username: username.trim(),
            ownerId: new ObjectId(ownerId),
            DatePosted: currentDate,
            Name: Name.trim(),
            image: req.file.filename,
            Tag: tags,
            views: 0,
            Likes: 0,
            Description: description.trim(),
            Comments: [],
            reports: [],
            albums: []
        };

        const db = await getDB();

        const result = await db.collection("posts").insertOne(newPost);

        res.status(201).json({
            message: "Post added successfully",
            post: newPost
        });

    } catch (err) {
        console.error(err);

        res.status(500).json({
            message: "Failed to add post."
        });
    }
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});