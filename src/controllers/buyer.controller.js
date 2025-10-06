import {getBuyersService, getBuyerByIdService, updateBuyerService} from "../services/buyer.service.js"
import { asyncHandler } from "../utils/asyncHandler.js"
import logger from "../config/logger.js"

export const getBuyers = asyncHandler(async (req, res) => {
    logger.info('BuyerController: Attempting to fetch all buyers')
    const result = await getBuyersService()
    logger.info(`BuyerController: Successfully fetched ${result.length} buyers`)
    res.sendSuccess(result);
});

export const getBuyerById = asyncHandler(async (req, res) => {
    const { id } = req.params
    logger.info(`BuyerController: Attempting to fetch buyer by ID: ${id}`)
    const result = await getBuyerByIdService(id)
    logger.info(`BuyerController: Successfully fetched buyer with ID: ${id}`)
    res.sendSuccess(result);
});


export const updateBuyer = asyncHandler(async (req, res) => {
    const { id } = req.params
    const updateBuyer = req.body
    logger.info(`BuyerController: Attempting to update buyer with ID: ${id}`)
    const response = await updateBuyerService(id, updateBuyer)
    logger.info(`BuyerController: Successfully updated buyer with ID: ${id}`)
    res.sendSuccess({ message: "Buyer updated successfully", response });
});

