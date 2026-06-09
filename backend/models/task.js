import mongoose, { Model, Schema } from "mongoose";



const taskSchema = new mongoose.Schema({
    title: {type:String, required:true},
    description:{type:String, required:true},
    status:{ type:String, enum: ["pending", "completed"],  default:"pending"}
})

export const taskModel = mongoose.model('task', taskSchema);