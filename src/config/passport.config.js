import passport from "passport";
import local from 'passport-local'
import jwt,{ ExtractJwt } from 'passport-jwt'
import userModel from "../models/user.model.js"
import { createHash ,isValidPassword  } from "../utils/hashingUtils.js";
import { authSevice } from "../services/auth.service.js";

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
        authSevice.createUser

     ))

     passport.use('login',new LocalStrategy(
        {usernameField:'email'},
        authSevice.authSevice

    ))

}

export default initializePassport