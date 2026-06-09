import express from "express";
const router = express.Router();
import { userModel } from "../models/user.js";
import { z } from "zod";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
const saltRounds = 6;
import { jwtSecret } from "../config.js";




//input schema - zod validation

const InputRegistration = z.object({
  name: z
    .string()
    .trim()
    .min(3, "Name must be at least 3 characters"),

  email: z.string().email("Invalid email address"),

  password: z
    .string()
    .min(4, "Password must be at least 4 characters"),
});



const InputLogin = z.object({
  email: z.string().email("Invalid email address"),
  
  password: z
    .string()
    .min(4, "Password must be at least 4 characters"),
})




//----registration-----
router.post("/register", async (req, res) => {

  try {

    const isInputValid = InputRegistration.safeParse(req.body);
    if(!isInputValid.success){
      return res.status(400).json({
        message:"Invalid input formate",
        error:isInputValid.error
      })
    }


    const name = isInputValid.data.name.trim()
    const email = isInputValid.data.email.trim().toLowerCase()
    const password = isInputValid.data.password.trim()

    const uniqueUser = await userModel.findOne({email});
    if(uniqueUser){
      return res.status(409).json({
        message:"User already exist"
      })
    }


    const hashedPassword = await bcrypt.hash(password, saltRounds);


    await userModel.create({
      name,
      email,
      password:hashedPassword
    })

    res.status(201).json({
      message:"User registered successfully."
    })

  } catch (error) {
    
    console.error(error);

    return res.status(500).json({
      message:"Internal server error"
    })
  }


  


});



//---- login-----
router.post('/login', async (req, res)=>{

  try {

    const isInputValid = InputLogin.safeParse(req.body)
    if(!isInputValid.success){
      return res.status(400).json({
        message:"Invalid input formate.",
        error:isInputValid.error
      })
    }


    const email = isInputValid.data.email.trim().toLowerCase();
    const password = isInputValid.data.password.trim();

    const userExist = await userModel.findOne({email})
    if(!userExist){
      return res.status(401).json({
        message:"Invalid ceredentials"
      })
    }

    const isPassValid = await bcrypt.compare(password, userExist.password)
    if(!isPassValid){
      return res.status(401).json({
        message:"Invalid ceredentials"
      })
    }


    const token = jwt.sign({id:userExist._id}, jwtSecret,
      {
        expiresIn: "7d",
      }
     )

     res.status(200).json({
      message:"user logged-In successfully",
      token:token
     })


  } catch (error) {

    console.error(error);

    return res.status(500).json({
      message:"Internal server error"
    })
    
  }
})



export default router;