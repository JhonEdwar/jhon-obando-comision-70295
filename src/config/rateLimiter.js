import rateLimit from 'express-rate-limit';

export const generalLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutos
    max: 100, // Máximo 100 requests por IP
    message: 'Demasiadas peticiones desde esta IP, intenta de nuevo en 15 minutos',
    standardHeaders: true,
    legacyHeaders: false,
});