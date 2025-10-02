import BusinessDao from "../daos/business.dao.js"
import BusDTO from "../dtos/business.dto.js"
import AppError from "../utils/appError.js"

const BusinessService = new BusinessDao()


export const getBusinessService = async () => {
    try {
        const result = await BusinessService.get()
        const businesses = await result.map(business=>{
            const newBusiness= new BusDTO(business)
            return newBusiness
        })
        return businesses
    } catch (error) {
         if (error instanceof AppError) throw error
         throw new AppError(500, `Failed to fetch businesses: ${error.message}`)
    }
}

export const getBusinessByIdService = async (id) => {
    try {
        const result = await BusinessService.getById(id)
        if (!result) {
            throw new AppError(404, "No business found with the given ID");
        }
        const business= new BusDTO(result)
        return business
    } catch (error) {
         if (error instanceof AppError) throw error
         throw new AppError(500, `Failed to fetch businesses: ${error.message}`)
    }
}

export const updateBusinessService = async (id, updateData) => {
    try {
        const result = await BusinessService.update(id, updateData)
        if (!result) {
            throw new AppError(404, "No business found with the given ID");
        }
        return "Business updated successfully"
    } catch (error) {
        console.error("Error in updateBusinessService:", error)
        throw error
    }
}