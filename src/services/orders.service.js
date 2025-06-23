import OrdersDao from "../daos/orders.dao.js"
import {getBuyerByIdService}  from "../services/buyer.service.js"
import {getBusinessByIdService} from "../services/business.service.js"
import {productService} from "./product.service.js"

const ordersDao = new OrdersDao()


export const getOrdersService = async () => {
    try {
        const orders = await ordersDao.get()
        // const orders = result.map(order => order)
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
            if (!product._id || !product.quantity) {
                throw new Error("Product ID and quantity are required")
            }
            const currentProduct = await productService.getProductById(product._id) 
            total += currentProduct.price * product.quantity  
        }

        const orderProducts = products.map(p => ({
            product: p._id,
            quantity: p.quantity
        }));


        const order = {
            business: resultBusiness,
            buyer: resultBuyer,
            status: "pending",
            totalPrice: total,
            products: orderProducts,
        }


        const orderResult = await ordersDao.create(order)

        resultBuyer.orders.push(orderResult._id)
        await buyerService.update(idBuyer, resultBuyer)


        return orderResult


    } catch (error) {
        console.error("Error in getOrdersCreate:", error)
        throw new Error("Failed to create order")
    }
}

export const ordersResolveService= async (id,resolve) => {
    try {
        const order = await ordersDao.getById(id)  
        order.status = resolve
        const updatedStatus= await ordersDao.resolve(order._id, order)
        return updatedStatus
  
    } catch (error) {
        console.error("Error in getOrdersResolve:", error)
        throw new Error("Failed to resolver order")
    }
}



