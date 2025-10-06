// src/config/logger.js
import winston from 'winston'
import path from 'path'
import __dirname from './dirname.js'

const levels = {
    error: 0,
    warn: 1,
    info: 2,
    http: 3,
    debug: 4,
}

const colors = {
    error: 'red',
    warn: 'yellow',
    info: 'green',
    http: 'magenta',
    debug: 'blue',
}

winston.addColors(colors)

// archivos (JSON estructurado)
const fileFormat = winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    winston.format.errors({ stack: true }),
    winston.format.json()
)

// consola 
const consoleFormat = winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    winston.format.colorize({ all: true }),
    winston.format.printf(
        (info) => `${info.timestamp} [${info.level}]: ${info.message}`
    )
)

// Función que determina qué nivel mostrar según el ambiente
const level = () => {
    const env = process.env.NODE_ENV || 'development'
    const isDevelopment = env === 'development'
    return isDevelopment ? 'debug' : 'warn'
}

// Crear directorio logs
const logsDir = path.join(__dirname, 'logs')

// Transportes (destinos de los logs)
const transports = [
    // Consola: siempre activa
    new winston.transports.Console({
        format: consoleFormat
    }),
    
    // Archivo de errores: solo errores
    new winston.transports.File({
        filename: path.join(logsDir, 'error.log'),
        level: 'error',
        format: fileFormat,
        maxsize: 5242880, // 5MB
        maxFiles: 5,
    }),
    
    // Archivo combinado: todos los logs
    new winston.transports.File({
        filename: path.join(logsDir, 'combined.log'),
        format: fileFormat,
        maxsize: 5242880, // 5MB
        maxFiles: 5,
    })
]

// Crear el logger
const logger = winston.createLogger({
    level: level(),
    levels,
    transports,
    // No crashear si falla el logger
    exitOnError: false,
})

export default logger