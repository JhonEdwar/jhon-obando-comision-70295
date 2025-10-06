import passwordResetModel from "../models/passwordReset.model.js"
import AppError from "../utils/appError.js"
import logger from "../config/logger.js"

export default class ResetPasswordDao {

    constructor() {

    }

    createPaswordReset = async (email, token) => {
        logger.info(`ResetPasswordDao: Attempting to create password reset for email: ${email}`)
        try {
            const result = await passwordResetModel.create({ email, token })
            logger.info(`ResetPasswordDao: Successfully created password reset for email: ${email}`)
            return result
        } catch (error) {
            logger.error(`ResetPasswordDao: Failed to create password reset for email ${email} - ${error.message}`)
            throw new AppError(500, `Failed to create password reset: ${error.message}`)
        }
    }
    getByToken = async (token) => {
        logger.info(`ResetPasswordDao: Attempting to fetch password reset by token`)
        try {
            const result = await passwordResetModel.findOne({ token })
            if (!result) {
                logger.warn(`ResetPasswordDao: Password reset token not found or expired`)
            } else {
                logger.info(`ResetPasswordDao: Successfully fetched password reset by token`)
            }
            return result
        } catch (error) {
            logger.error(`ResetPasswordDao: Failed to get password reset by token - ${error.message}`)
            throw new AppError(500, `Failed to get password reset by token: ${error.message}`)
        }
    }

    deleteByToken = async (token) => {
        logger.info(`ResetPasswordDao: Attempting to delete password reset by token`)
        try {
            const result = await passwordResetModel.deleteOne({ token })
            if (result.deletedCount === 0) {
                logger.warn(`ResetPasswordDao: No password reset found with token for deletion`)
            } else {
                logger.info(`ResetPasswordDao: Successfully deleted password reset by token`)
            }
            return result
        } catch (error) {
            logger.error(`ResetPasswordDao: Failed to delete password reset by token - ${error.message}`)
            throw new AppError(500, `Failed to delete password reset by token: ${error.message}`)
        }
    }
}
