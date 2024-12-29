import { Router } from "express";
import { createHash } from "../utils/hashingUtils";

const router= Router()

router.get('/',(req,res)=>{
 res.send('hola')
})

router.post('/',async(req,res)=>{
    try {
        const user={
            email:req.body.email,
            firstName:req.body.firstName,
            lastName:req.body.lastName,
            age:req.body.age,
            password:createHash(req.body.password),
        }
        await userModel.create(user)
        res.status(200).send('usuario creado')
    } catch (error) {
        res.status(400).send(error)
    }
})

export default router