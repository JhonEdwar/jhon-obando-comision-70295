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