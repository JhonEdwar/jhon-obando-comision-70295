import { Router } from "express"
import { getOrders, getOrdersById, getOrdersByIdBuyer, getOrdersByIdBusiness, orderCreate, ordersResolve } from "../controllers/orders.controller.js"
import {authorization} from "../middlewares/authorization.js"
import {passportCall} from "../utils/passportCall.js"

const router = Router()

router.get('/',passportCall('jwt'),authorization(["admin"]), getOrders)
router.get('/:id',passportCall('jwt'),authorization(["buyer","business"]),getOrdersById)
router.get('/buyer/:idBuyer',passportCall('jwt'),authorization(["buyer","business"]),getOrdersByIdBuyer)
router.get('/business/:idBusiness',passportCall('jwt'),authorization(["buyer","business"]),getOrdersByIdBusiness)
router.post('/',passportCall('jwt'),authorization(["buyer"]),orderCreate)
router.post('/:id',passportCall('jwt'),authorization(["business"]),ordersResolve)

export default router