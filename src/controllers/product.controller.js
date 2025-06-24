import { getProductService,getProductByIdService,createProductService,updateProductService, deleteProductService } from "../services/product.service.js"


export const getProducts= async (req, res) => {
        try {
            const products = await getProductService()
            res.status(200).send(products);
        } catch (error) {
            res.status(500).send({ message: "Internal Server Error", error: error.message });
            
        }
    }
export const getProductsById= async (req, res) => {
        const { id } = req.params
        try {
            const product = await getProductByIdService(id)
            if (!product) {
                return res.status(404).send({ message: "Product not found" });
            }
            res.status(200).send(product);
        } catch (error) {
            res.status(500).send({ message: "Internal Server Error", error: error.message });
        }
    }

export const createProduct = async (req, res) => {
    try {
        const product = req.body;
        const response = await createProductService(product);
        res.send({ message: "Product created successfully", product: response });
    } catch (error) {
        res.status(500).send({ message: "Internal Server Error", error: error.message });
    }
};

export const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const updateProduct = req.body;
        const response = await updateProductService(id, updateProduct);
        res.send({ message: "Product updated successfully", product: response });
    } catch (error) {
        res.status(500).send({ message: "Internal Server Error", error: error.message });
    }
};

export const deleteProduct = async (req, res) => {
    try {
        const id = req.params.id;
        const response = await deleteProductService(id);
        res.send({  message: "Product deleted successfully", product: response });
    } catch (error) {
        res.status(500).send({ message: "Internal Server Error", error: error.message });
    }
};
