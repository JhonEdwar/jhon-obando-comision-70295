import express from 'express'
import dotenv from 'dotenv'
import usersRoutes from './src/routes/users.routes'
import mongoose from 'mongoose'

dotenv.config()
const app = express()
app.use(express.json())

app.use('/api/users',usersRoutes)
mongoose.connect(process.env.MONGO)
app.listen(process.env.PORT, ()=> console.log('Servidor levantado en el puerto: ' + process.env.PORT ))