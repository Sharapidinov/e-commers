import Comment from "../models/commentModel.js"
import Product from "../models/productModel.js"


export const addComments = (req, res) => {
    const newComment = new Comment({...req.body})

    newComment.save(async (error, comment) => {
        if (error) return res.status(400).json({message: " Add comment error ", error})

        try {
            await Product.findByIdAndUpdate(comment.product, { $push: {comments: comment._id} })

            res.json({
                message: "Comment is add",
                comment
            })
        } catch (e) {
            return res.status(400).json({message: "error ", error})

        }
    })
}

export const getComments = (req, res) => {
    Comment
        .find()
        .populate({
            populate: "author",
            select: "-password"
        })
        .exec((error, comment) => {
            if (error) return res.status(400).json({message: " error ", error})

            res.json(comment)
        })
}

export const deleteComment = (req,res) => {
    const {id} = req.params

    Comment.findByIdAndDelete(id, async (error, comment) => {
        if (error) return res.status(400).json({message: " Deletion error ", error})

       try {
           await Product.findByIdAndUpdate(comment.product, {$pull : {comments: comment._id }})

           res.json({
               message: "Comment has been deleted",
               comment
       })
        } catch (error) {
            return res.status(400).json({message: " Deletion error ", error})
       }
    })


}