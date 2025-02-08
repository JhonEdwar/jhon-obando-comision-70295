import { generateToken } from "../utils/generateToken.js"

export const register=async(req,res)=>{
        try {
            if(!req.user) return res.status(400).json({message:"error en registro"})
            const token = generateToken(req.user)
            res.cookie('entregaFinal',token,{httpOnly:true}).json({message:'usuario registrado'})
    
        } catch (error) {
            res.status(400).json(error)
        }   
    
}

export const login=async(req,res)=>{
    try {
        if(!req.user) return res.status(400).json({message:"Registration failed"})
        const token = generateToken(req.user)
        res.cookie('entregaFinal',token,{httpOnly:true}).json({message:'Ok login'})
    } catch (error) {
        res.status(400).json(error)
    }  

}

export const logout=async(req,res)=>{
        res.clearCookie('entregaFinal').json({message:'sesión cerrada'})
}





