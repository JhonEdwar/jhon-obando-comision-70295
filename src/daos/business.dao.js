import businessModel from "../models/business.model.js"

export default class BusinessDao {

    constructor(){

    }

    get = async () => {

        try {

            const result = await businessModel.find()
            return result

        } catch (error) {

            console.log(error)
            return { error: "Failed to fetch businesses" }

        }
    }

    getById = async (id) => {

        try {

            const result = await businessModel.findOne({ _id: id })
            return result

        } catch (error) {

            console.log(error)
            return { error: "Failed to fetch business by ID" }

        }
    }

    getByEmail = async (email) => {

        try {

            const result = await businessModel.findOne({ email })
            return result

        } catch (error) {

            console.log(error)
            return { error: "Failed to fetch business by email" }

        }
    }

    update = async (id, updateData) => {
        try {
            const result = await businessModel.findByIdAndUpdate(id, updateData);
            return result;
        } catch (error) {
            console.log(error);
            return { error: "Failed to update business" };
        }
    }

    save = async (business) => {
        try {

            const result = await businessModel.create(business)
            return result

        } catch (error) {

            console.log(error)
            return { error: "Failed to save business" }

        }
    }

}