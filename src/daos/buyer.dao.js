import buyerModel from "../models/buyer.model.js";
import AppError from "../utils/appError.js"

export default class BuyerDao{
    constructor() {}

    get = async () => {
        try {
            const buyers = await buyerModel.find()
            return buyers
        } catch (error) {
            throw new AppError(500, `Failed to fetch buyers: ${error.message}`)
        }
    }

    getById = async (id) => {
        try {
            const buyer = await buyerModel.findOne({ _id: id }) 
            if (!buyer) {
                throw new AppError(404, "Buyer not found")
            }
            return buyer
        } catch (error) {
            if (error instanceof AppError) throw error
            throw new AppError(500, `Failed to fetch buyer by ID: ${error.message}`)
        }
    }
    
    getByEmail = async (email) => {
        try {
            const buyer = await buyerModel.findOne({ email })
            if (!buyer) {
                throw new AppError(404, "Buyer not found")
            }
            return buyer
        } catch (error) {
            if (error instanceof AppError) throw error
            throw new AppError(500, `Failed to fetch buyer by email: ${error.message}`)
        }
    }

    updateOrders = async (id, updateBuyer) => {
        try {
            const result = await buyerModel.updateOne({ _id: id },{$push: { orders: updateBuyer }})
            if (result.modifiedCount === 0) {
                throw new AppError(404, "No buyer found with the given ID");
            }
            return result
        } catch (error) {
            if (error instanceof AppError) throw error;
            throw new AppError(500, `Failed to update buyer orders: ${error.message}`)
        }
    }

    update = async (id, updateBuyer) => {
        try {
            const result = await buyerModel.updateOne({ _id: id }, updateBuyer)
            if (result.modifiedCount === 0) {
                throw new AppError(404, "No buyer found with the given ID")
            }
            return result
        } catch (error) {
            if (error instanceof AppError) throw error;
           throw new AppError(500, `Failed to update buyer: ${error.message}`)
        }
    }

    save = async (buyer) => {
        try {
            const result = await buyerModel.create(buyer)
            return result
        } catch (error) {
            if (error.code === 11000) {
                throw new AppError(409, "Buyer already exists with this email");
                }
            throw new AppError(500, `Failed to save buyer: ${error.message}`);
        }
    }
}