import {Strategy, ExtractJwt} from "passport-jwt"
import User from "../models/userMongoose.js"
import dotenv from "dotenv"

dotenv.config()
const cookieExtractor = (req) => {
    let token = null;
    if (req && req.cookies)
    {
        token = req.cookies.token;
    }
    return token;
}

const options = {
    secretOrKey: process.env.SECRET_KEY,
    jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor])
}

const JwtStrategy = new Strategy (options, function(jwt_payload, done) {
    User.findById( jwt_payload._id, function(err, user) {
        if (err) {
            return done(err, false);
        }
        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
        }
    })
})

export default JwtStrategy