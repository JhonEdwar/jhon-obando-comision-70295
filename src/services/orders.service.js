import OrdersDao from "../daos/orders.dao.js"
import {getBuyerByIdService,addOrderToBuyerService }  from "../services/buyer.service.js"
import {getBusinessByIdService} from "../services/business.service.js"
import {getProductByIdService, getProductsByIdsService } from "./product.service.js"
import { sendSms } from "../utils/twilioSms.js"
import AppError from "../utils/appError.js"
import { sendConfirmationEmail } from "../utils/sendConfirmationEmail.js"
import  ProductDao  from "../daos/product.dao.js"
import mongoose from 'mongoose';

const productDao = new ProductDao()
const ordersDao = new OrdersDao()


export const getOrdersService = async () => {
    try {
        const orders = await ordersDao.get()  
            if (!orders) {  
            throw new AppError(404, "No orders found");
        }
        return orders
    } catch (error) {
        console.error("Error in getOrdersService:", error)
        throw error
    }
}

export const getOrdersByIdService = async (id) => {
    try {
        const order = await ordersDao.getById(id)  
        if (!order) {
            throw new AppError(404, "No order found with the given ID");
        }
        return order
    } catch (error) {
        console.error("Error in getOrdersByIdService:", error)
        throw error
    }
}


export const getOrdersByIdBuyerSer = async (idBuyer) => {
    try {
        const order = await ordersDao.getByIdBuyer(idBuyer) 
        if (!order) {
            throw new AppError(404, "No order found for the given buyer ID");
        }
        return order
    } catch (error) {
        console.error("Error in getOrdersByIdBuyer:", error)
        throw error
    }
}


export const getOrdersByIdBusinessSer = async (idBusiness) => {
    try {
        const order = await ordersDao.getByIdBusiness(idBusiness)  
        if (!order) {
            throw new AppError(404, "No order found for the given business ID");
        }
        return order
    } catch (error) {
        console.error("Error in getOrdersByIdBusiness:", error)
        throw error
    }
}

export const orderCreateService= async (idBuyer, idBusiness, products) => {
    try {
        const resultBuyer = await getBuyerByIdService(idBuyer)
        if (!resultBuyer) {
            throw new AppError(404, "No buyer found with the given ID");
        }

        const resultBusiness = await getBusinessByIdService(idBusiness)
        if (!resultBusiness) {
            throw new AppError(404, "No business found with the given ID");
        }

        const productIds = products.map(p => p._id);
        const currentProducts = await getProductsByIdsService(productIds);

        

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
        const session = await mongoose.startSession();
        session.startTransaction();

        try {
            const orderResult = await ordersDao.create(order, { session })

            await Promise.all(products.map(product =>
                productDao.updateProduct(product._id, {
                    $inc: { stock: -product.quantity }
                }, { session })
            ));

            await addOrderToBuyerService(idBuyer, orderResult.id, { session })

            // await sendSms(resultBuyer.phone, `tu orden ${orderResult.id} ha sido creada con valor: $${total}`)
        
            const infoMail = {
                subject: 'Confirmación de Orden',
                message: {title: 'Tu orden ha sido creada con éxito', body: 'Tu orden ha sido creada con éxito. Gracias por comprar con nosotros!'},
                userMail: resultBuyer.email
            }
            await sendConfirmationEmail(infoMail)
            await session.commitTransaction();
            

            return orderResult

        }catch (error) {
            await session.abortTransaction();
            throw error;
        } finally {
            session.endSession();
        }


    } catch (error) {
        if (error instanceof AppError) throw error
        throw new AppError(500, `Failed in order creation: ${error.message}`);
    }
}

export const ordersResolveService= async (id,resolve) => {
    try {
        const order = await ordersDao.getById(id)  
        if (!order) {
            throw new AppError(404, "No order found with the given ID");
        }

        order.status = resolve
        const updatedStatus= await ordersDao.resolve(order._id, order)
            if (!updatedStatus) {   
                throw new AppError(500, "Failed to update order status");
            }

        return updatedStatus
  
    } catch (error) {
        if (error instanceof AppError) throw error
        throw new AppError(500, `Failed to resolve order: ${error.message}`);
    }
}



