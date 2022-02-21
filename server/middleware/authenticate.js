import passport from "passport";

const handleJWT =(req, res, next, roles) => {
        return (errors, user) => {
            if(errors || !user) return res.status(401).json({message: "Registration error", errors})

            if (!roles.includes(user.role)) return res.status(401).json({message: "Access denied"})

            req.logIn(user, {session: false})
            req.user = user
            return next()
        }
}

const authenticateCastom = (roles = []) =>{
    return (req, res, next) => {
        const auth = passport.authenticate("jwt", {session: false}, handleJWT(req, res, next, roles))
        return auth(req,res,next)
    }
}

export default authenticateCastom