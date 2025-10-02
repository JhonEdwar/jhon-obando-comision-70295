import CartDao from '../daos/cart.dao.js';
import AppError from "../utils/appError.js"

const cartDao = new CartDao();

export const getCartsService = async () => {
    try {
        const carts = await cartDao.get();
        return carts;
    } catch (error) {
        console.error("Error in getCartsService:", error);
        throw error
    }
}

export const getCartByIdService = async (idBuyer) => {
    try {
        const cart = await cartDao.getByIdBuyer(idBuyer);
        return cart;
    } catch (error) {
        console.error("Error in getCartByIdService:", error);
        throw error
    }
};

export const createCartService = async (data) => {
    const cartData = {
        products: data.products || [],
        userId: data.userId,
        createdAt: new Date()
    };
    try {
        const newCart = await cartDao.create(cartData); 
        if (!newCart) {
            throw new AppError(404, "No cart found with the given ID");
        }
        return newCart;
    } catch (error) {
        console.error("Error in createCartService:", error);
        throw error
    }
};

export const updateCartService = async (id, updateProducts) => {
    try {
        const updatedCart = await cartDao.updateCart(id, updateProducts);
        if (!updatedCart) {
            throw new AppError(404, "No cart found with the given ID");
        }
        return updatedCart;
    } catch (error) {
        console.error("Error in updateCartService:", error);
        throw error
    }
};

export const deleteCartService = async (id) => {
   
        const result = await cartDao.deleteCart(id)
        if (result.deletedCount === 0) {
            throw new AppError(404, "No cart found with the given ID");
        }
        return result

};