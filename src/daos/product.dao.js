import productModel from "../models/product.model.js"

export const productDao = {

    getProduct: async () => {
        try {
            const products = await productModel.find()
            return products
        } catch (error) {
            return { error: error.message }
        }
    },
    getProductById: async (id) => {
        try {
            const product = await productModel.findById(id)
            return product
        } catch (error) {
            return { error: error.message }
        }
    },
    createProduct: async (product) => {
        try {
            const newProduct = await productModel.create(product)
            return newProduct
        } catch (error) {
            return { error: error.message }
        }
    },
    updateProduct: async (id, updateProduct) => {
        try {
            const result = await productModel.updateOne({ _id: id }, updateProduct)
            return result
        } catch (error) {
            return { error: error.message }
        }
    },
    deleteProduct: async (id) => {
        try {
            const result = await productModel.deleteOne({ _id: id })
            return result
        } catch (error) {
            return { error: error.message }
        }
    }

}