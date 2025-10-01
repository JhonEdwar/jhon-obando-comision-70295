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
import nodemailer from 'nodemailer'
import  __dirname  from './config/dirname.js'
import { generateCustomResponse } from './utils/generateCustomResponses.js'

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

const transport = nodemailer.createTransport({
    service: 'gmail',
    port: 587,
    auth: {
        user: process.env.EMAIL_NODEMAILER,
        pass: process.env.PASSWORD_NODEMAILER
    }
})

app.get('/mail', async (req, res) => {
    try {
        const result = await transport.sendMail({
            from: `"shopjhon" <${process.env.EMAIL_NODEMAILER}>`,
            to: 'jhonedwar192@gmail.com',
            subject: 'Confirmación de compra',
            html: `<h1>Compra realizada</h1>
            <p>Hola, se acaba de realizar la compra correctamente.</p>
            <img src="cid:exito"/>
            `,
            attachments: [
                {
                    filename: 'exito.png',
                    path: __dirname + '/public/img/exito.png',
                    cid: 'exito'
                }
            ]
            
        })
        res.status(200).json({message: 'Email sent', result})
    } catch (error) {
        res.status(500).json({message: 'Error sending email', error})
    }
})

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
mongoose.connect(process.env.MONGO)
app.listen(process.env.PORT, ()=> console.log('Servidor levantado en el puerto: ' + process.env.PORT ))
