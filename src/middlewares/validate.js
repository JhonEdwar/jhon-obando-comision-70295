import AppError from "../utils/appError.js";

export const validate = (schema) => {
    return (req, res, next) => {
        const { error, value } = schema.validate(req.body, {
            abortEarly: false, 
            stripUnknown: true 
        });

        if (error) {
            const errorMessage = error.details
                .map(detail => detail.message)
                .join(', ');
            
            throw new AppError(400, errorMessage);
        }

        
        req.body = value;
        next();
    };
};