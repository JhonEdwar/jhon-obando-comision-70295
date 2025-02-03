import passport from "passport";
import local from 'passport-local'
import jwt,{ ExtractJwt } from 'passport-jwt'
import userModel from "../models/admin.model.js"
import { createHash ,isValidPassword  } from "../utils/hashingUtils.js";

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
        async(req,username,password,done)=>{
            console.log("ejecución passport.config.js passport use register")
            const {firstName,lastName, age,roles,cart}= req.body
            try {
                const user=await userModel.findOne({email:username})
                if(user) return done(null,false,{message:"User already exists"})

                const newUser={
                    email:username,
                    password:createHash(password),
                    firstName,
                    lastName,
                    age,
                    roles,
                    cart
                }
                const result=await userModel.create(newUser)
                console.log("despues de crear usuario antes de return")
                return done(null,result)

            } catch (error) {
                return done(error)
            }
        }
     ))

     passport.use('login',new LocalStrategy(
        {usernameField:'email'},
        async (username,password,done) => {
            try {
                const user = await userModel.findOne({email:username})
                if(!user) return done(null,false)
                if(!isValidPassword(user,password)) return done(null,false)
                return done(null,user)

            } catch (error) {
                return done(error)

            }
        }
    ))

}

export default initializePassport