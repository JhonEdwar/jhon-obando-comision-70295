import { Router } from "express"
import { getBuyers, getBuyerById,updateBuyer} from "../controllers/buyer.controller.js"
import {authorization} from "../middlewares/authorization.js"
import { passportCall } from "../utils/passportCall.js";

const router = Router()

router.get('/',passportCall('jwt'),authorization(["business"]),getBuyers)
router.get('/:id',passportCall('jwt'),authorization(["business"]),getBuyerById)
router.patch('/:id',passportCall('jwt'),authorization(["buyer"]),updateBuyer)

export default router