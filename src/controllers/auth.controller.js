import { generateToken } from "../utils/generateToken.js"     
import AppError from "../utils/appError.js"
import { asyncHandler } from "../utils/asyncHandler.js"
import { updateUserPassword, createAndSendPasswordReset, getMailByToken } from "../services/passwordReset.service.js" 

export const register=asyncHandler(async(req,res)=>{
    if(!req.user) return res.status(400).json({message:"error en registro"})
    const token = generateToken(req.user)
    res.cookie('userCookieShop',token,{httpOnly:true}).sendCreated("User registered")
});

export const login=asyncHandler(async(req,res)=>{
    if(!req.user) return res.status(400).json({message:"Registration failed"})
    const token = generateToken(req.user)
    res.cookie('userCookieShop',token,{httpOnly:true}).sendSuccess("Ok login")
});

export const logout=asyncHandler(async(req,res)=>{
    res.clearCookie('userCookieShop').json({message:'sesión cerrada'})
});


export const passwordReset= asyncHandler(async (req,res)=>{
        const { email } = req.body;

        if (!email) {
            throw new AppError(400, "Email is required")
        }
    
        await createAndSendPasswordReset(email)

       res.sendSuccess({ message: "Password reset email sent" });
});


export const resetCurrentPassword= asyncHandler(async (req,res)=>{
    const { email, token } = req.query;
    const { password } = req.body;

        if (!password || !email || !token) {
         throw new AppError(400, "Missing required fields");
    }
       const emailByToken = await getMailByToken(token)
       try {
        await updateUserPassword(emailByToken, password)
           res.sendSuccess({ message: "Password updated successfully" });
       } catch (error) {
           throw new AppError(500, `Failed to reset password: ${error.message}`);
       }
});