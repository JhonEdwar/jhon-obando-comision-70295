import OrdersDao from "../daos/orders.dao.js"
import {getBuyerByIdService,addOrderToBuyerService }  from "../services/buyer.service.js"
import {getBusinessByIdService} from "../services/business.service.js"
import {getProductByIdService} from "./product.service.js"
import { sendSms } from "../utils/twilioSms.js"


const ordersDao = new OrdersDao()


export const getOrdersService = async () => {
    try {
        const orders = await ordersDao.get()  
        return orders
    } catch (error) {
        console.error("Error in getOrdersService:", error)
        throw new Error("Failed to get orders")
    }
}

export const getOrdersByIdService = async (id) => {
    try {
        const order = await ordersDao.getById(id)  
        return order
    } catch (error) {
        console.error("Error in getOrdersByIdService:", error)
        throw new Error("Failed to get order by ID")
    }
}


export const getOrdersByIdBuyerSer = async (idBuyer) => {
    try {
        const order = await ordersDao.getByIdBuyer(idBuyer)  
        return order
    } catch (error) {
        console.error("Error in getOrdersByIdBuyer:", error)
        throw new Error("Failed to get oirder by buyer")
    }
}


export const getOrdersByIdBusinessSer = async (idBusiness) => {
    try {
        const order = await ordersDao.getByIdBusiness(idBusiness)  
        return order
    } catch (error) {
        console.error("Error in getOrdersByIdBusiness:", error)
        throw new Error("Failed to get order by business")
    }
}

export const orderCreateService= async (idBuyer, idBusiness, products) => {
    try {
        const resultBuyer = await getBuyerByIdService(idBuyer)
        if (!resultBuyer) {
            throw new Error("Buyer not found")
        }

        const resultBusiness = await getBusinessByIdService(idBusiness)
        if (!resultBusiness) {
            throw new Error("Business not found")
        }

        let total = 0

        for (const product of products) {
            if (!product._id || !product.quantity || product.quantity <= 0) {
                throw new Error("Product ID and quantity are required")
            }
            const currentProduct = await getProductByIdService(product._id) 
             if (!currentProduct) {
                throw new Error(`Product with ID ${product._id} not found`)
            }
            total += currentProduct.price * product.quantity  
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


        const orderResult = await ordersDao.create(order)

        await addOrderToBuyerService(idBuyer, orderResult.id)

        // await sendSms(resultBuyer.phone, `tu orden ${orderResult.id} ha sido creada con valor: $${total}`)


        return orderResult


    } catch (error) {
        console.error("Error in getOrdersCreate:", error)
        throw new Error("Failed to create order")
    }
}

export const ordersResolveService= async (id,resolve) => {
    try {
        const order = await ordersDao.getById(id)  
             if (!order) {
            throw new Error("Order not found")
        }

        order.status = resolve
        const updatedStatus= await ordersDao.resolve(order._id, order)
        return updatedStatus
  
    } catch (error) {
        console.error("Error in getOrdersResolve:", error)
        throw new Error("Failed to resolver order")
    }
}



