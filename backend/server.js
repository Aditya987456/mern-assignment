import express, { json } from "express";
import mongoose from "mongoose";
import cors from "cors";
// import dotenv from "dotenv"
// dotenv.config()
import { ConnectDB } from "./db.js";
import authRoutes from "./routes/authRoute.js"
import taskRoutes from "./routes/taskRoute.js"
import { port } from "./config.js";


const app = express();
app.use(cors())
app.use(express.json())






//server start check
app.get('/', (req, res)=>{
    res.status(200).json({
        message:"Hi from server."
    })
})



//db connection
ConnectDB();



//--------------------------------  user routes request -------------------------------
app.use('/api/user', authRoutes);




//--------------------------------  task routes request -------------------------------
app.use('/api/task', taskRoutes);






app.listen(port, ()=>{
    console.log(`Server running on PORT :${port}`);
})




