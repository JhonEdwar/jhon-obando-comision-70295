import { Router } from "express";
import productModel from "../models/product.model.js";
import { passportCall } from "../utils/passportCall";
import { authorization } from "../middlewares/authorization";
import cartModel from "../models/cart.model.js";
import userModel from "../models/user.model.js";

const router = Router()

router.get('/',passportCall('jwt'),authorization('user'),async(req,res)=>{
    const products=await productModel.find({})
    res.status(200).json(products)
})

router.post('/addcart/:id',passportCall('jwt'),authorization('user'),async(req,res)=>{
    const productId=req.params.id
    const userId=req.user._id
    const mailUser=req.user.email

    const cartSelected=await cartModel.findOne({user:userId})

    const datosCart={
        product:{ $push: { productId: productId, quantity:1 } },
        user: userId
    }
    
    if(!cartSelected){
        await cartModel.create(datosCart)
        await userModel.updateOne({ email: mailUser }, { $set: { cart: datosCart } });
    } else {

        await cartModel.updateOne(
            { _id: cartSelected._id },
            { $push: { products: { productId, quantity: 1 } } }
          )

    }
  
    res.status(200).send({message:'product create'})
})

export default router

