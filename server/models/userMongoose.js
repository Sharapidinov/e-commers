import mongoose from "mongoose";
import bcrypt from "bcrypt"

const {Schema, model} = mongoose


const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: "user"
    }
}, {timestamps: true, versionKey: false})

userSchema.pre("save", function (next){
    this.password = bcrypt.hashSync(this.password, 10)
    next()
})

userSchema.methods.authenticate = function (password) {
  return bcrypt.compareSync(password, this.password)
}

export default model("users", userSchema)


