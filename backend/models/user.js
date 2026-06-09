import mongoose, { Model, Schema } from "mongoose";



const userSchema = new mongoose.Schema({
    name: {type:String, required:true},
    email:{type:String, required:true, unique:true},
    password:{ type:String, required:true}
})

export const userModel = mongoose.model('user', userSchema);