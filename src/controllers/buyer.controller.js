import {getBuyersService, getBuyerByIdService, updateBuyerService} from "../services/buyer.service.js"


export const getBuyers = async (req, res) => {
    try {
        const result = await getBuyersService()
        res.sendSuccess(result);
    } catch (error) {
        res.sendServerError(error);
    }
}

export const getBuyerById = async (req, res) => {
    const { id } = req.params
    try {
        const result = await getBuyerByIdService(id)
        res.sendSuccess(result);
    } catch (error) {
        res.sendServerError(error);
    }
}


export const updateBuyer = async (req, res) => {
    const { id } = req.params
    const updateBuyer = req.body
    try {
        const response = await updateBuyerService(id, updateBuyer)
        res.sendSuccess({ message: "Buyer updated successfully", response });

    } catch (error) {
        res.sendServerError(error);
    }
}

