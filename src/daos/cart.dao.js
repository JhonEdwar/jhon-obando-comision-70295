import cartModel from "../models/cart.model.js";
import AppError from "../utils/appError.js"
import logger from "../config/logger.js"

export default class CartDao{
    constructor() {}
    get=async()=>{
        logger.info('CartDao: Attempting to fetch all carts')
        try {
            const result=await cartModel.find()
            logger.info(`CartDao: Successfully fetched ${result.length} carts`)
            return result    
        } catch (error) {
            logger.error(`CartDao: Failed to fetch carts - ${error.message}`)
            throw new AppError(500, `Failed to fetch carts: ${error.message}`)
        }
    }

    getByIdBuyer = async (idBuyer) => {
        logger.info(`CartDao: Attempting to fetch cart by buyer ID: ${idBuyer}`)
        try {
            const result = await cartModel.findOne({ userId: idBuyer})
            if (!result) {
                logger.warn(`CartDao: Cart not found for buyer ID: ${idBuyer}`)
                throw new AppError(404, "Cart not found")
            }
            logger.info(`CartDao: Successfully fetched cart for buyer ID: ${idBuyer}`)
            return result
        } catch (error) {
            if (error instanceof AppError) throw error;
            logger.error(`CartDao: Failed to fetch cart by buyer ID ${idBuyer} - ${error.message}`)
            throw new AppError(500, `Failed to fetch cart by buyer ID: ${error.message}`)
        }
    }

    create = async (cart) => {
        logger.info(`CartDao: Attempting to create cart for user ID: ${cart.userId}`)
        try {
            const result = await cartModel.create(cart)
            logger.info(`CartDao: Successfully created cart with ID: ${result._id}`)
            return result
        } catch (error) {
            if (error.code === 11000) {
                logger.warn(`CartDao: Cart already exists for user ID: ${cart.userId}`)
                throw new AppError(409, "Cart already exists for this user")
            }
            logger.error(`CartDao: Failed to create cart - ${error.message}`)
            throw new AppError(500, `Failed to create cart: ${error.message}`)
        }
    }

    updateCart = async (id, updateProducts) => {
        logger.info(`CartDao: Attempting to update cart with ID: ${id}`)
        try {
            const result = await cartModel.updateOne({ _id: id }, { $set: { products: updateProducts } })
            if (result.modifiedCount === 0) {
                logger.warn(`CartDao: No cart found with ID: ${id} for update`)
                throw new AppError(404, "No cart found with the given ID")
            }
            logger.info(`CartDao: Successfully updated cart with ID: ${id}`)
            return result
        } catch (error) {
            if (error instanceof AppError) throw error;
            logger.error(`CartDao: Failed to update cart with ID ${id} - ${error.message}`)
            throw new AppError(500, `Failed to update cart: ${error.message}`)
        }
    }

    deleteCart = async (id) => {
        logger.info(`CartDao: Attempting to delete cart with ID: ${id}`)
        try {
            const result = await cartModel.deleteOne({ _id: id })
            if (result.deletedCount === 0) {
                logger.warn(`CartDao: No cart found with ID: ${id} for deletion`)
                throw new AppError(404, "No cart found with the given ID")
            }
            logger.info(`CartDao: Successfully deleted cart with ID: ${id}`)
            return result
        } catch (error) {
            if (error instanceof AppError) throw error;
            logger.error(`CartDao: Failed to delete cart with ID ${id} - ${error.message}`)
            throw new AppError(500, `Failed to delete cart: ${error.message}`)
        }
    }

}


