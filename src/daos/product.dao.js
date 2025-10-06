import productModel from "../models/product.model.js"
import AppError from "../utils/appError.js"
import logger from "../config/logger.js"

export default class ProductDao {
    constructor() {}
    async getProduct() {
        logger.info('ProductDao: Attempting to fetch all products')
        try {
            const products = await productModel.find();
            logger.info(`ProductDao: Successfully fetched ${products.length} products`)
            return products;
        } catch (error) {
            logger.error(`ProductDao: Failed to fetch products - ${error.message}`)
            throw new AppError(500, `Failed to fetch products: ${error.message}`);
        }
    }

    async getProductById(id) {
        logger.info(`ProductDao: Attempting to fetch product by ID: ${id}`)
        try {
            const product = await productModel.findById(id);
            if (!product) {
                logger.warn(`ProductDao: Product not found with ID: ${id}`)
                throw new AppError(404, "Product not found");
            }
            logger.info(`ProductDao: Successfully fetched product with ID: ${id}`)
            return product;
        } catch (error) {
            if (error instanceof AppError) throw error;
            logger.error(`ProductDao: Failed to fetch product by ID ${id} - ${error.message}`)
            throw new AppError(500, `Failed to fetch product by ID: ${error.message}`);
        }
    }

    async getProductsByIds(ids) {
        logger.info(`ProductDao: Attempting to fetch products by IDs: ${ids.join(', ')}`)
        try {
            const products = await productModel.find({ _id: { $in: ids } });
            logger.info(`ProductDao: Successfully fetched ${products.length} products by IDs`)
            return products;
        } catch (error) {
            if (error instanceof AppError) throw error;
            logger.error(`ProductDao: Failed to fetch products by IDs - ${error.message}`)
            throw new AppError(500, `Failed to fetch products: ${error.message}`);
        }
    }

    async createProduct(product) {
        logger.info(`ProductDao: Attempting to create product: ${product.name}`)
        try {
            const newProduct = await productModel.create(product);
            logger.info(`ProductDao: Successfully created product with ID: ${newProduct._id}`)
            return newProduct;
        } catch (error) {
            if (error.code === 11000) {
                logger.warn(`ProductDao: Product already exists with ID: ${product._id}`)
                throw new AppError(409, "Product already exists with this ID");
            }
            logger.error(`ProductDao: Failed to create product - ${error.message}`)
            throw new AppError(500, `Failed to create product: ${error.message}`);
        }
    }

    async updateProduct(id, updateProduct ,options = {}) {
        logger.info(`ProductDao: Attempting to update product with ID: ${id}`)
        try {
            const result = await productModel.updateOne({ _id: id }, updateProduct, options);
            if (result.modifiedCount === 0) {
                logger.warn(`ProductDao: No product found with ID: ${id} for update`)
                throw new AppError(404, "No product found with the given ID");
            }
            logger.info(`ProductDao: Successfully updated product with ID: ${id}`)
            return result;
        } catch (error) {
            if (error instanceof AppError) throw error;
            logger.error(`ProductDao: Failed to update product with ID ${id} - ${error.message}`)
            throw new AppError(500, `Failed to update product: ${error.message}`);
        }
    }

    async deleteProduct(id) {
        logger.info(`ProductDao: Attempting to delete product with ID: ${id}`)
        try {
            const result = await productModel.deleteOne({ _id: id });
            if (result.deletedCount === 0) {
                logger.warn(`ProductDao: No product found with ID: ${id} for deletion`)
                throw new AppError(404, "No product found with the given ID");
            }
            logger.info(`ProductDao: Successfully deleted product with ID: ${id}`)
            return result;
        } catch (error) {
            if (error instanceof AppError) throw error;
            logger.error(`ProductDao: Failed to delete product with ID ${id} - ${error.message}`)
            throw new AppError(500, `Failed to delete product: ${error.message}`);
        }
    }
}

