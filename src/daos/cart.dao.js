import cartModel from "../models/cart.model.js";

export default class CartDao{
    constructor() {}
    get=async()=>{
        try {
            const result=await cartModel.find()
            return result    
        } catch (error) {
            return { error: "Failed to fetch orders" }
        }
    }

    getByIdBuyer = async (idBuyer) => {
        try {
            const result = await cartModel.findOne({ buyer: idBuyer})
            return result
        } catch (error) {
            console.log(error)
            return { error: "Failed to fetch cart by ID" }
        }
    }

    create = async (cart) => {
        try {
            const result = await cartModel.create(cart)
            return result
        } catch (error) {
            console.log(error)
            return { error: "Failed to create cart" }
        }
    }

    updateCart = async (id, updateProducts) => {

            try {

                const result = await cartModel.updateOne({ _id: id }, { $set: { products: updateProducts } })
                return result

            } catch (error) {

                console.log(error)
                return { error: "Failed to update product" }
                
            }
    }

    deleteCart = async (id) => {
        try {
            const result = await cartModel.deleteOne({ _id: id })
            return result
        } catch (error) {
            console.error("Error in cartDao.deleteCart:", error);
            throw new Error("Database error while deleting cart");
        }
    }

}


