import cartModel from "../models/cart.model.js";
import AppError from "../utils/appError.js"

export default class CartDao{
    constructor() {}
    get=async()=>{
        try {
            const result=await cartModel.find()
            return result    
        } catch (error) {
            throw new AppError(500, `Failed to fetch carts: ${error.message}`)
        }
    }

    getByIdBuyer = async (idBuyer) => {
        try {
            const result = await cartModel.findOne({ userId: idBuyer})
            if (!result) {
                throw new AppError(404, "Cart not found")
            }
            return result
        } catch (error) {
            if (error instanceof AppError) throw error;
            throw new AppError(500, `Failed to fetch cart by buyer ID: ${error.message}`)
        }
    }

    create = async (cart) => {
        try {
            const result = await cartModel.create(cart)
            return result
        } catch (error) {
            if (error.code === 11000) {
                  throw new AppError(409, "Cart already exists for this user")
            }
            throw new AppError(500, `Failed to create cart: ${error.message}`)
        }
    }

    updateCart = async (id, updateProducts) => {

            try {

                const result = await cartModel.updateOne({ _id: id }, { $set: { products: updateProducts } })
                if (result.modifiedCount === 0) {
                    throw new AppError(404, "No cart found with the given ID")
                }
                return result

            } catch (error) {
                if (error instanceof AppError) throw error;
                throw new AppError(500, `Failed to update cart: ${error.message}`)
            }
    }

    deleteCart = async (id) => {
        try {
            const result = await cartModel.deleteOne({ _id: id })
            if (result.deletedCount === 0) {
                throw new AppError(404, "No cart found with the given ID")
            }
            return result
        } catch (error) {
            if (error instanceof AppError) throw error;
            throw new AppError(500, `Failed to delete cart: ${error.message}`)
        }
    }

}


