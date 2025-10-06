import {getBusinessService, getBusinessByIdService,updateBusinessService } from "../services/business.service.js"
import { createProductService } from "../services/product.service.js"
import AppError from "../utils/appError.js"
import { asyncHandler } from "../utils/asyncHandler.js"
import logger from "../config/logger.js"

export const getBusiness = asyncHandler(async (req, res) => {
    logger.info('BusinessController: Attempting to fetch all businesses')
    const result = await getBusinessService()
    if (!result) {
        logger.warn('BusinessController: No businesses found')
        throw new AppError(404, 'No business found');
    }
    logger.info(`BusinessController: Successfully fetched ${result.length} businesses`)
    res.sendSuccess(result);
});

export const getBusinessById = asyncHandler(async (req, res) => {
    const { id } = req.params
    logger.info(`BusinessController: Attempting to fetch business by ID: ${id}`)
    const result = await getBusinessByIdService(id)
    if (!result) {
        logger.warn(`BusinessController: No business found with ID: ${id}`)
        throw new AppError(404, "No business found");
    }
    logger.info(`BusinessController: Successfully fetched business with ID: ${id}`)
    res.sendSuccess(result);
});

export const updateBusiness = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const updateData = req.body;
    logger.info(`BusinessController: Attempting to update business with ID: ${id}`)
    const updatedBusiness = await updateBusinessService(id, updateData);
    if (!updatedBusiness) {
        logger.warn(`BusinessController: No business found with ID: ${id} for update`)
        throw new AppError(404, "Business not found");
    }
    logger.info(`BusinessController: Successfully updated business with ID: ${id}`)
    res.sendSuccess({ message: "Business updated successfully", updatedBusiness });
});


export const addProduct = asyncHandler(async (req, res) => {
    const { id } = req.params
    const product = req.body
    logger.info(`BusinessController: Attempting to add product for business ID: ${id}`)
    if (!product.title || !product.price || !product.stock) {
        logger.warn('BusinessController: Missing required product fields')
        throw new AppError(400, "Missing required product fields");
    }

    const business = await getBusinessByIdService(id)
    if (!business) {
        logger.warn(`BusinessController: No business found with ID: ${id}`)
        throw new AppError(404, "Business not found");
    }

    product.business = business._id;
    const newProduct = await createProductService(product)
    logger.info(`BusinessController: Successfully added product with ID: ${newProduct._id} for business ID: ${id}`)
    res.sendSuccess({ message: "Product added successfully", newProduct });
});
