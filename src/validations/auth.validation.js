import Joi from 'joi';

export const registerSchema = Joi.object({
    firstName: Joi.string()
        .min(2)
        .max(50)
        .required()
        .trim()
        .messages({
            'string.min': 'First name must be at least 2 characters',
            'any.required': 'First name is required'
        }),
    
    lastName: Joi.string()
        .min(2)
        .max(50)
        .required()
        .trim()
        .messages({
            'string.min': 'Last name must be at least 2 characters',
            'any.required': 'Last name is required'
        }),
    
    email: Joi.string()
        .email()
        .required()
        .lowercase()
        .trim()
        .messages({
            'string.email': 'Email must be valid',
            'any.required': 'Email is required'
        }),
    
    password: Joi.string()
        .min(8)
        .max(100)
        .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
        .required()
        .messages({
            'string.min': 'Password must be at least 8 characters',
            'string.pattern.base': 'Password must contain uppercase, lowercase letters and numbers',
            'any.required': 'Password is required'
        }),
    
    role: Joi.string()
        .valid('buyer', 'business', 'admin')
        .required()
        .messages({
            'any.only': 'Role must be: buyer, business or admin',
            'any.required': 'Role is required'
        })
});

//login
export const loginSchema = Joi.object({
    email: Joi.string()
        .email()
        .required()
        .lowercase()
        .trim(),
    
    password: Joi.string()
        .required(),
    
    role: Joi.string()
        .valid('buyer', 'business', 'admin')
        .required()
});