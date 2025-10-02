import userModel from "../models/admin.model.js"
import AppError from "../utils/appError.js"


export default class AdminDao{
    constructor() {}

    save= async (user) => {
        try {
            const result = await userModel.create(user)
            return result
        } catch (error) {
            if (error.code === 11000) {
                  throw new AppError(409, "Admin already exists with this email")
            }       
            throw new AppError(500, `Failed to create admin: ${error.message}`)
        }
    }

    getByEmail = async (email) => {
        try {
            const admin = await userModel.findOne({ email })
            if (!admin) {
                throw new AppError(404, "Admin not found")
            }
            return admin
        } catch (error) {
            if (error instanceof AppError) throw error

            throw new AppError(500, `Failed to fetch admin by email: ${error.message}`)
        }
    }


}