import { userService } from "../services/user.service.js"

export const userController = {
    getUsers: async (req, res) => {
        const users= await userService.getUsers()
        res.send(users)
    },
    updateUser: async (req, res) => {
        const id = parseInt(req.params.id)
        const updateUser = req.body
        const response = await userService.updateUser(id,updateUser)
        res.send({message: response})
    },
    deleteUser: async (req, res) => {
        const id = parseInt(req.params.id)
        const response = await userService.deleteUser(parseInt(id))
        res.send({message: response})
    }
}