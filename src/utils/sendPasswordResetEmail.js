import nodemailer from 'nodemailer'
import  __dirname  from '../config/dirname.js'



export const sendPasswordResetEmail  = async ({ email, token }) => {
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
            to: email,
            subject: "Password Reset",
            html: `
            <h1>Password Reset</h1>
            <p>Click the link below to reset your password:</p>
            <a href="${process.env.FRONTEND_URL}/reset-password?token=${token}">Reset Password</a>
            `,

            attachments: []
        })
        return { message: 'Email sent', result }
    } catch (error) {
        return { message: 'Error sending email', error }
    }
}

   