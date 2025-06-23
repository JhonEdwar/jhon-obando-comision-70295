import CartDao from '../daos/cart.dao.js';

const cartDao = new CartDao();

export const getCartsService = async () => {
    try {
        const carts = await cartDao.get();
        return carts;
    } catch (error) {
        console.error("Error in getCartsService:", error);
        throw new Error("Failed to get carts");
    }
}

export const getCartByIdService = async (idBuyer) => {
    try {
        const cart = await cartDao.getByIdBuyer(idBuyer);
        return cart;
    } catch (error) {
        console.error("Error in getCartByIdService:", error);
        throw new Error("Failed to get cart by id");
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
        return newCart;
    } catch (error) {
        console.error("Error in createCartService:", error);
        throw new Error("Failed to create cart");
    }
};

export const updateCartService = async (id, updateProducts) => {
    try {
        const updatedCart = await cartDao.updateCart(id, updateProducts);
        return updatedCart;
    } catch (error) {
        console.error("Error in updateCartService:", error);
        throw new Error("Failed to update cart");
    }
};

export const deleteCartService = async (id) => {
   
        const result = await cartDao.delete(id);
        if (result.deletedCount === 0) {
        throw new Error("Cart not found or already deleted");
        }
        return result

};