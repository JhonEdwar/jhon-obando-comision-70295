export const authorization = (roles) => {
    return async (req,res,next) => {      
        if(!req.user) return res.status(401).json({message:"No autorizadoo"})
            // console.log("posterior a verificar req.user", req.user)            
        for (const role of roles) 
    {
            if(req.user.role === role) 
            return next()
        }        
        return res.status(403).json({message:"Sin permisos"})
    }
}