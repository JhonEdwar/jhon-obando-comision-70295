import {getBusinessService, getBusinessByIdService,updateBusinessService } from "../services/business.service.js"
import { createProductService } from "../services/product.service.js"
import AppError from "../utils/appError.js"

export const getBusiness = async (req, res) => {
        const result = await getBusinessService()
         if (!result) throw new AppError(404, "No business found");   
        res.sendSuccess(result);
}

export const getBusinessById = async (req, res) => {
    const { id } = req.params
    const result = await getBusinessByIdService(id)
    if (!result) throw new AppError(404, "No business found");
    res.sendSuccess(result);

}

export const updateBusiness = async (req, res) => {
    const { id } = req.params;
    const updateData = req.body;
        const updatedBusiness = await updateBusinessService(id, updateData);
        if (!updatedBusiness) {
            throw new AppError(404, "Business not found");
        }
        res.sendSuccess({ message: "Business updated successfully", updatedBusiness });
}


export const addProduct = async (req, res) => {
    const { id } = req.params
    const product = req.body
        if (!product.title || !product.price || !product.stock) {
            throw new AppError(400, "Missing required product fields");
        }

        const business = await getBusinessByIdService(id)
        if (!business) {
            throw new AppError(404, "Business not found");
        }

        product.business = business._id;

        const newProduct = await createProductService(product)

        res.sendSuccess({ message: "Product added successfully", newProduct });

}
