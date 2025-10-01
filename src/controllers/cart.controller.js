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
        res.sendSuccess(result);
    } catch (error) {
        res.sendServerError(error);
    }
}

export const getCartbyIdBuyer = async (req, res) => {
    const {_id}= req.user
    try {
        const result = await getCartByIdService(_id)
        res.sendSuccess(result);
    } catch (error) {
        res.sendServerError(error);
    }
}

export const createCart = async (req, res) => {
    const { products } = req.body;
    const { _id: userId } = req.user;

    try {
        const newCart = await createCartService({ userId, products });
        res.sendSuccess({ message: "Cart created successfully", newCart });
    } catch (error) {
        res.sendServerError(error);
    }
}


export const addProductToCart = async (req, res) => {
    const { cartId } = req.params;
    const { productId, quantity } = req.body;

    try {
        const updatedCart = await updateCartService(cartId, { productId, quantity });
        res.sendSuccess({ message: "Product added to cart successfully", updatedCart });
    } catch (error) {
        res.sendServerError(error);
    }
}

export const deleteCart = async (req, res) => {
    const { id } = req.params;
    try {
        await deleteCartService(id);
         res.sendSuccess({ message: "Cart deleted successfully" });
    } catch (error) {
        res.sendServerError(error);
    }
}