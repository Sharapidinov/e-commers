import User from "../models/userMongoose.js"
import jwt from "jsonwebtoken"

export const signup = (req, res) => {
    User.findOne({email: req.body.email}, (err, user) => {

        if(err) return res.status(400).json({message: "Error", err})
        if(user) return res.status(400).json({message: "A user with the same email already exists"})

        const newUser = new User({...req.body})

        newUser.save((err, result) => {
            if(err) return res.status(400).json({message: "Registration error"})
            res.json({
                message: "You have successfully registered",
                user: result
            })
        })

    })

}

export const signin = (req, res) => {
    User.findOne({email: req.body.email},(err,user) => {
        if(err) return res.status(400).json({message: "Error", err})
        if(!user) return res.status(400).json({message: "User does not exist"})

        if(!user.authenticate(req.body.password)) return res.status(401).json({message: "Wrong data", err})

        const secret = process.env.SECRET_KEY || "secret"
        const token = jwt.sign({ _id: user._id},secret , {expiresIn: "1d"})
        res.cookie("token", token, {maxAge: 1000 * 60 * 60 * 24})


        res.json({
            message: `Welcome ${user.name}`,
            token,
            user:{
                _id:user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        })
    })
}


export const authenticate = (req, res) => {
    const token = req?.cookies?.token

    if(!token) return res.status(401).json({message: "User does not exist"})

    try {
        const secret = process.env.SECRET_KEY || "secret"
        const decodedToken = jwt.verify(token, secret)
        const {_id} = decodedToken

        User.findById(_id, (err, user) => {
            if(err) return res.status(400).json({message: "Error", err})
            if(!user) return res.status(400).json({message: "User does not exist"})

            const refreshToken = jwt.sign({_id}, process.env.SECRET_KEY, {expiresIn: "1d"})
            res.cookie("token", refreshToken, {maxAge: 1000 * 60 * 60 * 24})
            res.json({
                token: refreshToken,
                user:{
                    _id:user._id,
                    name: user.name,
                    email: user.email,
                    role: user.role
                }
            })
        })

    } catch (e) {
        res.status(401).json({message: "User is not authorized", e})
    }

}

