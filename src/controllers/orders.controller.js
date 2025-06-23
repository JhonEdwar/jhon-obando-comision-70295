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
    const { idBuyer, idBusiness, products} = req.body
    try {
        if (!idBuyer || !idBusiness || !products || !Array.isArray(products) || products.length === 0) {
            return res.status(400).json({ message: "Required parameters are missing" });
        }
        

        const orderResult = await orderCreateService(idBuyer, idBusiness, products)
        if (!orderResult) {
            return res.status(400).json({ message: "Order creation failed" });
        }
       
        res.status(201).json({ message: "Order create successfully", order: orderResult});

    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
}

export const ordersResolve = async (req, res) => {
    const { id } = req.params
    const { resolve } = req.body

    if (!id || !resolve) return res.status(400).json({ message: "Required parameters are missing" });
        if (resolve !== "confirmed" && resolve !== "pending" && resolve !== "cancelled") {
            return res.status(400).json({ message: "Invalid 'resolve' parameter" });
        }

    try {
        const statusOrder=await ordersResolveService(id,resolve)
        if (!statusOrder) {
            return res.status(500).json({ message: "Order update failed" });
        }
        res.status(204).json({ message: "Edit status create successfully", status: statusOrder});
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
}

