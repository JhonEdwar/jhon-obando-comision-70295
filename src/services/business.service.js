import BusinessDao from "../dao/business.dao"

const BusinessrService = new BuyerDao()


export const getBusinessService = async () => {
    try {
        const result = await BusinessrService.get()
        return result
    } catch (error) {
        console.error("Error in getBusinessService:", error)
        throw new Error("Failed to get business")
    }
}

export const getBusinessByIdService = async (id) => {
    try {
        const result = await BusinessrService.getById(id)
        return result
    } catch (error) {
        console.error("Error in getBusinessByIdService:", error)
        throw new Error("Failed to get business by ID")
    }
}