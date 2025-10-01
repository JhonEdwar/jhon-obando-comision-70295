import { getProductService,getProductByIdService,createProductService,updateProductService, deleteProductService } from "../services/product.service.js"


export const getProducts= async (req, res) => {
        try {
            const products = await getProductService()
            res.sendSuccess(products);
        } catch (error) {
            res.sendServerError(error);
        }
    }
export const getProductsById= async (req, res) => {
        const { id } = req.params
        try {
            const product = await getProductByIdService(id)
            if (!product) {
                return res.sendNotFound("Product not found");
            }
            res.sendSuccess(product);
        } catch (error) {
            res.sendServerError(error);
        }
    }

export const createProduct = async (req, res) => {
    try {
        const product = req.body;
        const response = await createProductService(product);
        res.sendSuccess({ message: "Product created successfully", product: response });
    } catch (error) {
        res.sendServerError(error);
    }
};

export const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const updateProduct = req.body;
        const response = await updateProductService(id, updateProduct);
        res.sendSuccess({ message: "Product updated successfully", product: response });    
    } catch (error) {
        res.sendServerError(error);
    }
};

export const deleteProduct = async (req, res) => {
    try {
        const id = req.params.id;
        const response = await deleteProductService(id);
        res.sendSuccess({ message: "Product deleted successfully", product: response });
    } catch (error) {
        res.sendServerError(error);
    }
};
