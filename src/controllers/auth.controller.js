import { generateToken } from "../utils/generateToken.js"

export const register=async(req,res)=>{
        if(!req.user) return res.status(400).json({message:"error en registro"})
        const token = generateToken(req.user)
        res.cookie('userCookieShop',token,{httpOnly:true}).sendCreated("User registered")
}

export const login=async(req,res)=>{
        if(!req.user) return res.status(400).json({message:"Registration failed"})
        const token = generateToken(req.user)
        res.cookie('userCookieShop',token,{httpOnly:true}).sendSuccess("Ok login")
}

export const logout=async(req,res)=>{
        res.clearCookie('userCookieShop').json({message:'sesión cerrada'})
}





