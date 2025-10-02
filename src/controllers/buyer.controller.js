import {getBuyersService, getBuyerByIdService, updateBuyerService} from "../services/buyer.service.js"
import { asyncHandler } from "../utils/asyncHandler.js"

export const getBuyers = asyncHandler(async (req, res) => {
    const result = await getBuyersService()
    res.sendSuccess(result);
});

export const getBuyerById = asyncHandler(async (req, res) => {
    const { id } = req.params
    const result = await getBuyerByIdService(id)
    res.sendSuccess(result);
});


export const updateBuyer = asyncHandler(async (req, res) => {
    const { id } = req.params
    const updateBuyer = req.body

    const response = await updateBuyerService(id, updateBuyer)
    res.sendSuccess({ message: "Buyer updated successfully", response });
});

