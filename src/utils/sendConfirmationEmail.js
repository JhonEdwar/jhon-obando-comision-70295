import nodemailer from 'nodemailer'
import  __dirname  from '../config/dirname.js'



export const sendConfirmationEmail = async ({subject,message,userMail}) => {
    const transport = nodemailer.createTransport({
    service: 'gmail',
    port: 587,
    auth: {
        user: process.env.EMAIL_NODEMAILER,
        pass: process.env.PASSWORD_NODEMAILER
    }
})
    try {
        const result = await transport.sendMail({
            from: `"shopjhon" <${process.env.EMAIL_NODEMAILER}>`,
            to: userMail,
            subject: subject,
            html: `
            <h1>${message.title}</h1>
            <p>${message.body}</p>
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
        return { message: 'Email sent', result }
    } catch (error) {
        return { message: 'Error sending email', error }
    }
}

   