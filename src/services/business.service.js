import BusinessDao from "../daos/business.dao.js"
import BusDTO from "../dtos/business.dto.js"
import AppError from "../utils/appError.js"
import logger from "../config/logger.js"

const BusinessService = new BusinessDao()


export const getBusinessService = async () => {
    logger.info('BusinessService: Attempting to fetch all businesses')
    try {
        const result = await BusinessService.get()
        const businesses = await result.map(business=>{
            const newBusiness= new BusDTO(business)
            return newBusiness
        })
        logger.info(`BusinessService: Successfully fetched ${businesses.length} businesses`)
        return businesses
    } catch (error) {
        logger.error(`BusinessService: Failed to fetch businesses - ${error.message}`)
        if (error instanceof AppError) throw error
        throw new AppError(500, `Failed to fetch businesses: ${error.message}`)
    }
}

export const getBusinessByIdService = async (id) => {
    logger.info(`BusinessService: Attempting to fetch business by ID: ${id}`)
    try {
        const result = await BusinessService.getById(id)
        if (!result) {
            logger.warn(`BusinessService: No business found with ID: ${id}`)
            throw new AppError(404, "No business found with the given ID");
        }
        const business= new BusDTO(result)
        logger.info(`BusinessService: Successfully fetched business with ID: ${id}`)
        return business
    } catch (error) {
        logger.error(`BusinessService: Failed to fetch business by ID ${id} - ${error.message}`)
        if (error instanceof AppError) throw error
        throw new AppError(500, `Failed to fetch businesses: ${error.message}`)
    }
}

export const updateBusinessService = async (id, updateData) => {
    logger.info(`BusinessService: Attempting to update business with ID: ${id}`)
    try {
        const result = await BusinessService.update(id, updateData)
        if (!result) {
            logger.warn(`BusinessService: No business found with ID: ${id} for update`)
            throw new AppError(404, "No business found with the given ID");
        }
        logger.info(`BusinessService: Successfully updated business with ID: ${id}`)
        return "Business updated successfully"
    } catch (error) {
        logger.error(`BusinessService: Failed to update business with ID ${id} - ${error.message}`)
        throw error
    }
}