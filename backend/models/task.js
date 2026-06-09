import mongoose, { Model, Schema } from "mongoose";



const taskSchema = new mongoose.Schema({
    title: {type:String, required:true, },
    description:{type:String, required:true, default:""},
    status:{ type:String, enum: ["pending", "completed"],  default:"pending"},
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
},{
    timestamps:true
}

)

export const taskModel = mongoose.model('task', taskSchema);