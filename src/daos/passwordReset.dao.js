import passwordResetModel from "../models/passwordReset.model.js"
import AppError from "../utils/appError.js"

export default class ResetPasswordDao {

    constructor() {

    }

    createPaswordReset = async (email, token) => {
        try {
            const result = await passwordResetModel.create({ email, token })
            return result
        } catch (error) {
            throw new AppError(500, `Failed to create password reset: ${error.message}`)
        }
    }
    getByToken = async (token) => {
        try {
            const result = await passwordResetModel.findOne({ token })
            return result
        } catch (error) {
            throw new AppError(500, `Failed to get password reset by token: ${error.message}`)
        }
    }

    deleteByToken = async (token) => {
        try {
            const result = await passwordResetModel.deleteOne({ token })
            return result
        } catch (error) {
            throw new AppError(500, `Failed to delete password reset by token: ${error.message}`)
        }
    }
}
