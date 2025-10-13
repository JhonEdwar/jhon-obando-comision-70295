import dotenv from 'dotenv';
dotenv.config({path: './env',override: true});

export const config = {
    PORT: process.env.PORT || 3000,
    MONGO: process.env.MONGO || 'mongodb://localhost:27017/shopjhon',
    JWT_SECRET: process.env.JWT_SECRET || 'secret',
    EMAIL_NODEMAILER: process.env.EMAIL_NODEMAILER || 'your_email@gmail.com',
    PASSWORD_NODEMAILER: process.env.PASSWORD_NODEMAILER || 'your_password',
    TWILIO_ACCOUNT_SID: process.env.TWILIO_ACCOUNT_SID || 'your_account_sid',
    TWILIO_AUTH_TOKEN: process.env.TWILIO_AUTH_TOKEN || 'your_auth_token',
    TWILIO_PHONE_NUMBER: process.env.TWILIO_PHONE_NUMBER,
    USER_NUMBER: process.env.USER_NUMBER,
    FRONTEND_URL: process.env.FRONTEND_URL,
    NODE_ENV: process.env.NODE_ENV || 'development',
}
