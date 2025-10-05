import  ProductDao  from "../daos/product.dao.js"
import AppError from "../utils/appError.js"

const productDao = new ProductDao()

export const getProductService = async () => {
    try {
        const products = await productDao.getProduct()
        return products
    } catch (error) {
        console.error("Error in updateCartService:", error);
        throw error
    }
}

export const getProductByIdService = async (id) => {
    try {
        const product = await productDao.getProductById(id)
        return product
    } catch (error) {
        console.error("Error in getProductByIdService:", error);
        throw error
    }
}

export const getProductsByIdsService = async (ids) => {
    try {
        const products = await productDao.getProductsByIds(ids);
        return products;
    } catch (error) {
        console.error("Error in getProductsByIdsService:", error);
        throw error;
    }
}

export const createProductService = async (product) => {
    try {
        const newProduct= await productDao.createProduct(product)
        return newProduct
    } catch (error) {
        console.error("Error in createProductService:", error);
        throw error
    }
}

export const updateProductService = async (id, updateProduct) => {
    try {
        const result = await productDao.updateProduct(id, updateProduct)
        return result
    } catch (error) {
        console.error("Error in updateProductService:", error);
        throw error
    }
}

export const deleteProductService = async (id) => {
    try {
        const result= await productDao.deleteProduct(id)
        if (result.deletedCount === 0) {
            throw new AppError(404, "Product not found or already deleted");
        }
        return result 
    } catch (error) {
        console.error("Error in deleteProductService:", error);
        throw error
    }
}
