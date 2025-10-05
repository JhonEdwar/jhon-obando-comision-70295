import Joi from 'joi';

export const createProductSchema = Joi.object({
    title: Joi.string()
        .min(2)
        .max(100)
        .required()
        .trim()
        .messages({
            'string.min': 'Title must be at least 3 characters',
            'string.max': 'Title cannot exceed 100 characters',
            'any.required': 'Title is required'
        }),
    
    price: Joi.number()
        .positive()
        .precision(2)
        .required()
        .messages({
            'number.positive': 'Price must be a positive number',
            'any.required': 'Price is required'
        }),
    
    stock: Joi.number()
        .integer()
        .min(0)
        .required()
        .messages({
            'number.integer': 'Stock must be an integer',
            'number.min': 'Stock cannot be negative',
            'any.required': 'Stock is required'
        }),
    
    business: Joi.string()
        .hex()
        .length(24)
        .required()
        .messages({
            'string.hex': 'Business ID must be valid',
            'any.required': 'Business ID is required'
        })
});

//Validación para actualizar producto (campos opcionales)
export const updateProductSchema = Joi.object({
    title: Joi.string()
        .min(2)
        .max(100)
        .trim(),
    
    price: Joi.number()
        .positive()
        .precision(2),
    
    stock: Joi.number()
        .integer()
        .min(0)
}).min(1); // Al menos un campo debe estar presente