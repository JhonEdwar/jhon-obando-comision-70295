import { Router } from "express"
import { getBusiness, getBusinessById} from "../controllers/business.controller.js"
import {authorization} from "../middlewares/authorization.js"

const router = Router()

router.get('/',authorization(["buyer"]),getBusiness)
router.get('/:id',authorization(["buyer"]),getBusinessById)
// router.post('/:id/product',authorization(["business"]),addProduct)

export default router