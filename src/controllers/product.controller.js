import { getProductService,getProductByIdService,createProductService,updateProductService, deleteProductService } from "../services/product.service.js"
import AppError from "../utils/appError.js"
import { asyncHandler } from "../utils/asyncHandler.js"
import logger from "../config/logger.js"

export const getProducts= asyncHandler(async (req, res) => {
    logger.info('ProductController: Attempting to fetch all products')
    const products = await getProductService()
    logger.info(`ProductController: Successfully fetched ${products.length} products`)
    res.sendSuccess(products);
});

export const getProductsById= asyncHandler(async (req, res) => {
    const { id } = req.params
    logger.info(`ProductController: Attempting to fetch product by ID: ${id}`)
    const product = await getProductByIdService(id)
    if (!product) {
        logger.warn(`ProductController: No product found with ID: ${id}`)
        throw new AppError(404, "Product not found");
    }
    logger.info(`ProductController: Successfully fetched product with ID: ${id}`)
    res.sendSuccess(product);
});

export const createProduct = asyncHandler(async (req, res) => {
    const product = req.body;
    logger.info(`ProductController: Attempting to create product: ${product.title}`)
    if (!product.title || !product.price || !product.stock) {
        logger.warn('ProductController: Missing required product fields')
        throw new AppError(400, "Missing required product fields");
    }
    const response = await createProductService(product);
    logger.info(`ProductController: Successfully created product with ID: ${response._id}`)
    res.sendSuccess({ message: "Product created successfully", product: response });
});

export const updateProduct = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const updateProduct = req.body;
    logger.info(`ProductController: Attempting to update product with ID: ${id}`)
    const response = await updateProductService(id, updateProduct);
    logger.info(`ProductController: Successfully updated product with ID: ${id}`)
    res.sendSuccess({ message: "Product updated successfully", product: response });    
});

export const deleteProduct = asyncHandler(async (req, res) => {
    const id = req.params.id;
    logger.info(`ProductController: Attempting to delete product with ID: ${id}`)
    const response = await deleteProductService(id);
    logger.info(`ProductController: Successfully deleted product with ID: ${id}`)
    res.sendSuccess({ message: "Product deleted successfully", product: response });
});
