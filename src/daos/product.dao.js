import productModel from "../models/product.model.js"

export const productDao = {

    getProduct:async ()=> {
        const products = await productModel.find()
        return products
    },
    createProduct: async  (product) => {
        await productModel.create(product)
    },
    updateProduct:async (id,updateProduct) => {
        await productModel.updateOne({_id:id},updateProduct)
    },
    deleteProduct:async (id) => {
        await productModel.deleteOne({_id:id})
    }

}