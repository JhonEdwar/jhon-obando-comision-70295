import businessModel from "../models/business.model.js"
import AppError from "../utils/appError.js"
import logger from "../config/logger.js"

export default class BusinessDao {

    constructor(){

    }

    get = async () => {
        logger.info('BusinessDao: Attempting to fetch all businesses')
        try {
            const result = await businessModel.find()   
            logger.info(`BusinessDao: Successfully fetched ${result.length} businesses`)
            return result
        } catch (error) {
            logger.error(`BusinessDao: Failed to fetch businesses - ${error.message}`)
            throw new AppError(500, `Failed to fetch businesses: ${error.message}`)
        }
    }

    getById = async (id) => {
        logger.info(`BusinessDao: Attempting to fetch business by ID: ${id}`)
        try {
            const result = await businessModel.findOne({ _id: id })
            if (!result) {
                logger.warn(`BusinessDao: Business not found with ID: ${id}`)
                throw new AppError(404, "Business not found")
            }
            logger.info(`BusinessDao: Successfully fetched business with ID: ${id}`)
            return result
        } catch (error) {   
            if (error instanceof AppError) throw error;
            logger.error(`BusinessDao: Failed to fetch business by ID ${id} - ${error.message}`)
            throw new AppError(500, `Failed to fetch business by ID: ${error.message}`)
        }
    }

    getByEmail = async (email) => {
        logger.info(`BusinessDao: Attempting to fetch business by email: ${email}`)
        try {
            const result = await businessModel.findOne({ email })
            if (!result) {
                logger.warn(`BusinessDao: Business not found with email: ${email}`)
                throw new AppError(404, "Business not found")
            }
            logger.info(`BusinessDao: Successfully fetched business with email: ${email}`)
            return result
        } catch (error) {
            if (error instanceof AppError) throw error;
            logger.error(`BusinessDao: Failed to fetch business by email ${email} - ${error.message}`)
            throw new AppError(500, `Failed to fetch business by email: ${error.message}`)
        }
    }

    update = async (id, updateData) => {
        logger.info(`BusinessDao: Attempting to update business with ID: ${id}`)
        try {
            const result = await businessModel.findByIdAndUpdate(id, updateData, { new: true });
            if (!result) {
                logger.warn(`BusinessDao: Business not found for update with ID: ${id}`)
                throw new AppError(404, "Business not found");
            }
            logger.info(`BusinessDao: Successfully updated business with ID: ${id}`)
            return result;
        } catch (error) {
           if (error instanceof AppError) throw error;
           logger.error(`BusinessDao: Failed to update business with ID ${id} - ${error.message}`)
           throw new AppError(500, `Failed to update business: ${error.message}`);
        }
    }

    save = async (business) => {
        logger.info(`BusinessDao: Attempting to save business with email: ${business.email}`)
        try {
            const result = await businessModel.create(business)
            logger.info(`BusinessDao: Successfully saved business with ID: ${result._id}`)
            return result
        } catch (error) {
            if (error.code === 11000) {
                logger.warn(`BusinessDao: Business already exists with email: ${business.email}`)
                throw new AppError(409, "Business already exists with this email");
            }
            logger.error(`BusinessDao: Failed to save business - ${error.message}`)
            throw new AppError(500, `Failed to save business: ${error.message}`);
        }
    }

}   