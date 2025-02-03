import { Router } from "express";
import passport from "passport";
import { authorization } from "../middlewares/authorization.js";
import {generateToken} from "../utils/generateToken.js"
import { passportCall } from "../utils/passportCall.js";
import {login, register} from "../controllers/user.controller.js"

const router= Router()

router.post('/register',passportCall('register'),register)
router.post('/login',passportCall("login"),login)
router.get('/logout', )


router.get('/current',passportCall('jwt'),authorization("admin"),(req,res)=>{
    const payload = {
        firstName:req.user.firstName,
        lastName:req.user.lastName
    }
    res.status(200).send(payload)
})



export default router