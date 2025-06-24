import buyerModel from "../models/buyer.model.js";

export default class BuyerDao{
    constructor() {}

    get = async () => {
        try {
            const buyers = await buyerModel.find()
            return buyers
        } catch (error) {
            console.log(error)
            return { error: "Failed to fetch buyers" }
        }
    }

    getById = async (id) => {
        try {
            const buyer = await buyerModel.findOne({ _id: id })
            return buyer
        } catch (error) {
            console.log(error)
            return { error: "Failed to fetch buyer by ID" }
        }
    }
    
    getByEmail = async (email) => {
        try {
            const buyer = await buyerModel.findOne({ email })
            return buyer
        } catch (error) {
            console.log(error)
            return { error: "Failed to fetch buyer by email" }
        }
    }

    updateOrders = async (id, updateBuyer) => {
        try {
            const result = await buyerModel.updateOne({ _id: id },{$push: { orders: updateBuyer }})
            if (result.modifiedCount === 0) {
                return { error: "No buyer found with the given ID" }
            }
        } catch (error) {
            console.log(error)
            return { error: "Failed to update buyer" }
        }
    }
    update = async (id, updateBuyer) => {
        try {
            const result = await buyerModel.updateOne({ _id: id },updateBuyer)
            if (result.modifiedCount === 0) {
                return { error: "No buyer found with the given ID" }
            }
        } catch (error) {
            console.log(error)
            return { error: "Failed to update buyer" }
        }
    }

    save = async (buyer) => {
        try {
            const result = await buyerModel.create(buyer)
            return result
        } catch (error) {
            console.log(error)
            return { error: "Failed to save buyer" }
        }
    }
}