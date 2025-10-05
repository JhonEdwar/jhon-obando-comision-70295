import { Router } from "express"
import { getOrders, getOrdersById, getOrdersByIdBuyer, getOrdersByIdBusiness, orderCreate, ordersResolve } from "../controllers/orders.controller.js"
import {authorization} from "../middlewares/authorization.js"
import {passportCall} from "../utils/passportCall.js"
import { validate } from "../middlewares/validate.js";
import { createOrderSchema,resolveOrderSchema } from "../validations/order.validation.js";



const router = Router()

router.get('/',passportCall('jwt'),authorization(["admin"]), getOrders)
router.get('/:id',passportCall('jwt'),authorization(["buyer","business"]),getOrdersById)
router.get('/buyer/:idBuyer',passportCall('jwt'),authorization(["buyer","business"]),getOrdersByIdBuyer)
router.get('/business/:idBusiness',passportCall('jwt'),authorization(["buyer","business"]),getOrdersByIdBusiness)
router.post('/',passportCall('jwt'),authorization(["buyer"]),validate(createOrderSchema),orderCreate)
router.post('/:id',passportCall('jwt'),authorization(["business"]),validate(resolveOrderSchema),ordersResolve)

export default router