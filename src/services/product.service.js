import { productDao } from "../daos/product.dao.js"

export const productService = {
    getProduct:async () => {
        const products = await productDao.getProduct()
        return products
    },
    getProductById: async (id) => {
        const product = await productDao.getProductById(id)
        return product
    },
    createProduct: async (product) => {
        await productDao.createProduct(product)
        return 'product created!'
    },
    updateProduct: async (id,updateProduct) => {
        await productDao.updateProduct(id,updateProduct)
        return 'product updated!'
    },
    deleteProduct: async (id) => {
        await productDao.deleteProduct(id)
        return 'product deleted!'
    }
}