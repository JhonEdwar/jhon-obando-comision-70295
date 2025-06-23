import {getBusinessService, getBusinessByIdService} from "../services/business.service.js"


export const getBusiness = async (req, res) => {
    try {
        const result = await getBusinessService()
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
}

export const getBusinessById = async (req, res) => {
    const { id } = req.params
    try {
        const result = await getBusinessByIdService(id)
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
}


export const addProduct = async (req, res) => {
    const { id } = req.params
    const product = req.body
    try {
        const result = await getBusinessByIdService(id)
        if (!result) return res.sendServerError("Something went wrong, try again later bussines not found")
        result.products.push(product)
        await businessService.update(result._id, result)
        res.sendSuccess(result)
    } catch (error) {
        res.sendServerError(error)
    }
}
