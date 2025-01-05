import passport from "passport";
import local from 'passport-local'
import jwt,{ ExtractJwt } from 'passport-jwt'
import userModel from "../models/user.model.js"
import { createHash } from "../utils/hashingUtils.js";

const LocalStrategy= local.Strategy
const JWTStrategy= jwt.Strategy

const cookieExtractor = (req) => {
    return req && req.cookies ? req.cookies["cookieJWTEntrega"] : null
}


const initializePassport=()=>{

    passport.use('jwt',new JWTStrategy(
        {
            jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
            secretOrKey:process.env.SECRET_JWT
        },
        async(jwt_payload,done)=>{
            try {
                return done(null,jwt_payload.user) 
             } catch (error) {
                 return done(error)
             }
        }
    ))

     passport.use('register',new LocalStrategy(
        {
            passReqToCallback:true,
            usernameField:"email"
        },
        async(req,username,password,done)=>{
            const {firtName,lastName, age}= req.body
            try {
                const user=await userModel.findOne({email:usernameField})
                if(user) return done(null,false)

                const newUser={
                    email:username,
                    password:createHash(password),
                    firtName,
                    lastName,
                    age,
                    cart
                }
                const result=await userModel.create(newUser)
                done(null,result)

            } catch (error) {
                return done(error)
            }
        }
     ))

}

export default initializePassport