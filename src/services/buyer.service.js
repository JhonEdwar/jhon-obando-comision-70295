import BuyerDao from "../daos/buyer.dao.js"
import BuyerDTO from "../dtos/buyer.dto.js"

const buyerService = new BuyerDao()


export const getBuyersService = async () => {
    try {
        const result = await buyerService.get()
        const buyers =  result.map(buyer=>{
            const newBuyer= new BuyerDTO(buyer)
            return newBuyer
        })
        return buyers
    } catch (error) {
        console.error("Error in getBuyersService:", error)
        throw new Error("Failed to get buyers")
    }
}

export const getBuyerByEmailService = async (email) => {
    try {
        const result = await buyerService.getByEmail(email)
        if (!result) {
            throw new Error("Buyer not found")
        }
        const buyer = new BuyerDTO(result)
        return buyer
    } catch (error) {
        console.error("Error in getBuyerByEmailService:", error)
        throw new Error("Failed to get buyer by email")
    }
}

export const getBuyerByIdService = async (id) => {
    try {
        const result = await buyerService.getById(id)
        const buyer= new BuyerDTO(result)
        return buyer
    } catch (error) {
        console.error("Error in getBuyerByIdService:", error)
        throw new Error("Failed to get buyer by ID")
    }
}

export const addOrderToBuyerService = async (id, updateBuyer) => {
    try {
        const result = await buyerService.updateOrders(id, updateBuyer)
        if(!result) {
            throw new Error("Buyer not found")
        }
        return result
    } catch (error) {
        console.error("Error in updateBuyerService:", error)
        throw new Error("Failed to update buyer")
    }
}   

export const updateBuyerService = async (id, updateBuyer) => {
    try {
        const result = await buyerService.update(id, updateBuyer)
        if (!result) {
            throw new Error("Buyer not found")
        }
        return result
    } catch (error) {
        console.error("Error in updateBuyerService:", error)
        throw new Error("Failed to update buyer")
    }
}

