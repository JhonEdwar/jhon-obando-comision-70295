import { generateToken } from "../utils/generateToken.js"
import passwordResetModel from "../models/passwordReset.model.js"
import { v4 as uuidv4 } from 'uuid';
import { sendPasswordResetEmail } from "../utils/sendPasswordResetEmail.js";    
import AppError from "../utils/appError.js"
import { asyncHandler } from "../utils/asyncHandler.js"

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

       const user = await User.findOne({ email });
       if (!user) {
           return res.status(404).json({ message: "User not found" });
       }

       const token = uuidv4();
    try {
        await passwordResetModel.create({ email, token });
    } catch (error) {
        throw new AppError(500, `Failed to create password reset: ${error.message}`);
    }

    try {
        await sendPasswordResetEmail({ email, token });
    } catch (error) {
       throw new AppError(500, `Failed to send password reset email: ${error.message}`);
    }

       res.sendSuccess({ message: "Password reset email sent" });
});


export const resetCurrentPassword= asyncHandler(async (req,res)=>{
    const { email, token } = req.query;
    const { password } = req.body;

        if (!password || !email || !token) {
         throw new AppError(400, "Missing required fields");
    }

    const passwordHash = createHash(password); 

       const passwordReset = await passwordResetModel.findOne({ token });
       if (!passwordReset) {
           throw new AppError(400, "Invalid or expired token");
       }

       try {
           await User.updateOne({ email: passwordReset.email }, { password: passwordHash });
           await passwordResetModel.deleteOne({ token });
           res.sendSuccess({ message: "Password updated successfully" });
       } catch (error) {
           throw new AppError(500, `Failed to reset password: ${error.message}`);
       }
});