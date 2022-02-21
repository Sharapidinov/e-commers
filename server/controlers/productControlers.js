import Product from "../models/productModel.js"
import {unlinkSync} from "fs"
import path from "path";
import Comment from "../models/commentModel.js"

export const getAll = (req, res) => {
    Product.find({}, ((error, result) => {
        if (error) return res.status(400).json({message: "not found", error})
        res.json(result)
    }))
}

export const addProduct = (req, res) => {
    const {title, description, price} = req.body

    const image = req.file ? `/static/images/${req.file.filename}` : `/static/images/no_image.png`

    const newProduct = new Product({title, description, price, image})

    newProduct.save(((error, result) => {
        if(error) return res.status(400).json({message:" product adding error ", error })

        res.json({
            message: "Item added",
            result
        })
    }))


}

export const deleteProduct = (req, res) => {
    const {id} = req.params
    Product.findByIdAndDelete(id, (error, product) => {
        if(error) return res.status(400).json({message:" product delete error ", error })
        const filename = product.image.replace("/static/images/", "")
        try {
            if (filename !== "no_image.png") unlinkSync(path.resolve(`images/${filename}`))
        } catch (e) {
            console.log("File not found")
        }

        Comment.deleteMany({product: product._id }, error => {
            if(error) return res.status(400).json({message:" product delete error ", error })
            res.json({
                message: "Item removed",
                product
            })
        })



    })
}
export const getById = ( req, res ) => {
    const {id} = req.params

    Product.findById(id)
        .populate("comments")
        .populate({
            path:"comments",
            populate:{
               path: "author",
                select: "-password"
            }
        })
        .exec((error, product) => {
        if(error || !product) return res.status(400).json({message:" product delete error ", error })
        res.json(product)
    })
}