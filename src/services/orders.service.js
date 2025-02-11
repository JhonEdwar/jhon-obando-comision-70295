import OrdersDao from "../daos/orders.dao.js"
import {getBuyerByIdService}  from "../services/buyer.service.js"
import {getBusinessByIdService} from "../services/business.service.js"

const ordersService = new OrdersDao()


export const getOrdersService = async () => {
    try {
        const result = await ordersService.get()
        const orders = result.map(order => order)
        return orders
    } catch (error) {
        console.error("Error in getOrdersService:", error)
        throw new Error("Failed to get orders")
    }
}

export const getOrdersByIdService = async (id) => {
    try {
        const order = await ordersService.getById(id)  
        return order
    } catch (error) {
        console.error("Error in getOrdersByIdService:", error)
        throw new Error("Failed to get order by ID")
    }
}


export const getOrdersByIdBuyerSer = async (idBuyer) => {
    try {
        const order = await ordersService.getByIdBuyer(idBuyer)  
        return order
    } catch (error) {
        console.error("Error in getOrdersByIdBuyer:", error)
        throw new Error("Failed to get oirder by buyer")
    }
}


export const getOrdersByIdBusinessSer = async (idBusiness) => {
    try {
        const order = await ordersService.getByIdBusiness(idBusiness)  
        return order
    } catch (error) {
        console.error("Error in getOrdersByIdBusiness:", error)
        throw new Error("Failed to get order by business")
    }
}

export const orderCreateService= async (idBuyer, idBusiness, idsProducts, quantities) => {
    try {
        const resultBuyer = await getBuyerByIdService(idBuyer)
        if (!resultBuyer) {
            return res.sendNotFound("Buyer not found")
        }

        const resultBusiness = await getBusinessByIdService(idBusiness)
        if (!resultBusiness) {
            return res.sendNotFound("Business not found")
        }

        const actualOrders = resultBusiness.products.filter(product => idsProducts.includes(product.id))
        if (idsProducts.length !== actualOrders.length) {
            return res.sendBadRequest("Not all products are available")
        }



        for (let i = 0; i < actualOrders.length; i++) {
            const product = actualOrders[i]
            const quantity = quantities[i]
            if (product.stock < quantity) {
                return res.sendBadRequest(`Insufficient stock for product ${product.title}`)
            }
        }

        const total = actualOrders.reduce((acc, product, index) => acc + product.price * quantities[index], 0)

        const order = {
            business: resultBusiness,
            buyer: resultBuyer,
            status: "pending",
            products: actualOrders.map((product, index) => ({
                ...product,
                quantity: quantities[index]
            })),
            totalPrice: total
        }


        const orderRsult = await ordersService.create(order)
        
        resultBuyer.orders.push(orderResult._id)
        await buyerService.update(idBuyer, resultBuyer)


        return orderRsult 


    } catch (error) {
        console.error("Error in getOrdersCreate:", error)
        throw new Error("Failed to create business")
    }
}

export const ordersResolveService= async (id,resolve) => {
    try {
        const order = await ordersService.getById(id)  
        order.status = resolve
        const updatedStatus= await ordersService.resolve(order._id, order)
        return updatedStatus
  
    } catch (error) {
        console.error("Error in getOrdersResolve:", error)
        throw new Error("Failed to resolver order")
    }
}



