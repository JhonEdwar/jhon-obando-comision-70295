import {getOrdersService,getOrdersByIdService, getOrdersByIdBuyerSer,getOrdersByIdBusinessSer,orderCreateService,ordersResolveService} from '../services/orders.service.js'


export const getOrders = async (req, res) => {
    try {
        const result = await getOrdersService()
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
}


export const getOrdersById = async (req, res) => {
    const { id } = req.params
    try {
        const result = await getOrdersByIdService(id)
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
}

export const getOrdersByIdBuyer = async (req, res) => {
    const { idBuyer } = req.params
    try {
        const result = await getOrdersByIdBuyerSer(idBuyer)
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
}


export const getOrdersByIdBusiness = async (req, res) => {
    const {idBusiness}=req.params
    try {
        const result = await getOrdersByIdBusinessSer(idBusiness)
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
}


export const orderCreate = async (req, res) => {
    const { idBuyer, idBusiness, idsProducts, quantities } = req.body
    try {
        if (!idBuyer || !idBusiness || !idsProducts || !quantities) {
            return res.sendBadRequest("Required parameters are missing")
        }
        if (idsProducts.length !== quantities.length) {
            return res.sendBadRequest("Products and quantities arrays must have the same length")
        }

        const orderResult = await orderCreateService(idBuyer, idBusiness, idsProducts, quantities)
        if (!orderResult) {
            return res.sendServerError("Order creation failed")
        }
       
        res.status(201).json({ message: "Order create successfully", order: orderResult});

    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
}

export const ordersResolve = async (req, res) => {
    const { id } = req.params
    const { resolve } = req.body

    if (!id || !resolve) return res.sendBadRequest("Required parameters are missing")
        if (resolve !== "confirmed" && resolve !== "pending" && resolve !== "cancelled") {
            return res.sendBadRequest("Invalid 'resolve' parameter")
        }

    try {
        const statusOrder=await ordersResolveService(id,resolve)
        if (!statusOrder) {
            return res.sendServerError("Order update failed")
        }
        res.status(204).json({ message: "Edit status create successfully", status: statusOrder});
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
}

