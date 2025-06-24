import { ProductDao } from "../daos/product.dao.js"

const productDao = new ProductDao()

export const getProductService = async () => {
    try {
        const products = await productDao.getProduct()
        return products
    } catch (error) {
        throw new Error('Error getting products: ' + error.message)
    }
}

export const getProductByIdService = async (id) => {
    try {
        const product = await productDao.getProductById(id)
        return product
    } catch (error) {
        throw new Error('Error getting product by id: ' + error.message)
    }
}

export const createProductService = async (product) => {
    try {
        const newProduct= await productDao.createProduct(product)
        return newProduct
    } catch (error) {
        throw new Error('Error creating product: ' + error.message)
    }
}

export const updateProductService = async (id, updateProduct) => {
    try {
        const result = await productDao.updateProduct(id, updateProduct)
        return result
    } catch (error) {
        throw new Error('Error updating product: ' + error.message)
    }
}

export const deleteProductService = async (id) => {
    try {
        const result= await productDao.deleteProduct(id)
        if (result.deletedCount === 0) {
            throw new Error("Cart not found or already deleted");
        }
        return result 
    } catch (error) {
        throw new Error('Error deleting product: ' + error.message)
    }
}
