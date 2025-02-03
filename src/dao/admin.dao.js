import userModel from "../models/user.model.js"

export const authDao = {

    createUser: async  (user) => {
        await userModel.create(user)
    },
    findOne: async  (email) => {
        await userModel.findOne({email:email})
    }

}