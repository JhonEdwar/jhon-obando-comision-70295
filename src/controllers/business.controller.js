import {getBusinessService, getBusinessByIdService,updateBusinessService } from "../services/business.service.js"
import { createProductService } from "../services/product.service.js"

export const getBusiness = async (req, res) => {
    try {
        const result = await getBusinessService()
         if (!result) return res.sendServerError("Something went wrong, try again later")
        res.sendSuccess(result);
    } catch (error) {
        res.sendServerError(error);
    }
}

export const getBusinessById = async (req, res) => {
    const { id } = req.params
    try {
        const result = await getBusinessByIdService(id)
        if (!result) return res.sendServerError("Something went wrong, try again later")
        res.sendSuccess(result);
    } catch (error) {
        res.sendServerError(error);
    }
}

export const updateBusiness = async (req, res) => {
    const { id } = req.params;
    const updateData = req.body;
    try {
        const updatedBusiness = await updateBusinessService(id, updateData);
        if (!updatedBusiness) {
            return res.sendNotFound("Business not found");
        }
        res.sendSuccess({ message: "Business updated successfully", updatedBusiness });
    } catch (error) {
        res.sendServerError(error);
    }
}


export const addProduct = async (req, res) => {
    const { id } = req.params
    const product = req.body
    try {
        if (!product.title || !product.price || !product.stock) {
            return res.sendBadRequest("Missing required product fields");
        }

        const business = await getBusinessByIdService(id)
        if (!business) {
            return res.sendNotFound("Business not found");
        }

        product.business = business._id;

        const newProduct = await createProductService(product)

        res.sendSuccess({ message: "Product added successfully", newProduct });
    } catch (error) {
        res.sendServerError(error);
    }
}
