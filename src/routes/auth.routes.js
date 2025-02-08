import { Router } from "express";
import { authorization } from "../middlewares/authorization.js";
import { passportCall } from "../utils/passportCall.js";
import {login, register,logout} from "../controllers/auth.controller.js"

const router= Router()

router.post('/register',passportCall('register'),register)
router.post('/login',passportCall("login"),login)
router.get('/logout', logout)


router.get('/current',passportCall('jwt'),(req,res)=>{
    const payload = {
        firstName:req.user.firstName,
        lastName:req.user.lastName,
        role:req.user.role,
    }
    res.status(200).send(payload)
})



export default router