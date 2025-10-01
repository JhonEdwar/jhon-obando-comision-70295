import {getOrdersService,
    getOrdersByIdService, 
    getOrdersByIdBuyerSer,
    getOrdersByIdBusinessSer,
    orderCreateService,
    ordersResolveService
} from '../services/orders.service.js'


export const getOrders = async (req, res) => {
    try {
        const result = await getOrdersService()
        res.sendSuccess(result);
    } catch (error) {
        res.sendServerError(error);
    }
}


export const getOrdersById = async (req, res) => {
    const { id } = req.params
    try {
        const result = await getOrdersByIdService(id)
        res.sendSuccess(result);
    } catch (error) {
        res.sendServerError(error);
    }
}

export const getOrdersByIdBuyer = async (req, res) => {
    const { idBuyer } = req.params
    try {
        const result = await getOrdersByIdBuyerSer(idBuyer)
        res.sendSuccess(result);
    } catch (error) {
        res.sendServerError(error);
    }
}


export const getOrdersByIdBusiness = async (req, res) => {
    const {idBusiness}=req.params
    try {
        const result = await getOrdersByIdBusinessSer(idBusiness)
        res.sendSuccess(result);
    } catch (error) {
        res.sendServerError(error);
    }
}


export const orderCreate = async (req, res) => {
    const { idBuyer, idBusiness, products} = req.body
    try {
        if (!idBuyer || !idBusiness || !products || !Array.isArray(products) || products.length === 0) {
            return res.sendBadRequest("Required parameters are missing");
        }

        const orderResult = await orderCreateService(idBuyer, idBusiness, products)
        if (!orderResult) {
            return res.sendBadRequest("Order creation failed");
        }

        res.sendSuccess({ message: "Order create successfully", order: orderResult });

    } catch (error) {
        res.sendServerError(error);
    }
}

export const ordersResolve = async (req, res) => {
    const { id } = req.params
    const { resolve } = req.body

    if (!id || !resolve) return res.sendBadRequest("Required parameters are missing");
    if (resolve !== "confirmed" && resolve !== "pending" && resolve !== "cancelled") {
        return res.sendBadRequest("Invalid 'resolve' parameter");
    }

    try {
        const statusOrder=await ordersResolveService(id,resolve)
        if (!statusOrder) {
            return res.sendServerError("Order update failed");
        }
        res.sendSuccess({ message: "Edit status create successfully", status: statusOrder });
    } catch (error) {
        res.sendServerError(error);
    }
}

