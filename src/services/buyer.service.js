import BuyerDao from "../daos/buyer.dao.js"
import BuyerDTO from "../dtos/buyer.dto.js"
import AppError from "../utils/appError.js"

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
         if (error instanceof AppError) throw error
         throw new AppError(500, `Failed to fetch buyers: ${error.message}`)
    }
}

export const getBuyerByEmailService = async (email) => {
    try {
        const result = await buyerService.getByEmail(email)
        if (!result) {
            throw new AppError(404, "No buyer found with the given email");
        }
        const buyer = new BuyerDTO(result)
        return buyer
    } catch (error) {
         if (error instanceof AppError) throw error
         throw new AppError(500, `Failed to fetch buyersByEmail: ${error.message}`)
    }
}

export const getBuyerByIdService = async (id) => {
    try {
        const result = await buyerService.getById(id)
        const buyer= new BuyerDTO(result)
        return buyer
    } catch (error) {
        console.error("Error in getBuyerByIdService:", error)
        throw new AppError(500, `Failed to fetch buyer by ID: ${error.message}`)
    }
}

export const addOrderToBuyerService = async (id, updateBuyer, options = {}) => {
    try {
        const result = await buyerService.updateOrders(id, updateBuyer, options)
        if(!result) {
            throw new AppError(404, "No buyer found with the given ID"); 
        }
        return result
    } catch (error) {
        console.error("Error in addOrderToBuyerService:", error)
        throw error
    }
}   

export const updateBuyerService = async (id, updateBuyer) => {
    try {
        const result = await buyerService.update(id, updateBuyer)
        if (!result) {
            throw new AppError(404, "No buyer found with the given ID");
        }
        return result
    } catch (error) {
        console.error("Error in updateBuyerService:", error)
        throw error
    }
}

