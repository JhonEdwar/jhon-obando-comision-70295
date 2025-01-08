import { Router } from "express";
import passport from "passport";
import { authorization } from "../middlewares/authorization.js";
import {generateToken} from "../utils/generateToken.js"
import { passportCall } from "../utils/passportCall.js";

const router= Router()

router.post('/register',passportCall('register'),async(req,res)=>{
    try {
        if(!req.user) return res.status(400).json({message:"error en registro"})
        const token = generateToken(req.user)
        res.cookie('cookieJWTEntrega',token,{httpOnly:true}).json({message:'usuario registrado'})

    } catch (error) {
        res.status(400).json(error)
    }   
})


router.post('/login',passportCall("login"),async (req,res)=>{
    try {
        if(!req.user) return res.status(400).json({message:"Registration failed"})
        const token = generateToken(req.user)
        res.cookie('coderPracticaIntegrado',token,{httpOnly:true}).json({message:'Ok login'})
    } catch (error) {
        res.status(400).json(error)
    }
})


router.get('/current',passportCall('jwt'),authorization("admin"),(req,res)=>{
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