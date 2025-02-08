import { Router } from "express"
import { getBuyers, getBuyerById} from "../controllers/buyer.controller.js"
import {authorization} from "../middlewares/authorization.js"
import { passportCall } from "../utils/passportCall.js";

const router = Router()

router.get('/',passportCall('jwt'),authorization(["business"]),getBuyers)
router.get('/:id',passportCall('jwt'),authorization(["business"]),getBuyerById)

export default router