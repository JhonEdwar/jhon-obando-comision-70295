import {getOrdersService,
    getOrdersByIdService, 
    getOrdersByIdBuyerSer,
    getOrdersByIdBusinessSer,
    orderCreateService,
    ordersResolveService
} from '../services/orders.service.js'
import AppError from "../utils/appError.js"
import { asyncHandler } from "../utils/asyncHandler.js"
import logger from "../config/logger.js"


export const getOrders = asyncHandler(async (req, res) => {
    logger.info('OrdersController: Attempting to fetch all orders')
    const result = await getOrdersService()
    logger.info(`OrdersController: Successfully fetched ${result.length} orders`)
    res.sendSuccess(result);
});


export const getOrdersById = asyncHandler(async (req, res) => {
    const { id } = req.params
    logger.info(`OrdersController: Attempting to fetch order by ID: ${id}`)
    const result = await getOrdersByIdService(id)
    logger.info(`OrdersController: Successfully fetched order with ID: ${id}`)
    res.sendSuccess(result);
});

export const getOrdersByIdBuyer = asyncHandler(async (req, res) => {
    const { idBuyer } = req.params
    logger.info(`OrdersController: Attempting to fetch orders by buyer ID: ${idBuyer}`)
    const result = await getOrdersByIdBuyerSer(idBuyer)
    logger.info(`OrdersController: Successfully fetched orders for buyer ID: ${idBuyer}`)
    res.sendSuccess(result);
});


export const getOrdersByIdBusiness = asyncHandler(async (req, res) => {
    const {idBusiness}=req.params
    logger.info(`OrdersController: Attempting to fetch orders by business ID: ${idBusiness}`)
    const result = await getOrdersByIdBusinessSer(idBusiness)
    logger.info(`OrdersController: Successfully fetched orders for business ID: ${idBusiness}`)
    res.sendSuccess(result);
});


export const orderCreate = asyncHandler(async (req, res) => {
    const { idBuyer, idBusiness, products} = req.body
    logger.info(`OrdersController: Attempting to create order for buyer ID: ${idBuyer}, business ID: ${idBusiness}`)
    if (!idBuyer || !idBusiness || !products || !Array.isArray(products) || products.length === 0) {
        logger.warn('OrdersController: Missing or invalid required fields for order creation')
        throw new AppError(400, "Missing or invalid required fields");
    }

    const orderResult = await orderCreateService(idBuyer, idBusiness, products)
    if (!orderResult) {
        logger.error('OrdersController: Order creation failed')
        throw new AppError(400, "Order creation failed");
    }
    logger.info(`OrdersController: Successfully created order with ID: ${orderResult._id}`)
    res.sendSuccess({ message: "Order create successfully", order: orderResult });
});

export const ordersResolve = asyncHandler(async (req, res) => {
    const { id } = req.params
    const { resolve } = req.body
    logger.info(`OrdersController: Attempting to resolve order with ID: ${id}, status: ${resolve}`)

    if (!id || !resolve) {
        logger.warn('OrdersController: Missing required parameters for order resolution')
        throw new AppError(400, "Required parameters are missing");
    }
    if (resolve !== "confirmed" && resolve !== "pending" && resolve !== "cancelled") {
        logger.warn(`OrdersController: Invalid status value: ${resolve}`)
        throw new AppError(400, "Invalid status value");
    }

    const statusOrder=await ordersResolveService(id,resolve)
    if (!statusOrder) {
        logger.error(`OrdersController: Order update failed for ID: ${id}`)
        throw new AppError(400, "Order update failed");
    }
    logger.info(`OrdersController: Successfully resolved order with ID: ${id}, status: ${resolve}`)
    res.sendSuccess({ message: "Edit status create successfully", status: statusOrder });
});

