import { Router } from "express";
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


export default router