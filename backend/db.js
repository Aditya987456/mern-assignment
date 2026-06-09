import mongoose from "mongoose";
import { mongoUrl } from "./config.js";




//db connection-

export async function ConnectDB(){

    if(!mongoUrl){
            throw new Error("Mongo URL missing");
        }
 
    try {
        await mongoose.connect(mongoUrl);
        console.log("MongoDB connected");

    } catch (error) {
        console.error("Error in DB connection:"+ error.message);
        process.exit(1);
    }
}

