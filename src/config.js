import {config} from 'dotenv'

config()

export default {
    tokenmyapi: process.env.TOKENMYAPI || '',
    hostfrontend: process.env.HOSTFRONTEND || '',

    db_uri: process.env.DB_URI || '',
    db_ssl_ca: process.env.DB_SSL_CA || '',

    email: process.env.EMAIL || '',
    email_pass: process.env.EMAIL_PASS || '',

    app_name: process.env.APP_NAME || '',
}