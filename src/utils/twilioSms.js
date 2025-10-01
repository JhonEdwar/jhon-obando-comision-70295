import twilio from 'twilio'


const twilioClient = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN)

export const sendSms= async (to, body) => {
   
   try {
    console.log('Sending SMS...')
        const result= await twilioClient.messages.create({

            from: `+${process.env.TWILIO_PHONE_NUMBER}`, 
            to: to, 
            body: body,
        })
      
        console.log('SMS sent:', result)

        return result
   } catch (error) {
         console.error('Error sending SMS:', error)
         throw error

   }
}