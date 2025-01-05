import express from 'express'
import dotenv from 'dotenv'
import usersRoutes from './src/routes/users.routes.js'
import mongoose from 'mongoose'
import cookieParser from 'cookie-parser'
import initializePassport from './src/config/passport.config'
import passport from 'passport'
import productsRoutes from './src/routes/products.routes.js'

dotenv.config()
const app = express()
app.use(express.json())
app.use(cookieParser())
initializePassport()
app.use(passport.initialize())
app.use('/api/users',usersRoutes)
app.use('/app/products',productsRoutes)
mongoose.connect(process.env.MONGO)
app.listen(process.env.PORT, ()=> console.log('Servidor levantado en el puerto: ' + process.env.PORT ))