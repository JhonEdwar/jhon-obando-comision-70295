
import { authDao } from "../dao/admin.dao.js"


export const createUser=async(req,username,password,done)=>{
        const {firstName,lastName, age,roles,cart}= req.body
        try {
            const user=await authDao.findOne(username)
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
            const result=await authDao.createUser(newUser)
            console.log("despues de crear usuario antes de return")
            return done(null,result)

        } catch (error) {
            return done(error)
        }
    }
    
export const loginUser=async (username,password,done) => {
        try {
            const user=await authDao.findOne(username)
            if(!user) return done(null,false)
            if(!isValidPassword(user,password)) return done(null,false)
            return done(null,user)

        } catch (error) {
            return done(error)

        }
    }
