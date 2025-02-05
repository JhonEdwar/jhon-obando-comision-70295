import {getBuyersService} from "../services/buyer.service.js"


export const getBuyers = async (req, res) => {
    try {
        const result = await getBuyersService()
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
}

export const getBuyerById = async (req, res) => {
    const { id } = req.params
    try {
        const result = await getBuyerByIdService(id)
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
}


export const createBuyer = async (req, res) => {
    const buyerData = req.body
    try {
        const result = await getBuyerByIdService (buyerData)
        res.status(201).json({ message: "Buyer created successfully", data: result });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
}
