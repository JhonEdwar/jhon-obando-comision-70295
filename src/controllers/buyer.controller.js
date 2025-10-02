import {getBuyersService, getBuyerByIdService, updateBuyerService} from "../services/buyer.service.js"


export const getBuyers = async (req, res) => {
    const result = await getBuyersService()
    res.sendSuccess(result);

}

export const getBuyerById = async (req, res) => {
    const { id } = req.params
    const result = await getBuyerByIdService(id)
    res.sendSuccess(result);
}


export const updateBuyer = async (req, res) => {
    const { id } = req.params
    const updateBuyer = req.body

    const response = await updateBuyerService(id, updateBuyer)
    res.sendSuccess({ message: "Buyer updated successfully", response });

}

