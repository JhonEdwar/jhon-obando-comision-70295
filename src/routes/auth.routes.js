import { Router } from "express";
import { authorization } from "../middlewares/authorization.js";
import { passportCall } from "../utils/passportCall.js";
import {login, register,logout,passwordReset,resetCurrentPassword} from "../controllers/auth.controller.js"
import { validate } from "../middlewares/validate.js";
import { registerSchema, loginSchema } from "../validations/auth.validation.js";


const router= Router()

router.post('/register',passportCall('register'),validate(registerSchema),register)
router.post('/login',passportCall("login"),validate(loginSchema),login)
router.get('/logout', logout)
router.post('/passwordReset',passwordReset)
router.post('/reset',resetCurrentPassword)


router.get('/current',passportCall('jwt'),(req,res)=>{
    const payload = {
        firstName:req.user.firstName,
        lastName:req.user.lastName,
        role:req.user.role,
    }
    res.status(200).send(payload)
})



export default router