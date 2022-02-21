import express from "express";
import { authenticate,  signup, signin} from "../controlers/authControlers.js";


const router = express.Router()

router.post("/signup", signup)
router.post("/signin", signin)
router.get("/authenticate", authenticate)


export default router