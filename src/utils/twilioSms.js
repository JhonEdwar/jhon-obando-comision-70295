import { Router } from "express"
import twilio from 'twilio'
import dotenv from 'dotenv'
dotenv.config()

const router = Router()

const twilioClient = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN)

router.get('/', async (req, res) => {
   
   try {
    console.log('Sending SMS...')
        const result= await twilioClient.messages.create({

            from: `+${process.env.TWILIO_PHONE_NUMBER}`, 
            to: `+${process.env.USER_NUMBER}`, 
            body: 'Hello from Twilio! Mr John'
        })
      
        console.log('SMS sent:', result)

        res.send({message: 'SMS sent', sid: result.sid})
   } catch (error) {
       res.json({ error: error.message })
         console.error('Error sending SMS:', error)

   }
})

export default router