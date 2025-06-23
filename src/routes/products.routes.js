import { Router } from "express"
import { productController } from "../controllers/product.controller.js"

const router = Router()

router.get('/',productController.getProducts)
router.get('/:id',productController.getProductsById)
router.post('/',productController.createProduct)
router.patch('/:id',productController.updateProduct)
router.delete('/:id',productController.deleteProduct)

export default router