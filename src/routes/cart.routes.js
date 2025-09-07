import { Router } from "express"
import {authorization} from "../middlewares/authorization.js"
import {passportCall} from "../utils/passportCall.js"
import { getCarts, getCartbyIdBuyer, addProductToCart, deleteCart,createCart } from "../controllers/cart.controller.js"

const router = Router()

router.get('/',passportCall('jwt'),authorization(["admin"]), getCarts)
router.get('/carts',passportCall('jwt'),authorization(["buyer"]), getCartbyIdBuyer)
router.post('/',passportCall('jwt'),authorization(["buyer"]), createCart)
router.post('/:idCart/products',passportCall('jwt'),authorization(["buyer"]), addProductToCart)
router.delete('/:idCart',passportCall('jwt'),authorization(["buyer"]), deleteCart)

export default router