import { Router } from "express";
import { createHash } from "../utils/hashingUtils";
import passport from "passport";

const router= Router()

router.get('/',(req,res)=>{
 res.send('hola')
})

router.post('/',passport.authenticate('register',{session:false,failureRedirect:'/api/user/failRegister'}),async(req,res)=>{
    try {

        if(!req.user) return res.status(400).json({message:"Registration failed"})
        const token = generateToken(req.user)
        res.cookie('coderPracticaIntegrado',token,{httpOnly:true}).json({message:'user registed'})

    } catch (error) {
        res.status(400).json(error)
    }
    
})

export default router