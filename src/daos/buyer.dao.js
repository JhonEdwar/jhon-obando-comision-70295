import buyerModel from "../models/buyer.model.js";
import AppError from "../utils/appError.js"
import logger from "../config/logger.js"

export default class BuyerDao{
    constructor() {}

    get = async () => {
        logger.info('BuyerDao: Attempting to fetch all buyers')
        try {
            const buyers = await buyerModel.find()
            logger.info(`BuyerDao: Successfully fetched ${buyers.length} buyers`)
            return buyers
        } catch (error) {
            logger.error(`BuyerDao: Failed to fetch buyers - ${error.message}`)
            throw new AppError(500, `Failed to fetch buyers: ${error.message}`)
        }
    }

    getById = async (id) => {
        logger.info(`BuyerDao: Attempting to fetch buyer by ID: ${id}`)
        try {
            const buyer = await buyerModel.findOne({ _id: id }) 
            if (!buyer) {
                logger.warn(`BuyerDao: Buyer not found with ID: ${id}`)
                throw new AppError(404, "Buyer not found")
            }
            logger.info(`BuyerDao: Successfully fetched buyer with ID: ${id}`)
            return buyer
        } catch (error) {
            if (error instanceof AppError) throw error
            logger.error(`BuyerDao: Failed to fetch buyer by ID ${id} - ${error.message}`)
            throw new AppError(500, `Failed to fetch buyer by ID: ${error.message}`)
        }
    }
    
    getByEmail = async (email) => {
        logger.info(`BuyerDao: Attempting to fetch buyer by email: ${email}`)
        try {
            const buyer = await buyerModel.findOne({ email })
            if (!buyer) {
                logger.warn(`BuyerDao: Buyer not found with email: ${email}`)
                throw new AppError(404, "Buyer not found")
            }
            logger.info(`BuyerDao: Successfully fetched buyer with email: ${email}`)
            return buyer
        } catch (error) {
            if (error instanceof AppError) throw error
            logger.error(`BuyerDao: Failed to fetch buyer by email ${email} - ${error.message}`)
            throw new AppError(500, `Failed to fetch buyer by email: ${error.message}`)
        }
    }

    updateOrders = async (id, updateBuyer,options = {}) => {
        logger.info(`BuyerDao: Attempting to update orders for buyer ID: ${id}`)
        try {
            const result = await buyerModel.updateOne({ _id: id },{$push: { orders: updateBuyer }},options)
            if (result.modifiedCount === 0) {
                logger.warn(`BuyerDao: No buyer found with ID: ${id} for order update`)
                throw new AppError(404, "No buyer found with the given ID");
            }
            logger.info(`BuyerDao: Successfully updated orders for buyer ID: ${id}`)
            return result
        } catch (error) {
            if (error instanceof AppError) throw error;
            logger.error(`BuyerDao: Failed to update buyer orders for ID ${id} - ${error.message}`)
            throw new AppError(500, `Failed to update buyer orders: ${error.message}`)
        }
    }

    update = async (id, updateBuyer) => {
        logger.info(`BuyerDao: Attempting to update buyer with ID: ${id}`)
        try {
            const result = await buyerModel.updateOne({ _id: id }, updateBuyer)
            if (result.modifiedCount === 0) {
                logger.warn(`BuyerDao: No buyer found with ID: ${id} for update`)
                throw new AppError(404, "No buyer found with the given ID")
            }
            logger.info(`BuyerDao: Successfully updated buyer with ID: ${id}`)
            return result
        } catch (error) {
            if (error instanceof AppError) throw error;
            logger.error(`BuyerDao: Failed to update buyer with ID ${id} - ${error.message}`)
           throw new AppError(500, `Failed to update buyer: ${error.message}`)
        }
    }

    save = async (buyer) => {
        logger.info(`BuyerDao: Attempting to save buyer with email: ${buyer.email}`)
        try {
            const result = await buyerModel.create(buyer)
            logger.info(`BuyerDao: Successfully saved buyer with ID: ${result._id}`)
            return result
        } catch (error) {
            if (error.code === 11000) {
                logger.warn(`BuyerDao: Buyer already exists with email: ${buyer.email}`)
                throw new AppError(409, "Buyer already exists with this email");
            }
            logger.error(`BuyerDao: Failed to save buyer - ${error.message}`)
            throw new AppError(500, `Failed to save buyer: ${error.message}`);
        }
    }
}