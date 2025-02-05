import BuyerDao from "../daos/buyer.dao.js"
import BuyerDTO from "../dtos/buyer.dto.js"

const buyerService = new BuyerDao()


export const getBuyersService = async () => {
    try {
        const result = await buyerService.get()
        const buyers = await result.map(buyer=>{
            const newBuyer= new BuyerDTO(buyer)
            return newBuyer
        })
        return buyers
    } catch (error) {
        console.error("Error in getBuyersService:", error)
        throw new Error("Failed to get buyers")
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

