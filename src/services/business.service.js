import BusinessDao from "../dao/business.dao"
import BusDTO from "../dtos/business.dto"

const BusinessrService = new BuyerDao()


export const getBusinessService = async () => {
    try {
        const result = await BusinessrService.get()
        const businesses = await result.map(business=>{
            const newBusiness= new BusDTO(business)
            return businesses
        })
        return result
    } catch (error) {
        console.error("Error in getBusinessService:", error)
        throw new Error("Failed to get business")
    }
}

export const getBusinessByIdService = async (id) => {
    try {
        const result = await BusinessrService.getById(id)
        const business= new BusDTO(result)
        return business
    } catch (error) {
        console.error("Error in getBusinessByIdService:", error)
        throw new Error("Failed to get business by ID")
    }
}