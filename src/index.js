import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import config from './config.js'
import routes from './routes.js'
import testConnDb from './database/testConnDb.js'

const app = express()

///// MIDDLEWARES
app.disable('x-powered-by')
const corsOptions = {
    origin: [config.hostfrontend, 'http://localhost:8080']
}
app.use(cors(corsOptions))
app.use(express.json({limit:'100mb'}))
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())
app.set('port', process.env.PORT || 5000)

///// RUTAS
routes(app)

///// START SERVER
app.listen(app.get('port'), async () => {
    console.log('Server on port', app.get('port'))

    ///// TEST CONN DB
    await testConnDb()
})

export default app