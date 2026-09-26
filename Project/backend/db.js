import { MongoClient } from "mongodb";
import "dotenv/config";

let client;
let db;

async function connectDB() {
    try{
    const uri = process.env.MONGO_URI;

    client = new MongoClient(uri);
    await client.connect();

    db = client.db("IMY220_ProjectPhotoshare");
    console.log("Connected to MongoDB");
    } catch (err)
    {
        console.error(err.Message);
    }
}

async function getDB() {
    if(!db){
        await connectDB();
    }
    return db;
}

export { getDB };