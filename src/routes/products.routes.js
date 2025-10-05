import { Router } from "express"
import { getProducts, getProductsById, createProduct, updateProduct, deleteProduct} from "../controllers/product.controller.js"
import {authorization} from "../middlewares/authorization.js"
import {passportCall} from "../utils/passportCall.js"
import { validate } from "../middlewares/validate.js";
import { createProductSchema, updateProductSchema } from "../validations/product.validation.js";


const router = Router()

router.get('/',passportCall('jwt'),getProducts)
router.get('/:id',passportCall('jwt'),getProductsById)
router.post('/',passportCall('jwt'),authorization(["business"]),validate(createProductSchema),createProduct)
router.patch('/:id',passportCall('jwt'),authorization(["business"]),validate(updateProductSchema),updateProduct)
router.delete('/:id',passportCall('jwt'),authorization(["business"]),deleteProduct)

export default router