import express from "express";
import {addProduct, getAll, deleteProduct,getById} from "../controlers/productControlers.js";
import upload from "../service/multer.js";
import authenticateCastom from "../middleware/authenticate.js";



const productRouter = express.Router()

productRouter.get("/get-all", getAll)
productRouter.get("/:id", getById)
productRouter.post("/add",authenticateCastom(["admin"]) , upload.single("image"), addProduct )
productRouter.delete("/delete/:id",authenticateCastom(["admin"]) , deleteProduct )



export default productRouter