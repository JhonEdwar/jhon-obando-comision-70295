import Joi from 'joi';

export const createOrderSchema = Joi.object({
    idBuyer: Joi.string()
        .hex()
        .length(24)
        .required()
        .messages({
            'string.hex': 'idBuyer must be a valid MongoDB ID',
            'string.length': 'idBuyer must be exactly 24 characters',
            'any.required': 'idBuyer is required'
        }),
    
    idBusiness: Joi.string()
        .hex()
        .length(24)
        .required()
        .messages({
            'string.hex': 'idBusiness must be a valid MongoDB ID',
            'string.length': 'idBusiness must be exactly 24 characters',
            'any.required': 'idBusiness is required'
        }),
    
    products: Joi.array()
        .items(
            Joi.object({
                _id: Joi.string()
                    .hex()
                    .length(24)
                    .required()
                    .messages({
                        'string.hex': 'Product ID must be valid',
                        'any.required': 'Product ID is required'
                    }),
                
                quantity: Joi.number()
                    .integer()
                    .min(1)
                    .max(1000)
                    .required()
                    .messages({
                        'number.base': 'Quantity must be a number',
                        'number.integer': 'Quantity must be an integer',
                        'number.min': 'Quantity must be at least 1',
                        'number.max': 'Quantity cannot exceed 1000',
                        'any.required': 'Quantity is required'
                    })
            })
        )
        .min(1)
        .max(100)
        .required()
        .messages({
            'array.min': 'You must include at least 1 product',
            'array.max': 'You cannot order more than 100 products at once',
            'any.required': 'Products is required'
        })
});


export const resolveOrderSchema = Joi.object({
    resolve: Joi.string()
        .valid('pending', 'confirmed', 'cancelled')
        .required()
        .messages({
            'any.only': 'Status must be: pending, confirmed or cancelled',
            'any.required': 'Status is required'
        })
});