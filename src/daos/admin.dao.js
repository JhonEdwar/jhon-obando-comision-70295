import userModel from "../models/admin.model.js"
import AppError from "../utils/appError.js"
import logger from "../config/logger.js"


export default class AdminDao{
    constructor() {}

    save= async (user) => {
        logger.info(`AdminDao: Attempting to save admin with email: ${user.email}`)
        try {
            const result = await userModel.create(user)
            logger.info(`AdminDao: Successfully saved admin with ID: ${result._id}`)
            return result
        } catch (error) {
            if (error.code === 11000) {
                logger.warn(`AdminDao: Admin already exists with email: ${user.email}`)
                throw new AppError(409, "Admin already exists with this email")
            }       
            logger.error(`AdminDao: Failed to save admin - ${error.message}`)
            throw new AppError(500, `Failed to create admin: ${error.message}`)
        }
    }

    getByEmail = async (email) => {
        logger.info(`AdminDao: Attempting to fetch admin by email: ${email}`)
        try {
            const admin = await userModel.findOne({ email })
            if (!admin) {
                logger.warn(`AdminDao: Admin not found with email: ${email}`)
                throw new AppError(404, "Admin not found")
            }
            logger.info(`AdminDao: Successfully fetched admin with email: ${email}`)
            return admin
        } catch (error) {
            if (error instanceof AppError) throw error
            logger.error(`AdminDao: Failed to fetch admin by email ${email} - ${error.message}`)
            throw new AppError(500, `Failed to fetch admin by email: ${error.message}`)
        }
    }

    update = async (id, updateData) => {
        logger.info(`AdminDao: Attempting to update admin with ID: ${id}`)
        try {
            const result = await userModel.updateOne({ _id: id }, updateData)
            if (result.modifiedCount === 0) {
                logger.warn(`AdminDao: No admin found with ID: ${id} for update`)
                throw new AppError(404, "No admin found with the given ID")
            }
            logger.info(`AdminDao: Successfully updated admin with ID: ${id}`)
            return result
        } catch (error) {
            if (error instanceof AppError) throw error
            logger.error(`AdminDao: Failed to update admin with ID ${id} - ${error.message}`)
            throw new AppError(500, `Failed to update admin: ${error.message}`)
        }
    }



}