import { getProductService,getProductByIdService,createProductService,updateProductService, deleteProductService } from "../services/product.service.js"
import AppError from "../utils/appError.js"
import { asyncHandler } from "../utils/asyncHandler.js"

export const getProducts= asyncHandler(async (req, res) => {
            const products = await getProductService()
            res.sendSuccess(products);
    });

export const getProductsById= asyncHandler(async (req, res) => {
        const { id } = req.params
            const product = await getProductByIdService(id)
            if (!product) {
                throw new AppError(404, "Product not found");
            }
            res.sendSuccess(product);
    });

export const createProduct = asyncHandler(async (req, res) => {

        const product = req.body;
        if (!product.title || !product.price || !product.stock) {
            throw new AppError(400, "Missing required product fields");
        }
        const response = await createProductService(product);
        res.sendSuccess({ message: "Product created successfully", product: response });
});

export const updateProduct = asyncHandler(async (req, res) => {
        const { id } = req.params;
        const updateProduct = req.body;
        const response = await updateProductService(id, updateProduct);
        res.sendSuccess({ message: "Product updated successfully", product: response });    
});

export const deleteProduct = asyncHandler(async (req, res) => {
        const id = req.params.id;
        const response = await deleteProductService(id);
        res.sendSuccess({ message: "Product deleted successfully", product: response });
});
