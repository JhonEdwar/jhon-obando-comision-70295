import { productDao } from "../daos/product.dao.js"

export const productService = {
    getProduct: () => {
        const products = productDao.getProduct()
        return products
    },
    createProduct: (product) => {
        productDao.createProduct(product)
        return 'product created!'
    },
    updateProduct: (id,updateProduct) => {
        productDao.updateProduct(id,updateProduct)
        return 'product updated!'
    },
    deleteProduct: (id) => {
        productDao.deleteProduct(id)
        return 'product deleted!'
    }
}