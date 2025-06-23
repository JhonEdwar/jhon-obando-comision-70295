import { 
    getCartsService, 
    getCartByIdService,
    createCartService, 
    updateCartService, 
    deleteCartService } 
    from "../services/cart.service.js";

    

export const getCarts = async (req, res) => {
    try {
        const result = await getCartsService()
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
}

export const getCartbyIdBuyer = async (req, res) => {
    const {_id}= req.user
    try {
        const result = await getCartByIdService(_id)
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
}

export const createCart = async (req, res) => {
    const { products } = req.body;
    const { _id: userId } = req.user;

    try {
        const newCart = await createCartService({ userId, products });
        res.status(201).json(newCart);
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
}


export const addProductToCart = async (req, res) => {
    const { cartId } = req.params;
    const { productId, quantity } = req.body;

    try {
        const updatedCart = await updateCartService(cartId, { productId, quantity });
        res.status(200).json({message: "Product added to cart successfully", updatedCart});
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
}

export const deleteCart = async (req, res) => {
    const { id } = req.params;
    try {
        await deleteCartService(id);
         res.status(200).json({success: true,message: "Cart deleted successfully"
    });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
}