import { generateToken } from "../utils/generateToken.js"     
import AppError from "../utils/appError.js"
import { asyncHandler } from "../utils/asyncHandler.js"
import { updateUserPassword, createAndSendPasswordReset, getEmailByToken } from "../services/passwordReset.service.js"
import logger from "../config/logger.js" 

export const register=asyncHandler(async(req,res)=>{
    logger.info(`AuthController: Attempting to register user with email: ${req.user?.email}`)
    if(!req.user) {
        logger.warn('AuthController: Registration failed - no user data')
        return res.status(400).json({message:"error en registro"})
    }
    const token = generateToken(req.user)
    logger.info(`AuthController: Successfully registered user with email: ${req.user.email}`)
    res.cookie('userCookieShop',token,{httpOnly:true}).sendCreated("User registered")
});

export const login=asyncHandler(async(req,res)=>{
    logger.info(`AuthController: Attempting to login user with email: ${req.user?.email}`)
    if(!req.user) {
        logger.warn('AuthController: Login failed - no user data')
        return res.status(400).json({message:"Registration failed"})
    }
    const token = generateToken(req.user)
    logger.info(`AuthController: Successfully logged in user with email: ${req.user.email}`)
    res.cookie('userCookieShop',token,{httpOnly:true}).sendSuccess("Ok login")
});

export const logout=asyncHandler(async(req,res)=>{
    logger.info('AuthController: User logout')
    res.clearCookie('userCookieShop').json({message:'sesión cerrada'})
});


export const passwordReset= asyncHandler(async (req,res)=>{
    const { email } = req.body;
    logger.info(`AuthController: Password reset requested for email: ${email}`)

    if (!email) {
        logger.warn('AuthController: Password reset failed - email is required')
        throw new AppError(400, "Email is required")
    }

    await createAndSendPasswordReset(email)
    logger.info(`AuthController: Password reset email sent to: ${email}`)
    res.sendSuccess({ message: "Password reset email sent" });
});


export const resetCurrentPassword= asyncHandler(async (req,res)=>{
    const { email } = req.query;
    const { password, token} = req.body;
    logger.info(`AuthController: Password reset attempt for email: ${email}`)

    if (!password || !email || !token) {
        logger.warn('AuthController: Password reset failed - missing required fields')
        throw new AppError(400, "Missing required fields");
    }
    const emailByToken = await getEmailByToken(token)
    try {
        await updateUserPassword(emailByToken, password)
        logger.info(`AuthController: Password successfully updated for email: ${email}`)
        res.sendSuccess({ message: "Password updated successfully" });
    } catch (error) {
        logger.error(`AuthController: Failed to reset password for email ${email} - ${error.message}`)
        throw new AppError(500, `Failed to reset password: ${error.message}`);
    }
});