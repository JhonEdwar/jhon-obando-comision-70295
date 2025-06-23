import { productService } from "../services/product.service.js"

export const productController = {
    getProducts: async (req, res) => {
        try {
            const products = await productService.getProduct()
            res.status(200).send(products);
        } catch (error) {
            res.status(500).send({ message: "Internal Server Error", error: error.message });
            
        }
    },
    getProductsById: async (req, res) => {
        const { id } = req.params
        try {
            const product = await productService.getProductById(id)
            if (!product) {
                return res.status(404).send({ message: "Product not found" });
            }
            res.status(200).send(product);
        } catch (error) {
            res.status(500).send({ message: "Internal Server Error", error: error.message });
        }
    },


    createProduct: async (req, res) => {
        const product = req.body
        const response = await productService.createProduct(product)
        res.send({message: response})
    },
    updateProduct: async (req, res) => {
        const {id} = req.params
        const updateProduct = req.body
        const response = await productService.updateProduct(id,updateProduct)
        res.send({message: response})
    },
    deleteProduct: async (req, res) => {
        const id = req.params.id
        const response = await productService.deleteProduct(id)
        res.send({message: response})
    }
}