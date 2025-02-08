import BusinessDao from "../daos/business.dao.js"
import BusDTO from "../dtos/business.dto.js"

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
        console.error("Error in getBusinessService:", error)
        throw new Error("Failed to get business")
    }
}

export const getBusinessByIdService = async (id) => {
    try {
        const result = await BusinessService.getById(id)
        const business= new BusDTO(result)
        return business
    } catch (error) {
        console.error("Error in getBusinessByIdService:", error)
        throw new Error("Failed to get business by ID")
    }
}