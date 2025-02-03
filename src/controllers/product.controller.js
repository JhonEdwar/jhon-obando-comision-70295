import { productService } from "../services/product.service.js"

export const productController = {
    getProducts: (req, res) => {
        const products = productService.getProducts()
        res.send(products)
    },
    createProduct: (req, res) => {
        const product = req.body
        const response = productService.createProduct(product)
        res.send({message: response})
    },
    updateProduct: (req, res) => {
        const id = parseInt(req.params.id)
        const updateProduct = req.body
        const response = productService.updateProduct(id,updateProduct)
        res.send({message: response})
    },
    deleteProduct: (req, res) => {
        const id = parseInt(req.params.id)
        const response = productService.deleteProduct(parseInt(id))
        res.send({message: response})
    }
}