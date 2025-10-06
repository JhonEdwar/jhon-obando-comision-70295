import OrdersDao from "../daos/orders.dao.js"
import {getBuyerByIdService,addOrderToBuyerService }  from "../services/buyer.service.js"
import {getBusinessByIdService} from "../services/business.service.js"
import {getProductByIdService, getProductsByIdsService } from "./product.service.js"
import { sendSms } from "../utils/twilioSms.js"
import AppError from "../utils/appError.js"
import { sendConfirmationEmail } from "../utils/sendConfirmationEmail.js"
import  ProductDao  from "../daos/product.dao.js"
import mongoose from 'mongoose';
import logger from "../config/logger.js"

const productDao = new ProductDao()
const ordersDao = new OrdersDao()


export const getOrdersService = async () => {
    logger.info('OrdersService: Attempting to fetch all orders')
    try {
        const orders = await ordersDao.get()  
        if (!orders) {  
            logger.warn('OrdersService: No orders found')
            throw new AppError(404, 'No orders found');
        }
        logger.info(`OrdersService: Successfully fetched ${orders.length} orders`)
        return orders
    } catch (error) {
        logger.error(`OrdersService: Failed to fetch orders - ${error.message}`)
        throw error
    }
}

export const getOrdersByIdService = async (id) => {
    logger.info(`OrdersService: Attempting to fetch order by ID: ${id}`)
    try {
        const order = await ordersDao.getById(id)  
        if (!order) {
            logger.warn(`OrdersService: No order found with ID: ${id}`)
            throw new AppError(404, "No order found with the given ID");
        }
        logger.info(`OrdersService: Successfully fetched order with ID: ${id}`)
        return order
    } catch (error) {
        logger.error(`OrdersService: Failed to fetch order by ID ${id} - ${error.message}`)
        throw error
    }
}


export const getOrdersByIdBuyerSer = async (idBuyer) => {
    logger.info(`OrdersService: Attempting to fetch orders by buyer ID: ${idBuyer}`)
    try {
        const order = await ordersDao.getByIdBuyer(idBuyer) 
        if (!order) {
            logger.warn(`OrdersService: No orders found for buyer ID: ${idBuyer}`)
            throw new AppError(404, "No order found for the given buyer ID");
        }
        logger.info(`OrdersService: Successfully fetched orders for buyer ID: ${idBuyer}`)
        return order
    } catch (error) {
        logger.error(`OrdersService: Failed to fetch orders by buyer ID ${idBuyer} - ${error.message}`)
        throw error
    }
}


export const getOrdersByIdBusinessSer = async (idBusiness) => {
    logger.info(`OrdersService: Attempting to fetch orders by business ID: ${idBusiness}`)
    try {
        const order = await ordersDao.getByIdBusiness(idBusiness)  
        if (!order) {
            logger.warn(`OrdersService: No orders found for business ID: ${idBusiness}`)
            throw new AppError(404, "No order found for the given business ID");
        }
        logger.info(`OrdersService: Successfully fetched orders for business ID: ${idBusiness}`)
        return order
    } catch (error) {
        logger.error(`OrdersService: Failed to fetch orders by business ID ${idBusiness} - ${error.message}`)
        throw error
    }
}

export const orderCreateService= async (idBuyer, idBusiness, products) => {
    logger.info(`OrdersService: Attempting to create order for buyer ID: ${idBuyer}, business ID: ${idBusiness}`)
    try {
        const resultBuyer = await getBuyerByIdService(idBuyer)
        if (!resultBuyer) {
            logger.warn(`OrdersService: No buyer found with ID: ${idBuyer}`)
            throw new AppError(404, "No buyer found with the given ID");
        }

        const resultBusiness = await getBusinessByIdService(idBusiness)
        if (!resultBusiness) {
            logger.warn(`OrdersService: No business found with ID: ${idBusiness}`)
            throw new AppError(404, "No business found with the given ID");
        }

        const productIds = products.map(p => p._id);
        const currentProducts = await getProductsByIdsService(productIds);
        const productMap = new Map(currentProducts.map(p => [p._id.toString(), p]));

        

        let total = 0

        for (const product of products) {
            if (!product._id || !product.quantity || product.quantity <= 0) {
                throw new AppError(400, "Product ID and quantity are required");
            }
            const currentProduct = productMap.get(product._id.toString());

            if (!currentProduct) {
                throw new AppError(404, `Product with ID ${product._id} not found`);
            }
            if (currentProduct.stock < product.quantity) {
                throw new AppError(400, `Insufficient stock for product ID ${product._id}`);
            }

            total += currentProduct.price * product.quantity;
        }

        const orderProducts = products.map(p => ({
            product: p._id,
            quantity: p.quantity
        }));


        const order = {
            business: idBusiness,
            buyer: idBuyer,
            status: "pending",
            totalPrice: total,
            products: orderProducts,
        }

        // transacción para crear la orden y actualizar el stock de los productos
        logger.info('OrdersService: Starting transaction for order creation')
        const session = await mongoose.startSession();
        session.startTransaction();

        try {
            const orderResult = await ordersDao.create(order, { session })
            logger.info(`OrdersService: Order created with ID: ${orderResult._id}`)

            await Promise.all(products.map(product =>
                productDao.updateProduct(product._id, {
                    $inc: { stock: -product.quantity }
                }, { session })
            ));
            logger.info('OrdersService: Product stock updated')

            await addOrderToBuyerService(idBuyer, orderResult.id, { session })
            logger.info('OrdersService: Order added to buyer')

            // await sendSms(resultBuyer.phone, `tu orden ${orderResult.id} ha sido creada con valor: $${total}`)
        
            const infoMail = {
                subject: 'Confirmación de Orden',
                message: {title: 'Tu orden ha sido creada con éxito', body: 'Tu orden ha sido creada con éxito. Gracias por comprar con nosotros!'},
                userMail: resultBuyer.email
            }
            await sendConfirmationEmail(infoMail)
            logger.info('OrdersService: Confirmation email sent')
            await session.commitTransaction();
            logger.info('OrdersService: Transaction committed successfully')
            
            return orderResult

        }catch (error) {
            logger.error(`OrdersService: Transaction failed, rolling back - ${error.message}`)
            await session.abortTransaction();
            throw error;
        } finally {
            await session.endSession();
        }


    } catch (error) {
        logger.error(`OrdersService: Failed to create order - ${error.message}`)
        if (error instanceof AppError) throw error
        throw new AppError(500, `Failed in order creation: ${error.message}`);
    }
}

export const ordersResolveService= async (id,resolve) => {
    logger.info(`OrdersService: Attempting to resolve order with ID: ${id}, status: ${resolve}`)
    try {
        const order = await ordersDao.getById(id)  
        if (!order) {
            logger.warn(`OrdersService: No order found with ID: ${id} for resolution`)
            throw new AppError(404, "No order found with the given ID");
        }

        order.status = resolve
        const updatedStatus= await ordersDao.resolve(order._id, order)
        if (!updatedStatus) {   
            logger.error(`OrdersService: Failed to update order status for ID: ${id}`)
            throw new AppError(500, "Failed to update order status");
        }
        logger.info(`OrdersService: Successfully resolved order with ID: ${id}, status: ${resolve}`)
        return updatedStatus
    } catch (error) {
        logger.error(`OrdersService: Failed to resolve order with ID ${id} - ${error.message}`)
        if (error instanceof AppError) throw error
        throw new AppError(500, `Failed to resolve order: ${error.message}`);
    }
}



