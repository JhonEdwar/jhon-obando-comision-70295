import { createHash } from "../utils/hashingUtils.js"
import AppError from "../utils/appError.js"
import BuyerDao from "../daos/buyer.dao.js"
import BusinessDao from "../daos/business.dao.js"
import AdminDao from "../daos/admin.dao.js"
import { v4 as uuidv4 } from 'uuid';
import { findUserByEmail } from "./auth.service.js"
import { sendPasswordResetEmail } from "../utils/sendPasswordResetEmail.js"
import logger from "../config/logger.js"
import ResetPasswordDao from "../daos/passwordReset.dao.js"
import BusinessDao from "../daos/business.dao.js"

const buyerService = new BuyerDao()
const businessService = new BusinessDao()
const adminService = new AdminDao()
const resetPassService= new ResetPasswordDao()

export const createAndSendPasswordReset = async (email) => {
    logger.info(`PasswordResetService: Attempting to create password reset for email: ${email}`)
    const result = await findUserByEmail(email)
    
    if (!result) {
        logger.warn(`PasswordResetService: User not found with email: ${email}`)
        throw new AppError(404, "User not found")
    }

   const token = uuidv4();
   logger.info(`PasswordResetService: Generated token for email: ${email}`)
   try {
       await resetPassService.createPaswordReset({ email, token });
       logger.info(`PasswordResetService: Password reset record created for email: ${email}`)
   } catch (error) {
       logger.error(`PasswordResetService: Failed to create password reset for email ${email} - ${error.message}`)
       throw new AppError(500, `Failed to create password reset: ${error.message}`);
   }

   try {
       await sendPasswordResetEmail({ email, token });
       logger.info(`PasswordResetService: Password reset email sent to: ${email}`)
   } catch (error) {
       logger.error(`PasswordResetService: Failed to send password reset email to ${email} - ${error.message}`)
       throw new AppError(500, `Failed to send password reset email: ${error.message}`);
   }
}


export const getEmailByToken = async (token) => {
    logger.info(`PasswordResetService: Attempting to get email by token`)
    try {
        const emailByToken = await resetPassService.getByToken({ token });
        if (!emailByToken) {
            logger.warn(`PasswordResetService: Invalid or expired token`)
            throw new AppError(400, "Token invalid or expired");
        }

        if (emailByToken.email !== email) {
            logger.warn(`PasswordResetService: Token invalid for email: ${email}`)
            throw new AppError(400, "Token invalid for this email");
        }
        logger.info(`PasswordResetService: Successfully retrieved email by token`)
        return emailByToken.email;
        
    } catch (error) {
        logger.error(`PasswordResetService: Failed to get email by token - ${error.message}`)
        if (error instanceof AppError) throw error;
        throw new AppError(500, `Failed to get email by token: ${error.message}`);
    }
}

export const updateUserPassword = async (email, newPassword) => {
    logger.info(`PasswordResetService: Attempting to update password for email: ${email}`)
    const hashedPassword = createHash(newPassword)

    try {
        // Intentar actualizar en buyer
        try {
            const buyer = await buyerService.getByEmail(email)
            if (buyer) {
                await buyerService.update(buyer._id, { password: hashedPassword })
                logger.info(`PasswordResetService: Successfully updated password for buyer with email: ${email}`)
                return { success: true, role: 'buyer' }
            }
        } catch (error) {
            // Si no existe, continuar
        }

        // Intentar actualizar en business
        try {
            const business = await businessService.getByEmail(email)
            if (business) {
                await businessService.update(business._id, { password: hashedPassword })
                logger.info(`PasswordResetService: Successfully updated password for business with email: ${email}`)
                return { success: true, role: 'business' }
            }
        } catch (error) {
            // Si no existe, continuar
        }

        // Intentar actualizar en admin
        try {
            const admin = await adminService.getByEmail(email)
            if (admin) {
                await adminService.update(admin._id, { password: hashedPassword })
                logger.info(`PasswordResetService: Successfully updated password for admin with email: ${email}`)
                return { success: true, role: 'admin' }
            }
        } catch (error) {
            // Si no existe, continuar
        }

        await resetPassService.deleteByToken({ token });
        logger.warn(`PasswordResetService: No user found with email: ${email} for password update`)
        throw new AppError(404, "User not found")
        
    } catch (error) {
        logger.error(`PasswordResetService: Failed to update password for email ${email} - ${error.message}`)
        if (error instanceof AppError) throw error
        throw new AppError(500, `Failed to update password: ${error.message}`)
    }
}