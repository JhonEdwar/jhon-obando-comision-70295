import Joi from 'joi';

// crear carrito
export const createCartSchema = Joi.object({
    products: Joi.array()
        .items(
            Joi.object({
                productId: Joi.string()
                    .hex()
                    .length(24)
                    .required(),
                quantity: Joi.number()
                    .integer()
                    .min(1)
                    .max(100)
                    .required()
            })
        )
        .default([])
});

// agregar producto al carrito
export const addProductToCartSchema = Joi.object({
    productId: Joi.string()
        .hex()
        .length(24)
        .required(),
    
    quantity: Joi.number()
        .integer()
        .min(1)
        .max(100)
        .required()
});