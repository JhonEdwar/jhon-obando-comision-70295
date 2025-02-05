import BuyerDao from "../daos/buyer.dao.js"

const buyerService = new BuyerDao()


export const getBuyersService = async () => {
    try {
        const result = await buyerService.get()
        return result
    } catch (error) {
        console.error("Error in getBuyersService:", error)
        throw new Error("Failed to get buyers")
    }
}

export const getBuyerByIdService = async (id) => {
    try {
        const result = await buyerService.getById(id)
        return result
    } catch (error) {
        console.error("Error in getBuyerByIdService:", error)
        throw new Error("Failed to get buyer by ID")
    }
}

