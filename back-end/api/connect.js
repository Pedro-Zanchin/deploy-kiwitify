import { MongoClient } from "mongodb";

const URI =
  "mongodb+srv://pzanch:KsHVWHgUNKp5pQ4o@cluster0.5c0zs.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const client = new MongoClient(URI);

export const db = client.db("projectSpotify");

//const songCollection = await db.collection("songs").find({}).toArray();


