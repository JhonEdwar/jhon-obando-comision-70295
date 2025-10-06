import ordersModel from "../models/orders.model.js";
import AppError from "../utils/appError.js"
import logger from "../config/logger.js"

export default class OrdersDao{
    constructor() {}
    get=async()=>{
        logger.info('OrdersDao: Attempting to fetch all orders')
        try {
            const result=await ordersModel.find()
            logger.info(`OrdersDao: Successfully fetched ${result.length} orders`)
            return result    
        } catch (error) {
            logger.error(`OrdersDao: Failed to fetch orders - ${error.message}`)
            throw new AppError(500, `Failed to fetch orders: ${error.message}`)
        }
    }

    getById = async (id) => {
        logger.info(`OrdersDao: Attempting to fetch order by ID: ${id}`)
        try {
            const result = await ordersModel.findOne({ _id: id })
            if (!result) {  
                logger.warn(`OrdersDao: Order not found with ID: ${id}`)
                throw new AppError(404, "Order not found")
            }
            logger.info(`OrdersDao: Successfully fetched order with ID: ${id}`)
            return result
        } catch (error) {
            if (error instanceof AppError) throw error
            logger.error(`OrdersDao: Failed to fetch order by ID ${id} - ${error.message}`)
            throw new AppError(500, `Failed to fetch order by ID: ${error.message}`)
        }
    }

    getByIdBuyer = async (idBuyer) => {
        logger.info(`OrdersDao: Attempting to fetch orders by buyer ID: ${idBuyer}`)
        try {
            const result = await ordersModel.find({ buyer: idBuyer })   
            if (!result) {
                logger.warn(`OrdersDao: No orders found for buyer ID: ${idBuyer}`)
                throw new AppError(404, "No orders found for the given buyer ID")
            }
            logger.info(`OrdersDao: Successfully fetched ${result.length} orders for buyer ID: ${idBuyer}`)
            return result
        } catch (error) {
            if (error instanceof AppError) throw error
            logger.error(`OrdersDao: Failed to fetch orders by buyer ID ${idBuyer} - ${error.message}`)
            throw new AppError(500, `Failed to fetch order by buyer ID: ${error.message}`)
        }
    }

    getByIdBusiness = async (idBusiness) => {
        logger.info(`OrdersDao: Attempting to fetch orders by business ID: ${idBusiness}`)
        try {
            const result = await ordersModel.findOne({ business: idBusiness })
            if (!result) {
                logger.warn(`OrdersDao: No orders found for business ID: ${idBusiness}`)
                throw new AppError(404, "No order found for the given business ID")
            }
            logger.info(`OrdersDao: Successfully fetched orders for business ID: ${idBusiness}`)
            return result
        } catch (error) {
            if (error instanceof AppError) throw error
            logger.error(`OrdersDao: Failed to fetch orders by business ID ${idBusiness} - ${error.message}`)
            throw new AppError(500, `Failed to fetch order by business ID: ${error.message}`)
        }
    }

    create = async (order,options = {}) => {
        logger.info(`OrdersDao: Attempting to create order for buyer: ${order.buyer}`)
        try {
            const result = await ordersModel.create([order], options)
            logger.info(`OrdersDao: Successfully created order with ID: ${result[0]._id}`)
            return result[0]
        } catch (error) {
            if (error.code === 11000) {
                logger.warn(`OrdersDao: Order already exists with ID: ${order._id}`)
                throw new AppError(409, "Order already exists with this ID")
            }
            logger.error(`OrdersDao: Failed to create order - ${error.message}`)
            throw new AppError(500, `Failed to create order: ${error.message}`)
        }
    }

    resolve = async (id, order) => {
        logger.info(`OrdersDao: Attempting to resolve order with ID: ${id}`)
        try {
            const result = await ordersModel.updateOne({ _id: id }, { $set: order })
            if (result.modifiedCount === 0) {
                logger.warn(`OrdersDao: No order found with ID: ${id} for resolution`)
                throw new AppError(404, "No order found with the given ID")
            }
            logger.info(`OrdersDao: Successfully resolved order with ID: ${id}`)
            return result
        } catch (error) {
            if (error instanceof AppError) throw error
            logger.error(`OrdersDao: Failed to resolve order with ID ${id} - ${error.message}`)
            throw new AppError(500, `Failed to resolve order: ${error.message}`)
        }
    }


}