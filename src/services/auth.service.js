
import AdminDao  from "../daos/admin.dao.js"
import BuyerDao from "../daos/buyer.dao.js"
import businessDao from "../daos/business.dao.js"
import { createHash, isValidPassword } from "../utils/hashingUtils.js"

const buyerService = new BuyerDao()
const businessService = new businessDao()
const adminService= new AdminDao()

export const createUser=async(req,username,password,done)=>{
    const { firstName, lastName, role } = req.body

    if (!firstName || !lastName || !role || !username || !password) {
        return done(null,false,{message:"Required parameters are missing"})
    }

    if(role !== "buyer" && role !== "business"&& role !== "admin"){
        return done(null,false,{message:"Invalid role"})
    }

    try {

        const user = 
            role === "buyer" ?  
                await buyerService.getByEmail(username) 
            : role === "business" ?
                await businessService.getByEmail(username)
            :
                await adminService.getByEmail(username)
        if(user) return done(null,false,{message:"User already exists"})

        const newUser = {
            email:username,
            password:createHash(password),
            firstName,
            lastName,
            role
        }

        const result =  
            role === "buyer" ?  
                await buyerService.save(newUser) 
            : role === "business" ?
                await businessService.save(newUser)
            :
                await adminService.save(newUser)
        return done(null,result)
        
        
    } catch (error) {
        return done(null, false, { message: error.message })
    }

}
    
    
export const loginUser=async (req,username,password,done) => {
    const {role} = req.body
    
    if (!role || !username) {
        return done(null,false,"Required parameters are missing" )
    }

    if(role !== "buyer" && role !== "business" && role !== "admin"){
        done(null,false,"Invalid role" )
    }

    try {

        const user = 
            role === "buyer" ?  
                await buyerService.getByEmail(username) 
            : role === "business" ?
                await businessService.getByEmail(username)
            :
                await adminService.getByEmail(username)
        
                if (!user) return done(null, false, { message: "User not found" });

        if(!isValidPassword(user,password)) return done(null,false,{message:"invalid password"})
        return done(null,user)

    } catch (error) {

        return done(null, false, { message: error.message })
    }
}


