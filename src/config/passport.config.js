import passport from "passport";
import local from 'passport-local'
import jwt,{ ExtractJwt } from 'passport-jwt'
import userModel from "../models/admin.model.js"
import { createHash ,isValidPassword  } from "../utils/hashingUtils.js";
import { createUser, loginUser } from "../services/auth.service.js";

const LocalStrategy= local.Strategy
const JWTStrategy= jwt.Strategy

const cookieExtractor = (req) => {
    return req && req.cookies ? req.cookies["entregaFinal"] : null
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
        (req, username, password, done) => createUser(req, username, password, done)

     ))

     passport.use('login',new LocalStrategy(
        {
        passReqToCallback:true,
        usernameField:'email'
        },
        (req,username,password,done) => loginUser(req,username,password,done)

    ))

}

export default initializePassport