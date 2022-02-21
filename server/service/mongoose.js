import mongoose from "mongoose";

const dbConnect = () => {
    mongoose.connect(process.env.MONGO_URL)
        .then(() => console.log("DB is connect"))
        .catch((e) => console.log(e))
}

export default dbConnect