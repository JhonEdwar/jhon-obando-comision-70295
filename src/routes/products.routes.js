import { Router } from "express";
import productModel from "../models/product.model.js";
import { passportCall } from "../utils/passportCall";
import { authorization } from "../middlewares/authorization";

const router = Router()

router.get('/',passportCall('jwt'),authorization('user'),async(req,res)=>{
    const products=await productModel.find({})
    res.status(200).json(products)
})

export default router