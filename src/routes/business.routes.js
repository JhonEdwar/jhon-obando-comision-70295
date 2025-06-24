import { Router } from "express"
import { getBusiness, getBusinessById, addProduct} from "../controllers/business.controller.js"
import {authorization} from "../middlewares/authorization.js"
import { passportCall } from "../utils/passportCall.js";

const router = Router()

router.get('/',passportCall('jwt'),authorization(["buyer"]),getBusiness)
router.get('/:id',passportCall('jwt'),authorization(["buyer"]),getBusinessById)
router.post('/:id/product',authorization(["business"]),addProduct)

export default router