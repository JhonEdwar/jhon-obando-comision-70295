import productModel from "../models/product.model.js"
import AppError from "../utils/appError.js"

export default class ProductDao {
    constructor() {}
    async getProduct() {
        try {
            const products = await productModel.find();
            return products;
        } catch (error) {
            throw new AppError(500, `Failed to fetch products: ${error.message}`);
        }
    }

    async getProductById(id) {
        try {
            const product = await productModel.findById(id);
            if (!product) {
                throw new AppError(404, "Product not found");
            }
            return product;
        } catch (error) {
            if (error instanceof AppError) throw error;
            throw new AppError(500, `Failed to fetch product by ID: ${error.message}`);
        }
    }

    async getProductsByIds(ids) {
        try {
            const products = await productModel.find({ _id: { $in: ids } });
            return products;
        } catch (error) {
            if (error instanceof AppError) throw error;
            throw new AppError(500, `Failed to fetch products: ${error.message}`);
        }
    }

    async createProduct(product) {
        try {
            const newProduct = await productModel.create(product);
            return newProduct;
        } catch (error) {
            if (error.code === 11000) {
                  throw new AppError(409, "Product already exists with this ID");
            }
            throw new AppError(500, `Failed to create product: ${error.message}`);
        }
    }

    async updateProduct(id, updateProduct ,options = {}) {
        try {
            const result = await productModel.updateOne({ _id: id }, updateProduct, options);
            if (result.modifiedCount === 0) {
                throw new AppError(404, "No product found with the given ID");
            }
            return result;
        } catch (error) {
            if (error instanceof AppError) throw error;
            throw new AppError(500, `Failed to update product: ${error.message}`);
        }
    }

    async deleteProduct(id) {
        try {
            const result = await productModel.deleteOne({ _id: id });
            if (result.deletedCount === 0) {
                throw new AppError(404, "No product found with the given ID");
            }
            return result;
        } catch (error) {
            if (error instanceof AppError) throw error;
            throw new AppError(500, `Failed to delete product: ${error.message}`);
        }
    }
}

