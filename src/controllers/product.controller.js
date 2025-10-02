import { getProductService,getProductByIdService,createProductService,updateProductService, deleteProductService } from "../services/product.service.js"
import AppError from "../utils/appError.js"

export const getProducts= async (req, res) => {
            const products = await getProductService()
            res.sendSuccess(products);
    }

export const getProductsById= async (req, res) => {
        const { id } = req.params
            const product = await getProductByIdService(id)
            if (!product) {
                throw new AppError(404, "Product not found");
            }
            res.sendSuccess(product);
    }

export const createProduct = async (req, res) => {

        const product = req.body;
        const response = await createProductService(product);
        res.sendSuccess({ message: "Product created successfully", product: response });
};

export const updateProduct = async (req, res) => {
        const { id } = req.params;
        const updateProduct = req.body;
        const response = await updateProductService(id, updateProduct);
        res.sendSuccess({ message: "Product updated successfully", product: response });    
};

export const deleteProduct = async (req, res) => {
        const id = req.params.id;
        const response = await deleteProductService(id);
        res.sendSuccess({ message: "Product deleted successfully", product: response });
};
