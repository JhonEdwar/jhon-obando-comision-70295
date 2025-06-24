import productModel from "../models/product.model.js"

export class ProductDao {
    constructor() {}
    async getProduct() {
        try {
            const products = await productModel.find();
            return products;
        } catch (error) {
            return { error: error.message };
        }
    }

    async getProductById(id) {
        try {
            const product = await productModel.findById(id);
            return product;
        } catch (error) {
            return { error: error.message };
        }
    }

    async createProduct(product) {
        try {
            const newProduct = await productModel.create(product);
            return newProduct;
        } catch (error) {
            return { error: error.message };
        }
    }

    async updateProduct(id, updateProduct) {
        try {
            const result = await productModel.updateOne({ _id: id }, updateProduct);
            return result;
        } catch (error) {
            return { error: error.message };
        }
    }

    async deleteProduct(id) {
        try {
            const result = await productModel.deleteOne({ _id: id });
            return result;
        } catch (error) {
            return { error: error.message };
        }
    }
}

