import  ProductDao  from "../daos/product.dao.js"
import AppError from "../utils/appError.js"
import logger from "../config/logger.js"

const productDao = new ProductDao()

export const getProductService = async () => {
    logger.info('ProductService: Attempting to fetch all products')
    try {
        const products = await productDao.getProduct()
        logger.info(`ProductService: Successfully fetched ${products.length} products`)
        return products
    } catch (error) {
        logger.error(`ProductService: Failed to fetch products - ${error.message}`)
        throw error
    }
}

export const getProductByIdService = async (id) => {
    logger.info(`ProductService: Attempting to fetch product by ID: ${id}`)
    try {
        const product = await productDao.getProductById(id)
        logger.info(`ProductService: Successfully fetched product with ID: ${id}`)
        return product
    } catch (error) {
        logger.error(`ProductService: Failed to fetch product by ID ${id} - ${error.message}`)
        throw error
    }
}

export const getProductsByIdsService = async (ids) => {
    logger.info(`ProductService: Attempting to fetch products by IDs: ${ids.join(', ')}`)
    try {
        const products = await productDao.getProductsByIds(ids);
        logger.info(`ProductService: Successfully fetched ${products.length} products by IDs`)
        return products;
    } catch (error) {
        logger.error(`ProductService: Failed to fetch products by IDs - ${error.message}`)
        throw error;
    }
}

export const createProductService = async (product) => {
    logger.info(`ProductService: Attempting to create product: ${product.name}`)
    try {
        const newProduct= await productDao.createProduct(product)
        logger.info(`ProductService: Successfully created product with ID: ${newProduct._id}`)
        return newProduct
    } catch (error) {
        logger.error(`ProductService: Failed to create product - ${error.message}`)
        throw error
    }
}

export const updateProductService = async (id, updateProduct) => {
    logger.info(`ProductService: Attempting to update product with ID: ${id}`)
    try {
        const result = await productDao.updateProduct(id, updateProduct)
        logger.info(`ProductService: Successfully updated product with ID: ${id}`)
        return result
    } catch (error) {
        logger.error(`ProductService: Failed to update product with ID ${id} - ${error.message}`)
        throw error
    }
}

export const deleteProductService = async (id) => {
    logger.info(`ProductService: Attempting to delete product with ID: ${id}`)
    try {
        const result= await productDao.deleteProduct(id)
        if (result.deletedCount === 0) {
            logger.warn(`ProductService: No product found with ID: ${id} for deletion`)
            throw new AppError(404, "Product not found or already deleted");
        }
        logger.info(`ProductService: Successfully deleted product with ID: ${id}`)
        return result 
    } catch (error) {
        logger.error(`ProductService: Failed to delete product with ID ${id} - ${error.message}`)
        throw error
    }
}
