import ordersModel from "../models/orders.model.js";
import AppError from "../utils/appError.js"

export default class OrdersDao{
    constructor() {}
    get=async()=>{
        try {
            const result=await ordersModel.find()
            return result    
        } catch (error) {
            throw new AppError(500, `Failed to fetch orders: ${error.message}`)
        }
    }

    getById = async (id) => {
        try {
            const result = await ordersModel.findOne({ _id: id })
                if (!result) {  
                throw new AppError(404, "Order not found")
            }
            return result
        } catch (error) {
            if (error instanceof AppError) throw error
            throw new AppError(500, `Failed to fetch order by ID: ${error.message}`)
        }
    }

    getByIdBuyer = async (idBuyer) => {
        try {
            const result = await ordersModel.find({ buyer: idBuyer })   
            if (!result) {
                throw new AppError(404, "No orders found for the given buyer ID")
            }
            return result
        } catch (error) {
            if (error instanceof AppError) throw error
            throw new AppError(500, `Failed to fetch order by buyer ID: ${error.message}`)
        }
    }

    getByIdBusiness = async (idBusiness) => {
        try {
            const result = await ordersModel.findOne({ business: idBusiness })
            if (!result) {
                throw new AppError(404, "No order found for the given business ID")
            }
            return result
        } catch (error) {
            if (error instanceof AppError) throw error
            throw new AppError(500, `Failed to fetch order by business ID: ${error.message}`)
        }
    }

    create = async (order,options = {}) => {
        try {
            const result = await ordersModel.create([order], options)
            return result[0]

        } catch (error) {
            if (error.code === 11000) {
                  throw new AppError(409, "Order already exists with this ID")
            }
            throw new AppError(500, `Failed to create order: ${error.message}`)
        }
    }

    resolve = async (id, order) => {
        try {
            const result = await ordersModel.updateOne({ _id: id }, { $set: order })
            if (result.modifiedCount === 0) {
                throw new AppError(404, "No order found with the given ID")
            }
            return result
        } catch (error) {
            if (error instanceof AppError) throw error
            throw new AppError(500, `Failed to resolve order: ${error.message}`)
        }
    }


}s