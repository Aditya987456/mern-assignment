
import express from "express"
const router = express.Router();
import {z} from "zod"
import { taskModel } from "../models/task.js";
import { authMiddleware } from "../middleware/authMiddleware.js";




//task schema - zod
const taskSchema = z.object({
    title:z.string().min(1, "title is required"),
    description:z.string().optional()
})



//CRUD operations---

//1. Create
router.post('/create', authMiddleware, async (req, res)=>{

    try {

        const isformateValid = taskSchema.safeParse(req.body)
        if(!isformateValid.success){
            return res.status(400).json({
                message:"Invalid input formate"
            })
        }

        const title = isformateValid.data.title.trim();
        const description = isformateValid.data.description.trim();

    //check duplicate
        const existingTask = await taskModel.findOne({
            title,
            userId: req.userId,
        });
        if (existingTask) {
            return res.status(409).json({
                message: "Task already exists",
            });
        }

        const task = await taskModel.create({
            title,
            description,
            userId:req.userId
        })

        res.status(201).json({
            message:"Task created",
            Task:task
        })

        
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message:"Internal server error",
        })
        
    }

} )



//2. Read
router.get('/get', authMiddleware, async (req, res)=>{

    try {
        
        const tasks= await taskModel.find({
            userId:req.userId
        })

        res.status(200).json({
            message:"All created tasks are:",
            Task:tasks
        })
        
    } catch (error) {
        console.error(error)
        res.status(500).json({
            message:"Internal server error"
        })
    }

})



//3. Update
router.put('/update/:id', authMiddleware, async (req, res)=>{

    try {

        const task = await taskModel.findOne({
            _id:req.params.id,
            userId:req.userId
        })

        if(!task){
            return res.status(404).json({
                message:"Task not found"
            })
        }

        task.title = req.body.title || task.title;
        task.description = req.body.description || task.description;

        await task.save()

        res.status(200).json({
            message:"Task updated",
            Task:task
        })
        
    } catch (error) {
        console.error(error)
        res.status(500).json({
            message:"Internal server error"
        })
    }

})



//4. patch -- also update of specific things- here for tootle status
router.patch('/:id/status', authMiddleware, async (req, res)=>{

    try {
        const task = await taskModel.findOne({
            _id:req.params.id,
            userId:req.userId
        })

        if(!task){
            return res.status(404).json({
                message:"Task not found"
            })
        }

        
        task.status = task.status ==="pending"? "completed":"pending";

        await task.save()

        return res.status(200).json({
            message: "Task status updated successfully",
            task,
        });


    } catch (error) {
        console.error(error)
        res.status(500).json({
            message:"Internal server error"
        })
    }
})



//5. Delete
router.delete('/delete/:id', authMiddleware, async (req, res)=>{

    try {

        const taskDeleted = await taskModel.findOneAndDelete({
            _id:req.params.id,
            userId:req.userId
        })

        if(!taskDeleted){
            return res.status(404).json({
                message:"Task not found"
            })
        }

        res.status(200).json({
            message:"Task is deleted"
        })
        
    } catch (error) {
        console.error(error)
        res.status(500).json({
            message:"Internal server error"
        })
    }

})












export default router;