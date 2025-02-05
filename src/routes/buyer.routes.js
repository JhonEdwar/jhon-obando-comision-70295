import { Router } from "express"
import { getBuyers, getBuyerById} from "../controllers/buyer.controller.js"
import {authorization} from "../middlewares/authorization.js"

const router = Router()

router.get('/',authorization(["buyer"]),getBuyers)
router.get('/:id',authorization(["buyer"]),getBuyerById)

export default router