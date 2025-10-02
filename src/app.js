import express from 'express'
import dotenv from 'dotenv'
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

dotenv.config()

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
    methods: ['GET','POST','PUT','DELETE']
}))
app.use('/public', express.static('public'))


app.use(cookieParser())
app.use(generateCustomResponse)
initializePassport()
app.use(passport.initialize())
app.use('/api/users',usersRoutes)
app.use('/api/products',productsRoutes)
app.use('/api/business',businessRoutes)
app.use('/api/buyer',buyerRoutes)
app.use('/api/cart/',cartRoutes)
app.use('/api/order',orderRoutes)
app.use(errorHandler)
mongoose.connect(process.env.MONGO)
app.listen(process.env.PORT, ()=> console.log('Servidor levantado en el puerto: ' + process.env.PORT ))
