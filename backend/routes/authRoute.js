import express from "express";
const router = express.Router();
import { userModel } from "../models/user";



router.post("/register", (req, res) => {
  res.send("register");
});

export default router;