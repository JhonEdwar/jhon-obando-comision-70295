import {getOrdersService,
    getOrdersByIdService, 
    getOrdersByIdBuyerSer,
    getOrdersByIdBusinessSer,
    orderCreateService,
    ordersResolveService
} from '../services/orders.service.js'
import AppError from "../utils/appError.js"


export const getOrders = async (req, res) => {
        const result = await getOrdersService()
        res.sendSuccess(result);
}


export const getOrdersById = async (req, res) => {
    const { id } = req.params
        const result = await getOrdersByIdService(id)
        res.sendSuccess(result);
}

export const getOrdersByIdBuyer = async (req, res) => {
    const { idBuyer } = req.params
        const result = await getOrdersByIdBuyerSer(idBuyer)
        res.sendSuccess(result);
}


export const getOrdersByIdBusiness = async (req, res) => {
    const {idBusiness}=req.params
    const result = await getOrdersByIdBusinessSer(idBusiness)
    res.sendSuccess(result);
}


export const orderCreate = async (req, res) => {
    const { idBuyer, idBusiness, products} = req.body
        if (!idBuyer || !idBusiness || !products || !Array.isArray(products) || products.length === 0) {
            throw new AppError(400, "Missing or invalid required fields");
        }

        const orderResult = await orderCreateService(idBuyer, idBusiness, products)
        if (!orderResult) {
            throw new AppError(400, "Order creation failed");
        }

        res.sendSuccess({ message: "Order create successfully", order: orderResult });

}

export const ordersResolve = async (req, res) => {
    const { id } = req.params
    const { resolve } = req.body

    if (!id || !resolve) throw new AppError(400, "Required parameters are missing");
    if (resolve !== "confirmed" && resolve !== "pending" && resolve !== "cancelled") {
        throw new AppError(400, "Invalid status value");
    }

  
        const statusOrder=await ordersResolveService(id,resolve)
        if (!statusOrder) {
            throw new AppError(400, "Order update failed");
        }
        res.sendSuccess({ message: "Edit status create successfully", status: statusOrder });

}

