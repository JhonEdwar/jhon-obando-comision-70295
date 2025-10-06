import BuyerDao from "../daos/buyer.dao.js"
import BuyerDTO from "../dtos/buyer.dto.js"
import AppError from "../utils/appError.js"
import logger from "../config/logger.js"

const buyerService = new BuyerDao()


export const getBuyersService = async () => {
    logger.info('BuyerService: Attempting to fetch all buyers')
    try {
        const result = await buyerService.get()
        const buyers =  result.map(buyer=>{
            const newBuyer= new BuyerDTO(buyer)
            return newBuyer
        })
        logger.info(`BuyerService: Successfully fetched ${buyers.length} buyers`)
        return buyers
    } catch (error) {
        logger.error(`BuyerService: Failed to fetch buyers - ${error.message}`)
        if (error instanceof AppError) throw error
        throw new AppError(500, `Failed to fetch buyers: ${error.message}`)
    }
}

export const getBuyerByEmailService = async (email) => {
    logger.info(`BuyerService: Attempting to fetch buyer by email: ${email}`)
    try {
        const result = await buyerService.getByEmail(email)
        if (!result) {
            logger.warn(`BuyerService: No buyer found with email: ${email}`)
            throw new AppError(404, "No buyer found with the given email");
        }
        const buyer = new BuyerDTO(result)
        logger.info(`BuyerService: Successfully fetched buyer with email: ${email}`)
        return buyer
    } catch (error) {
        logger.error(`BuyerService: Failed to fetch buyer by email ${email} - ${error.message}`)
        if (error instanceof AppError) throw error
        throw new AppError(500, `Failed to fetch buyersByEmail: ${error.message}`)
    }
}

export const getBuyerByIdService = async (id) => {
    logger.info(`BuyerService: Attempting to fetch buyer by ID: ${id}`)
    try {
        const result = await buyerService.getById(id)
        const buyer= new BuyerDTO(result)
        logger.info(`BuyerService: Successfully fetched buyer with ID: ${id}`)
        return buyer
    } catch (error) {
        logger.error(`BuyerService: Failed to fetch buyer by ID ${id} - ${error.message}`)
        throw new AppError(500, `Failed to fetch buyer by ID: ${error.message}`)
    }
}

export const addOrderToBuyerService = async (id, updateBuyer, options = {}) => {
    logger.info(`BuyerService: Attempting to add order to buyer with ID: ${id}`)
    try {
        const result = await buyerService.updateOrders(id, updateBuyer, options)
        if(!result) {
            logger.warn(`BuyerService: No buyer found with ID: ${id} for order update`)
            throw new AppError(404, "No buyer found with the given ID"); 
        }
        logger.info(`BuyerService: Successfully added order to buyer with ID: ${id}`)
        return result
    } catch (error) {
        logger.error(`BuyerService: Failed to add order to buyer with ID ${id} - ${error.message}`)
        throw error
    }
}   

export const updateBuyerService = async (id, updateBuyer) => {
    logger.info(`BuyerService: Attempting to update buyer with ID: ${id}`)
    try {
        const result = await buyerService.update(id, updateBuyer)
        if (!result) {
            logger.warn(`BuyerService: No buyer found with ID: ${id} for update`)
            throw new AppError(404, "No buyer found with the given ID");
        }
        logger.info(`BuyerService: Successfully updated buyer with ID: ${id}`)
        return result
    } catch (error) {
        logger.error(`BuyerService: Failed to update buyer with ID ${id} - ${error.message}`)
        throw error
    }
}

