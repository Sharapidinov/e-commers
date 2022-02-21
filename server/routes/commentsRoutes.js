import express from "express";
import {addComments, getComments, deleteComment} from "../controlers/commentsControlers.js";

const router = express.Router()

router.post("/add", addComments)
router.get("/", getComments)
router.delete("/:id", deleteComment)

export default router