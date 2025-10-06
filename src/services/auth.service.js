
import AdminDao  from "../daos/admin.dao.js"
import BuyerDao from "../daos/buyer.dao.js"
import businessDao from "../daos/business.dao.js"
import { createHash, isValidPassword } from "../utils/hashingUtils.js"
import AppError from "../utils/appError.js"
import logger from "../config/logger.js"

const buyerService = new BuyerDao()
const businessService = new businessDao()
const adminService= new AdminDao()

export const createUser=async(req,username,password,done)=>{
    const { firstName, lastName, role } = req.body
    logger.info(`AuthService: Attempting to create user with email: ${username}, role: ${role}`)

    if (!firstName || !lastName || !role || !username || !password) {
        logger.warn(`AuthService: Missing required parameters for user creation`)
        return done(null,false,{message:"Required parameters are missing"})
    }

    if(role !== "buyer" && role !== "business"&& role !== "admin"){
        logger.warn(`AuthService: Invalid role provided: ${role}`)
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
        if(user) {
            logger.warn(`AuthService: User already exists with email: ${username}`)
            return done(null,false,{message:"User already exists"})
        }

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
        logger.info(`AuthService: Successfully created user with email: ${username}, role: ${role}`)
        return done(null,result)
    } catch (error) {
        logger.error(`AuthService: Failed to create user with email ${username} - ${error.message}`)
        return done(null, false, { message: error.message })
    }
}
    
    
export const loginUser=async (req,username,password,done) => {
    const {role} = req.body
    logger.info(`AuthService: Attempting login for user: ${username}, role: ${role}`)
    
    if (!role || !username) {
        logger.warn(`AuthService: Missing required parameters for login`)
        return done(null,false,"Required parameters are missing" )
    }

    if(role !== "buyer" && role !== "business" && role !== "admin"){
        logger.warn(`AuthService: Invalid role for login: ${role}`)
        return done(null,false,"Invalid role" )
    }

    try {
        const user = 
            role === "buyer" ?  
                await buyerService.getByEmail(username) 
            : role === "business" ?
                await businessService.getByEmail(username)
            :
                await adminService.getByEmail(username)
        
        if (!user) {
            logger.warn(`AuthService: User not found for login: ${username}`)
            return done(null, false, { message: "User not found" });
        }

        if(!isValidPassword(user,password)) {
            logger.warn(`AuthService: Invalid password for user: ${username}`)
            return done(null,false,{message:"invalid password"})
        }
        logger.info(`AuthService: Successful login for user: ${username}, role: ${role}`)
        return done(null,user)
    } catch (error) {
        logger.error(`AuthService: Login failed for user ${username} - ${error.message}`)
        return done(null, false, { message: error.message })
    }
}


export const findUserByEmail = async (email) => {
    logger.info(`AuthService: Searching for user by email: ${email}`)
    try {
        // Intentar en buyer
        let user = await buyerService.getByEmail(email).catch(() => null)
        if (user) {
            logger.info(`AuthService: Found user as buyer with email: ${email}`)
            return { user, role: 'buyer' }
        }

        // Intentar en business
        user = await businessService.getByEmail(email).catch(() => null)
        if (user) {
            logger.info(`AuthService: Found user as business with email: ${email}`)
            return { user, role: 'business' }
        }

        // Intentar en admin
        user = await adminService.getByEmail(email).catch(() => null)
        if (user) {
            logger.info(`AuthService: Found user as admin with email: ${email}`)
            return { user, role: 'admin' }
        }

        logger.warn(`AuthService: No user found with email: ${email}`)
        return null
    } catch (error) {
        logger.error(`AuthService: Error searching user by email ${email} - ${error.message}`)
        throw new AppError(500, `Error searching user: ${error.message}`)
    }
}
