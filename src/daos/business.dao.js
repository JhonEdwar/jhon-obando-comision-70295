import businessModel from "../models/business.model.js"
import AppError from "../utils/appError.js"

export default class BusinessDao {

    constructor(){

    }

    get = async () => {

        try {

            const result = await businessModel.find()   
            return result

        } catch (error) {
            throw new AppError(500, `Failed to fetch businesses: ${error.message}`)

        }
    }

    getById = async (id) => {

        try {

            const result = await businessModel.findOne({ _id: id })
            if (!result) {
                throw new AppError(404, "Business not found")
            }
            return result

        } catch (error) {   
            if (error instanceof AppError) throw error;
            throw new AppError(500, `Failed to fetch business by ID: ${error.message}`)

        }
    }

    getByEmail = async (email) => {

        try {

            const result = await businessModel.findOne({ email })
            if (!result) {
                throw new AppError(404, "Business not found")
            }
            return result

        } catch (error) {
            if (error instanceof AppError) throw error;

            throw new AppError(500, `Failed to fetch business by email: ${error.message}`)

        }
    }

    update = async (id, updateData) => {
        try {
            const result = await businessModel.findByIdAndUpdate(id, updateData, { new: true });
            if (!result) {
                throw new AppError(404, "Business not found");
            }
            return result;
        } catch (error) {
           if (error instanceof AppError) throw error;
           throw new AppError(500, `Failed to update business: ${error.message}`);
        }
    }

    save = async (business) => {
        try {

            const result = await businessModel.create(business)
            return result

        } catch (error) {
            if (error.code === 11000) {
                throw new AppError(409, "Business already exists with this email");
                }

            throw new AppError(500, `Failed to save business: ${error.message}`);

        }
    }

}   