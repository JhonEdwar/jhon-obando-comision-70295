import express from 'express'
import mongoose from 'mongoose'
import cookieParser from 'cookie-parser'
import initializePassport from './config/passport.config.js'
import passport from 'passport'
import productsRoutes from './routes/products.routes.js'
import usersRoutes from './routes/auth.routes.js'
import businessRoutes from './routes/business.routes.js'
import buyerRoutes from './routes/buyer.routes.js'
import orderRoutes from './routes/order.routes.js'
import cartRoutes from './routes/cart.routes.js'
import cors from 'cors'
import { generateCustomResponse } from './utils/generateCustomResponses.js'
import { errorHandler } from './middlewares/errorHandler.js'
import { generalLimiter} from './config/rateLimiter.js'
import logger from './config/logger.js'
import { config } from './config/config.js'
import { swaggerUi, specs, swaggerOptions } from './docs/swagger/swagger.js'


const app = express()
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors({
    origin: config.FRONTEND_URL,
    credentials: true,
    methods: ['GET','POST','PUT','DELETE']
}))
app.use((req, res, next) => {
    logger.http(`${req.method} ${req.url}`)
    next()
})

app.use(generalLimiter);
app.use('/public', express.static('public'))
app.use(cookieParser())
app.use(generateCustomResponse)
initializePassport()
app.use(passport.initialize())

// Swagger Documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs, swaggerOptions))
app.use('/api/users',usersRoutes)
app.use('/api/products',productsRoutes)
app.use('/api/business',businessRoutes)
app.use('/api/buyer',buyerRoutes)
app.use('/api/cart/',cartRoutes)
app.use('/api/order',orderRoutes)
app.use(errorHandler)

mongoose.connect(process.env.MONGO) 
.then(() => logger.info('✓ MongoDB connected successfully'))
.catch((error) => logger.error('✗ Error connecting to MongoDB', { error: error.message }))


app.listen(process.env.PORT, () => {
    logger.info(`🚀 Server running on port ${config.PORT}`)
    logger.info(`📍 Ambiente: ${config.NODE_ENV || 'development'}`)
})