import {getBusinessService, getBusinessByIdService,updateBusinessService } from "../services/business.service.js"
import { createProduct } from "../services/product.service.js"

export const getBusiness = async (req, res) => {
    try {
        const result = await getBusinessService()
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
}

export const getBusinessById = async (req, res) => {
    const { id } = req.params
    try {
        const result = await getBusinessByIdService(id)
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export const updateBusiness = async (req, res) => {
    const { id } = req.params;
    const updateData = req.body;
    try {
        const updatedBusiness = await updateBusinessService(id, updateData);
        if (!updatedBusiness) {
            return res.status(404).json({ message: "Business not found" });
        }
        res.status(200).json({ message: "Business updated successfully", updatedBusiness });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
}


export const addProduct = async (req, res) => {
    const { id } = req.params
    const product = req.body
    try {
        if (!product.title || !product.price || !product.stock) {
            return res.status(400).json({ message: "Missing required product fields" });
        }

        const business = await getBusinessByIdService(id)
        if (!business) {
            return res.status(404).json({ message: "Business not found" });
        }

        product.business = business._id;

        const newProduct = await createProduct(product)

        res.status(201).json({ message: "Product added successfully", newProduct });
    } catch (error) {
       res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
}
