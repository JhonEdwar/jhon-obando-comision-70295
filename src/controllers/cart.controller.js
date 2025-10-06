import { 
    getCartsService, 
    getCartByIdService,
    createCartService, 
    updateCartService, 
    deleteCartService } 
    from "../services/cart.service.js";
import AppError from "../utils/appError.js"
import { asyncHandler } from "../utils/asyncHandler.js"
import logger from "../config/logger.js"
    

export const getCarts = asyncHandler(async (req, res) => {
    logger.info('CartController: Attempting to fetch all carts')
    const result = await getCartsService()
    logger.info(`CartController: Successfully fetched ${result.length} carts`)
    res.sendSuccess(result);
});

export const getCartbyIdBuyer = asyncHandler(async (req, res) => {
    const {_id}= req.user
    logger.info(`CartController: Attempting to fetch cart for buyer ID: ${_id}`)
    const result = await getCartByIdService(_id)
    logger.info(`CartController: Successfully fetched cart for buyer ID: ${_id}`)
    res.sendSuccess(result);
});

export const createCart = asyncHandler(async (req, res) => {
    const { products } = req.body;
    const { _id: userId } = req.user;
    logger.info(`CartController: Attempting to create cart for user ID: ${userId}`)
    const newCart = await createCartService({ userId, products });
    logger.info(`CartController: Successfully created cart with ID: ${newCart._id} for user ID: ${userId}`)
    res.sendSuccess({ message: "Cart created successfully", newCart });
});


export const addProductToCart = asyncHandler(async (req, res) => {
    const { cartId } = req.params;
    const { productId, quantity } = req.body;
    logger.info(`CartController: Attempting to add product ${productId} to cart ${cartId}`)
    const updatedCart = await updateCartService(cartId, { productId, quantity });
    logger.info(`CartController: Successfully added product ${productId} to cart ${cartId}`)
    res.sendSuccess({ message: "Product added to cart successfully", updatedCart });
});

export const deleteCart = asyncHandler(async (req, res) => {
    const { id } = req.params;
    logger.info(`CartController: Attempting to delete cart with ID: ${id}`)
    await deleteCartService(id);
    logger.info(`CartController: Successfully deleted cart with ID: ${id}`)
    res.sendSuccess({ message: "Cart deleted successfully" });
});