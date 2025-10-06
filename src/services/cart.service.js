import CartDao from '../daos/cart.dao.js';
import AppError from "../utils/appError.js"
import logger from "../config/logger.js"

const cartDao = new CartDao();

export const getCartsService = async () => {
    logger.info('CartService: Attempting to fetch all carts')
    try {
        const carts = await cartDao.get();
        logger.info(`CartService: Successfully fetched ${carts.length} carts`)
        return carts;
    } catch (error) {
        logger.error(`CartService: Failed to fetch carts - ${error.message}`)
        throw error
    }
}

export const getCartByIdService = async (idBuyer) => {
    logger.info(`CartService: Attempting to fetch cart by buyer ID: ${idBuyer}`)
    try {
        const cart = await cartDao.getByIdBuyer(idBuyer);
        logger.info(`CartService: Successfully fetched cart for buyer ID: ${idBuyer}`)
        return cart;
    } catch (error) {
        logger.error(`CartService: Failed to fetch cart by buyer ID ${idBuyer} - ${error.message}`)
        throw error
    }
};

export const createCartService = async (data) => {
    logger.info(`CartService: Attempting to create cart for user ID: ${data.userId}`)
    const cartData = {
        products: data.products || [],
        userId: data.userId,
        createdAt: new Date()
    };
    try {
        const newCart = await cartDao.create(cartData); 
        if (!newCart) {
            logger.warn(`CartService: Failed to create cart for user ID: ${data.userId}`)
            throw new AppError(404, "No cart found with the given ID");
        }
        logger.info(`CartService: Successfully created cart with ID: ${newCart._id} for user ID: ${data.userId}`)
        return newCart;
    } catch (error) {
        logger.error(`CartService: Failed to create cart for user ID ${data.userId} - ${error.message}`)
        throw error
    }
};

export const updateCartService = async (id, updateProducts) => {
    logger.info(`CartService: Attempting to update cart with ID: ${id}`)
    try {
        const updatedCart = await cartDao.updateCart(id, updateProducts);
        if (!updatedCart) {
            logger.warn(`CartService: No cart found with ID: ${id} for update`)
            throw new AppError(404, "No cart found with the given ID");
        }
        logger.info(`CartService: Successfully updated cart with ID: ${id}`)
        return updatedCart;
    } catch (error) {
        logger.error(`CartService: Failed to update cart with ID ${id} - ${error.message}`)
        throw error
    }
};

export const deleteCartService = async (id) => {
    logger.info(`CartService: Attempting to delete cart with ID: ${id}`)
    try {
        const result = await cartDao.deleteCart(id)
        if (result.deletedCount === 0) {
            logger.warn(`CartService: No cart found with ID: ${id} for deletion`)
            throw new AppError(404, "No cart found with the given ID");
        }
        logger.info(`CartService: Successfully deleted cart with ID: ${id}`)
        return result
    } catch (error) {
        logger.error(`CartService: Failed to delete cart with ID ${id} - ${error.message}`)
        throw error
    }
};