import jwt from "jsonwebtoken"
import { jwtSecret } from "../config.js"

export const authMiddleware = (req, res, next)=>{

    try {

        const authHeader = req.headers.authorization
        if(!authHeader){
            return res.status(401).json({
                message:"Authorization required"
            })
        }

        const token = authHeader.split(" ")[1];

        const decodedToken = jwt.verify(token, jwtSecret)

        req.userId = decodedToken.id;
        next();
        
    } catch (error) {
        return res.status(401).json({
            message:"Invalid token"
        })
        
    }
}