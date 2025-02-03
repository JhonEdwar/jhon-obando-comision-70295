import { userDao } from "../dao/userDB.dao.js"

export const userService = {
    getUsers: async () => {
        const users = await userDao.getUsers()
        return users
    },
    createUser: async (user) => {
        await userDao.createUser(user)
        return 'User created!'
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