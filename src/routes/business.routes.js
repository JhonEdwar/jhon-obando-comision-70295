import { Router } from "express"
import { getBusiness, getBusinessById} from "../controllers/business.controller.js"
import {authorization} from "../middlewares/authorization.js"

const router = Router()

router.get('/',authorization(["business"]),getBusiness)
router.get('/:id',authorization(["business"]),getBusinessById)

export default router