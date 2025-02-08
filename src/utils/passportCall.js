import passport from 'passport'

export const passportCall= (strategy)=>{
    return async (req,res,next)=>{
        passport.authenticate(strategy,{session:false},(error,user,info)=>{
            console.log("ejecución passportCall", user)
            if(error) return next(error)
            if(!user) return res.status(401).json({error:info.message ? info.message : info.toString()})
            console.log("aaaaaa en el passpor call antes de asignar use a req.user passportCall", req.user)
            req.user=user
            console.log("AQUI ya se asigno el req.user", req.user)
            next()
        })(req,res,next)
    }
}