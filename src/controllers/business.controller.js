import {getBusinessService, getBusinessByIdService,updateBusinessService } from "../services/business.service.js"
import { productService } from "../services/product.service.js"

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


export const addProduct = async (req, res) => {
    const { id } = req.params
    const product = req.body
    try {
         // Validar datos del producto
        if (!product.title || !product.price || !product.stock) {
            return res.status(400).json({ message: "Missing required product fields" });
        }

        const result = await getBusinessByIdService(id)
        if (!business) {
            return res.status(404).json({ message: "Business not found" });
        }

        product.business = id;

        const newProduct = await productService.createProduct(product)
        res.status(201).json({ message: "Product added successfully", newProduct });
    } catch (error) {
       res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
}
