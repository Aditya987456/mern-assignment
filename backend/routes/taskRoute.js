
import express from "express"
const router = express.Router();
import { taskModel } from "../models/task.js";
import { authMiddleware } from "../middleware/authMiddleware.js";



//CRUD operations---


// //1. Create
// router.post('/create', authMiddleware, (req, res)=>{

// } )



// //2. Read
// router.get('/get', authMiddleware, (req, res)=>{

// })




// //3. Update
// router.put('/update', authMiddleware, (req, res)=>{

// })



// //also update of specific things-
// router.patch('/patch/')





// //4. Delete
// router.delete('delete', authMiddleware, (req, res)=>{

// })












export default router;