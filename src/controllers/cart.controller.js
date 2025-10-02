import { 
    getCartsService, 
    getCartByIdService,
    createCartService, 
    updateCartService, 
    deleteCartService } 
    from "../services/cart.service.js";
import AppError from "../utils/appError.js"
import { asyncHandler } from "../utils/asyncHandler.js"
    

export const getCarts = asyncHandler(async (req, res) => {
    const result = await getCartsService()
    res.sendSuccess(result);
});

export const getCartbyIdBuyer = asyncHandler(async (req, res) => {
    const {_id}= req.user
    const result = await getCartByIdService(_id)
    res.sendSuccess(result);
});

export const createCart = asyncHandler(async (req, res) => {
    const { products } = req.body;
    const { _id: userId } = req.user;

        const newCart = await createCartService({ userId, products });
        res.sendSuccess({ message: "Cart created successfully", newCart });
});


export const addProductToCart = asyncHandler(async (req, res) => {
    const { cartId } = req.params;
    const { productId, quantity } = req.body;

    const updatedCart = await updateCartService(cartId, { productId, quantity });
    res.sendSuccess({ message: "Product added to cart successfully", updatedCart });
});

export const deleteCart = asyncHandler(async (req, res) => {
    const { id } = req.params;
    await deleteCartService(id);
    res.sendSuccess({ message: "Cart deleted successfully" });
});