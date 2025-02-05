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

