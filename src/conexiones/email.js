import nodemailer from 'nodemailer'
import config from "../config.js"

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: config.email,
        pass: config.email_pass
    },
})

const verifyTransporter = async () => {
    try {
        await transporter.verify()
        console.log('Listo para enviar correos')
    }
    catch (error) {
        console.error('Error al verificar el transportador de correo:', error.message)
    }
}

verifyTransporter()

const connMail = () => {
    return transporter
}

export default connMail