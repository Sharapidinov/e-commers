import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import path from "path";
import dbConnect from "./service/mongoose.js";
import userRoutes from "./routes/useRouter.js"
import cookieParser from "cookie-parser"
import passport from "passport"
import JwtStrategy from "./service/passport.js";
import productRoutes from "./routes/productRoutes.js";
import commentsRoutes from "./routes/commentsRoutes.js";

dotenv.config()

const port = process.env.PORT || 8090
const server = express()
dbConnect()
server.set("json spaces", 2)

server.use(cors())
server.use(express.json())
server.use(cookieParser())
server.use(passport.initialize())
passport.use("jwt", JwtStrategy)

server.get("/get", ((req, res) => {
    res.json("hello")
}))

// server.use("/api/v1/auth", userRoutes)
// server.use("/api/v1/products", productRoutes)
// server.use("/api/v1/comments", commentsRoutes)
// server.use("/static/images", express.static("images"))

// if (process.env.NODE_ENV === "production"){
//     server.use(express.static("client/build"))
//     server.get("/*", (req, res) => {
//         res.sendFile(path.resolve('client/build/index.html'))
//     })
// }

server.listen(port, () => {
    console.log(`server is running on http://localhost:${port}`)
})



