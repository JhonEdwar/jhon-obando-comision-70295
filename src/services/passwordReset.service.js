import { createHash } from "../utils/hashingUtils.js"
import AppError from "../utils/appError.js"
import BuyerDao from "../daos/buyer.dao.js"
import businessDao from "../daos/business.dao.js"
import adminDao from "../daos/admin.dao.js"
import { v4 as uuidv4 } from 'uuid';
import { findUserByEmail } from "./auth.service.js"
import { createPaswordReset, deleteByToken } from "../daos/passwordReset.dao.js"
import { sendPasswordResetEmail } from "../utils/sendPasswordResetEmail.js"

const buyerService = new BuyerDao()
const businessService = new businessDao()
const adminService = new adminDao()

export const createAndSendPasswordReset = async (email) => {
        const result = await findUserByEmail(email)
        
        if (!result) {
            throw new AppError(404, "User not found")
        }

       const token = uuidv4();
    try {
        await createPaswordReset({ email, token });
    } catch (error) {
        throw new AppError(500, `Failed to create password reset: ${error.message}`);
    }

    try {
        await sendPasswordResetEmail({ email, token });
    } catch (error) {
       throw new AppError(500, `Failed to send password reset email: ${error.message}`);
    }
}


export const getEmailByToken = async (token) => {
    try {
        const emailByToken = await getByToken({ token });
        if (!emailByToken) {
            throw new AppError(400, "Token inválido o expirado");
        }

        if (emailByToken.email !== email) {
            throw new AppError(400, "Token inválido para este correo electrónico");
        }
        return emailByToken.email;
        
    } catch (error) {
        if (error instanceof AppError) throw error;
        throw new AppError(500, `Error al obtener el token de restablecimiento: ${error.message}`);
    }
}

export const updateUserPassword = async (email, newPassword) => {
    const hashedPassword = createHash(newPassword)

    try {
        // Intentar actualizar en buyer
        try {
            const buyer = await buyerService.getByEmail(email)
            if (buyer) {
                await buyerService.update(buyer._id, { password: hashedPassword })
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
                return { success: true, role: 'admin' }
            }
        } catch (error) {
            // Si no existe, lanzar error
        }
        await deleteByToken({ token });

        throw new AppError(404, "User not found")
    } catch (error) {
        if (error instanceof AppError) throw error
        throw new AppError(500, `Failed to update password: ${error.message}`)
    }
}