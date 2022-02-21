import mongoose from "mongoose";

const {Schema, model} = mongoose

const productModel = new Schema({
    title: {
        type: String,
        required: true
    },
    image: {
        type: String
    },
    description: {
        type: String,
        trim: true,
        default: "no description provided"
    },
    price:{
      type: Number,
      default: 2
    },
    inStock: {
        type: Boolean,
        default: true
    },
    rating: Number,
    comments: [{
        type: Schema.Types.ObjectId,
        ref: "comments"
    }]
},{timestamps: true, versionKey: false})

export default model("products", productModel)