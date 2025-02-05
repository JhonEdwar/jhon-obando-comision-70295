import userModel from "../models/user.model.js"


export default class AdminDao{
    constructor() {}

    save= async (user) => {
        try {
            const result = await userModel.create(user)
            return result
        } catch (error) {
            console.log(error)
            return { error: "Failed to fetch buyers" }
        }
    }

    getByEmail = async (email) => {
        try {
            const admin = await userModel.findOne({ email })
            return admin
        } catch (error) {
            console.log(error)
            return { error: "Failed to fetch admin by email" }
        }
    }


}