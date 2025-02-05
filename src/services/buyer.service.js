import Buyer from "../daos/buyer.dao.js"

const buyerService = new Buyer()


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


export const createBuyerService = async (buyerData) => {
    try {
        const result = await buyerService.save(buyerData)
        return result
    } catch (error) {
        console.error("Error in createBuyerService:", error)
        throw new Error("Failed to create buyer")
    }
}
