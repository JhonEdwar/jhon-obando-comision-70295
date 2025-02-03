import { userDao } from "../dao/userDB.dao.js"

export const userService = {
    getUsers: async () => {
        const users = await userDao.getUsers()
        return users
    },
    updateUser: async (id,updateUser) => {
        await userDao.updateUser(id,updateUser)
        return 'User updated!'
    },
    deleteUser: async (id) => {
        await userDao.deleteUser(id)
        return 'User deleted!'
    }
}