import passport from "passport";
import local from 'passport-local'
import userModel from "../models/user.model.js"
import { createHash } from "../utils/hashingUtils.js";

const LocalStrategy= local.Strategy

const initializePassport=()=>{

     passport.use('register',new LocalStrategy(
        {
            passReqToCallback:true,
            usernameField:"email"
        },
        async(req,username,inValidPassword,done)=>{
            const {firtName,lastName, age}= req.body
            try {
                const user=await userModel.findOne({email:usernameField})
                if(user) return done(null,false)

                const newUser={
                    email:username,
                    password:createHash(password),
                    firtName,
                    lastName,
                    age
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