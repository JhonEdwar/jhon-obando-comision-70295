import { Router } from "express";
import passport from "passport";
import { authorization } from "../middlewares/authorization.js";
import {generateToken} from "../utils/generateToken.js"

const router= Router()

router.post('/',passport.authenticate('register',{session:false,failureRedirect:'/api/user/failRegister'}),async(req,res)=>{
    try {

        if(!req.user) return res.status(400).json({message:"error en registro"})
        const token = generateToken(req.user)
        res.cookie('cookieJWTEntrega',token,{httpOnly:true}).json({message:'usuario registrado'})

    } catch (error) {
        res.status(400).json(error)
    }
    
})

router.get('/current',passport.authenticate('jwt',{session:false}),authorization("admin"),(req,res)=>{
    
    const payload = {
        firstName:req.user.firstName,
        lastName:req.user.lastName
    }
 
    res.status(200).send(payload)
})

router.get('/logout', (req,res)=>{
    res.clearCookie('cookieJWTEntrega').json({message:'sesión cerrada'})
})

export default router